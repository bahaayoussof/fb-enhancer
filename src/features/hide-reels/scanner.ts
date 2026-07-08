import { queryAll } from '@shared/dom/selector-helpers';
import { REELS_SELECTORS } from './constants';

export function findReelElements(nodes: Node[]): Element[] {
  const found = new Set<Element>();

  for (const node of nodes) {
    if (!(node instanceof Element)) continue;

    for (const selector of REELS_SELECTORS) {
      try {
        if (node.matches(selector)) {
          found.add(node);
          break;
        }
      } catch {
        // Invalid selector — skip
      }
    }

    queryAll(node, REELS_SELECTORS).forEach((el) => found.add(el));
  }

  return [...found];
}
