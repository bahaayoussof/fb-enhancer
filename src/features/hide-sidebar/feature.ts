import { logger } from '@core/logger/logger';
import type { IFeature } from '@core/feature-manager/types';
import type { PageContext } from '@core/context/types';
import { findSidebarElements } from './scanner';
import { isSidebarElement } from './matcher';
import { hideSidebarElement, showSidebarElement } from './actions';

export class HideSidebarFeature implements IFeature {
  readonly id = 'hide-sidebar' as const;
  readonly displayName = 'Right Sidebar';
  readonly description = 'Hides the sponsored and suggested right sidebar';
  readonly defaultEnabled = true;

  private readonly hidden = new Set<Element>();
  private processed = new WeakSet<Element>();

  run(_context: PageContext, nodes: Node[]): void {
    const candidates = findSidebarElements(nodes);

    for (const el of candidates) {
      if (this.processed.has(el)) continue;
      if (!isSidebarElement(el)) continue;

      this.processed.add(el);
      const target = hideSidebarElement(el);
      this.hidden.add(target);
      logger.debug('[hide-sidebar] hidden element', el);
    }
  }

  teardown(): void {
    this.hidden.forEach(showSidebarElement);
    this.hidden.clear();
    this.processed = new WeakSet<Element>();
  }
}
