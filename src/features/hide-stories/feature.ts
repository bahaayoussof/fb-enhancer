import { logger } from '@core/logger/logger';
import type { IFeature } from '@core/feature-manager/types';
import type { PageContext } from '@core/context/types';
import { findStoryElements } from './scanner';
import { isStoriesElement } from './matcher';
import { hideStoryElement, showStoryElement } from './actions';

export class HideStoriesFeature implements IFeature {
  readonly id = 'hide-stories' as const;
  readonly displayName = 'Hide Stories';
  readonly description = 'Removes the Stories bar from the Facebook feed';
  readonly defaultEnabled = true;

  private readonly hidden = new Set<Element>();
  private readonly processed = new WeakSet<Element>();

  run(_context: PageContext, nodes: Node[]): void {
    const candidates = findStoryElements(nodes);

    for (const el of candidates) {
      if (this.processed.has(el)) continue;

      if (!isStoriesElement(el)) continue;

      this.processed.add(el);
      const target = hideStoryElement(el);
      this.hidden.add(target);
      logger.debug('[hide-stories] hidden element', el);
    }
  }

  teardown(): void {
    this.hidden.forEach(showStoryElement);
    this.hidden.clear();
  }
}
