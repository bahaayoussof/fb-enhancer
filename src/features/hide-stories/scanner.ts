import { queryAll } from '@shared/dom/selector-helpers';
import { STORIES_SELECTORS } from './constants';

export function findStoryElements(nodes: Node[]): Element[] {
  const found = new Set<Element>();

  for (const node of nodes) {
    if (!(node instanceof Element)) continue;

    // Check if this node itself is a stories container
    for (const selector of STORIES_SELECTORS) {
      try {
        if (node.matches(selector)) {
          found.add(node);
          break;
        }
      } catch {
        // Invalid selector — skip
      }
    }

    // Check descendants
    queryAll(node, STORIES_SELECTORS).forEach((el) => found.add(el));
  }

  return [...found];
}
