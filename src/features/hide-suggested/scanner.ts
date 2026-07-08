import { queryAll } from '@shared/dom/selector-helpers';
import { SUGGESTED_SELECTORS, SUGGESTED_TEXT_MARKERS } from './constants';

function hasSuggestedHeading(element: Element): boolean {
  const headings = element.querySelectorAll('h2, h3, [role="heading"]');
  for (const h of headings) {
    const text = h.textContent?.trim() ?? '';
    if (SUGGESTED_TEXT_MARKERS.some((m) => text.includes(m))) return true;
  }
  return false;
}

export function findSuggestedElements(nodes: Node[]): Element[] {
  const found = new Set<Element>();

  for (const node of nodes) {
    if (!(node instanceof Element)) continue;

    for (const selector of SUGGESTED_SELECTORS) {
      try {
        if (node.matches(selector)) found.add(node);
      } catch {
        // skip
      }
    }

    queryAll(node, SUGGESTED_SELECTORS).forEach((el) => found.add(el));

    // Heading-based detection for dynamically injected suggestion blocks
    if (hasSuggestedHeading(node)) found.add(node);
  }

  return [...found];
}
