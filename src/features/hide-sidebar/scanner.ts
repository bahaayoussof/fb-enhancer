import { queryAll } from '@shared/dom/selector-helpers';
import { SIDEBAR_SELECTORS } from './constants';

export function findSidebarElements(nodes: Node[]): Element[] {
  const found = new Set<Element>();

  for (const node of nodes) {
    if (!(node instanceof Element)) continue;

    for (const selector of SIDEBAR_SELECTORS) {
      try {
        if (node.matches(selector)) found.add(node);
      } catch {
        // skip
      }
    }

    queryAll(node, SIDEBAR_SELECTORS).forEach((el) => found.add(el));
  }

  return [...found];
}
