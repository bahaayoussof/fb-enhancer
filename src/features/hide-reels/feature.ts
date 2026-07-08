import { logger } from '@core/logger/logger';
import type { IFeature } from '@core/feature-manager/types';
import type { PageContext } from '@core/context/types';
import { findReelElements } from './scanner';
import { isReelsElement } from './matcher';
import { hideReelElement, showReelElement } from './actions';

export class HideReelsFeature implements IFeature {
  readonly id = 'hide-reels' as const;
  readonly displayName = 'Hide Reels';
  readonly description = 'Removes Reels sections from the Facebook feed';
  readonly defaultEnabled = true;

  private readonly hidden = new Set<Element>();
  private processed = new WeakSet<Element>();

  run(_context: PageContext, nodes: Node[]): void {
    const candidates = findReelElements(nodes);

    for (const el of candidates) {
      if (this.processed.has(el)) continue;
      if (!isReelsElement(el)) continue;

      this.processed.add(el);
      const target = hideReelElement(el);
      this.hidden.add(target);
      logger.debug('[hide-reels] hidden element', el);
    }
  }

  teardown(): void {
    this.hidden.forEach(showReelElement);
    this.hidden.clear();
    this.processed = new WeakSet<Element>();
  }
}
