import { logger } from '@core/logger/logger';
import type { IFeature } from '@core/feature-manager/types';
import type { PageContext } from '@core/context/types';
import { findSponsoredElements } from './scanner';
import { isSponsoredLabel } from './matcher';
import { hideSponsoredPost, showSponsoredPost } from './actions';

export class HideSponsoredFeature implements IFeature {
  readonly id = 'hide-sponsored' as const;
  readonly displayName = 'Sponsored Posts';
  readonly description = 'Removes paid advertisements from the feed';
  readonly defaultEnabled = true;

  private readonly hidden = new Set<Element>();
  private readonly processed = new WeakSet<Element>();

  run(_context: PageContext, nodes: Node[]): void {
    const candidates = findSponsoredElements(nodes);

    for (const el of candidates) {
      if (this.processed.has(el)) continue;
      if (!isSponsoredLabel(el)) continue;

      this.processed.add(el);
      const target = hideSponsoredPost(el);
      this.hidden.add(target);
      logger.debug('[hide-sponsored] hidden post', el);
    }
  }

  teardown(): void {
    this.hidden.forEach(showSponsoredPost);
    this.hidden.clear();
  }
}
