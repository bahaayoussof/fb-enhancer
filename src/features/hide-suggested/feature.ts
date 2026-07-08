import { logger } from '@core/logger/logger';
import type { IFeature } from '@core/feature-manager/types';
import type { PageContext } from '@core/context/types';
import { findSuggestedElements } from './scanner';
import { isSuggestedElement } from './matcher';
import { hideSuggestedElement, showSuggestedElement } from './actions';

export class HideSuggestedFeature implements IFeature {
  readonly id = 'hide-suggested' as const;
  readonly displayName = 'Suggested Posts';
  readonly description = 'Removes algorithmic suggestions from the feed';
  readonly defaultEnabled = true;

  private readonly hidden = new Set<Element>();
  private readonly processed = new WeakSet<Element>();

  run(_context: PageContext, nodes: Node[]): void {
    const candidates = findSuggestedElements(nodes);

    for (const el of candidates) {
      if (this.processed.has(el)) continue;
      if (!isSuggestedElement(el)) continue;

      this.processed.add(el);
      const target = hideSuggestedElement(el);
      this.hidden.add(target);
      logger.debug('[hide-suggested] hidden element', el);
    }
  }

  teardown(): void {
    this.hidden.forEach(showSuggestedElement);
    this.hidden.clear();
  }
}
