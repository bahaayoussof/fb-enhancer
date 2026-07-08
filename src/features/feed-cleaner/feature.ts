import { logger } from '@core/logger/logger';
import type { IFeature } from '@core/feature-manager/types';
import type { PageContext } from '@core/context/types';
import { findFeedNoiseElements } from './scanner';
import { isFeedNoiseElement } from './matcher';
import { hideFeedNoiseElement, showFeedNoiseElement } from './actions';

export class FeedCleanerFeature implements IFeature {
  readonly id = 'feed-cleaner' as const;
  readonly displayName = 'Feed Cleaner';
  readonly description = 'Removes groups, pages, and event suggestions from the feed';
  readonly defaultEnabled = true;

  private readonly hidden = new Set<Element>();
  private readonly processed = new WeakSet<Element>();

  run(_context: PageContext, nodes: Node[]): void {
    const candidates = findFeedNoiseElements(nodes);

    for (const el of candidates) {
      if (this.processed.has(el)) continue;
      if (!isFeedNoiseElement(el)) continue;

      this.processed.add(el);
      const target = hideFeedNoiseElement(el);
      this.hidden.add(target);
      logger.debug('[feed-cleaner] hidden element', el);
    }
  }

  teardown(): void {
    this.hidden.forEach(showFeedNoiseElement);
    this.hidden.clear();
  }
}
