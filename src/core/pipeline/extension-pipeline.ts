import { logger } from '@core/logger/logger';
import { buildContext } from '@core/context/context-builder';
import { domScanner } from '@core/scanner/dom-scanner';
import { observerManager } from '@core/observer/observer-manager';
import { featureManager } from '@core/feature-manager/feature-manager';
import type { PageContext } from '@core/context/types';

class ExtensionPipeline {
  private context: PageContext | null = null;
  private running = false;

  start(): void {
    if (this.running) return;

    this.context = buildContext();
    logger.debug('Page context', this.context);

    observerManager.observe(this.handleMutations.bind(this));
    this.running = true;

    // Initial scan: run features against current DOM on first load
    featureManager.run(this.context, [document.body]);

    logger.info(`Pipeline started (${this.context.pageType})`);
  }

  stop(): void {
    if (!this.running) return;

    observerManager.disconnect();
    featureManager.teardownAll();
    this.context = null;
    this.running = false;

    logger.info('Pipeline stopped');
  }

  private handleMutations(records: MutationRecord[]): void {
    if (!this.context) return;

    const elements = domScanner.extractAddedElements(records);
    if (elements.length === 0) return;

    featureManager.run(this.context, elements);
  }
}

export const extensionPipeline = new ExtensionPipeline();
