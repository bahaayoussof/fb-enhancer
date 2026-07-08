import { logger } from '@core/logger/logger';
import { buildContext } from '@core/context/context-builder';
import { domScanner } from '@core/scanner/dom-scanner';
import { observerManager } from '@core/observer/observer-manager';
import { featureManager } from '@core/feature-manager/feature-manager';
import { storageService } from '@core/storage/storage-service';
import { isFacebookPage } from '@shared/utils/is-facebook';
import type { FeatureSettings } from '@shared/types';
import type { PageContext } from '@core/context/types';

// Idle window before processing accumulated mutations.
// Facebook batches many DOM writes — waiting 150ms catches them all in one pass.
const MUTATION_BATCH_DELAY_MS = 150;

class ExtensionPipeline {
  private context: PageContext | null = null;
  private running = false;
  private pendingRecords: MutationRecord[] = [];
  private batchTimer: ReturnType<typeof setTimeout> | null = null;

  async start(): Promise<void> {
    if (this.running) return;
    if (!isFacebookPage()) return;

    this.context = buildContext();
    logger.debug('Page context', this.context);

    const settings = await storageService.loadSettings();
    featureManager.applySettings(settings);

    observerManager.observe(this.handleMutations.bind(this));
    this.running = true;

    // Initial scan against current DOM
    featureManager.run(this.context, [document.body]);

    // Retry scan after short delay — Facebook loads feed content asynchronously
    // and some elements may not exist at inject time
    setTimeout(() => {
      if (this.context && this.running) {
        featureManager.run(this.context, [document.body]);
        logger.debug('Retry scan complete');
      }
    }, 2000);

    logger.info(`Pipeline started (${this.context.pageType})`);
  }

  refresh(settings: FeatureSettings): void {
    if (!this.running || !this.context) return;
    featureManager.refresh(settings, this.context);
    logger.debug('Pipeline refreshed with new settings');
  }

  stop(): void {
    if (!this.running) return;

    if (this.batchTimer !== null) {
      clearTimeout(this.batchTimer);
      this.batchTimer = null;
    }
    this.pendingRecords = [];

    observerManager.disconnect();
    featureManager.teardownAll();
    this.context = null;
    this.running = false;

    logger.info('Pipeline stopped');
  }

  private handleMutations(records: MutationRecord[]): void {
    if (!this.context) return;

    // Fast path: skip if no element nodes were added
    if (!domScanner.hasRelevantAdditions(records)) return;

    // Accumulate records across rapid callbacks
    this.pendingRecords.push(...records);

    if (this.batchTimer !== null) return;

    this.batchTimer = setTimeout(() => {
      this.batchTimer = null;
      const batch = this.pendingRecords.splice(0);
      this.processBatch(batch);
    }, MUTATION_BATCH_DELAY_MS);
  }

  private processBatch(records: MutationRecord[]): void {
    if (!this.context) return;

    const elements = domScanner.extractAddedElements(records);
    if (elements.length === 0) return;

    logger.debug(`Processing batch: ${elements.length} element(s) from ${records.length} record(s)`);
    featureManager.run(this.context, elements);
  }
}

export const extensionPipeline = new ExtensionPipeline();
