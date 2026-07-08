import { queryAll } from '@shared/dom/selector-helpers';
import { FEED_NOISE_SELECTORS, FEED_NOISE_TEXT_MARKERS } from './constants';

function hasNoiseHeading(element: Element): boolean {
  const headings = element.querySelectorAll('h2,h3,[role="heading"]');
  for (const h of headings) {
    const text = h.textContent?.trim() ?? '';
    if (FEED_NOISE_TEXT_MARKERS.some((m) => text.includes(m))) return true;
  }
  return false;
}

export function findFeedNoiseElements(nodes: Node[]): Element[] {
  const found = new Set<Element>();

  for (const node of nodes) {
    if (!(node instanceof Element)) continue;

    for (const selector of FEED_NOISE_SELECTORS) {
      try {
        if (node.matches(selector)) found.add(node);
      } catch {
        // skip
      }
    }

    queryAll(node, FEED_NOISE_SELECTORS).forEach((el) => found.add(el));

    if (hasNoiseHeading(node)) found.add(node);
  }

  return [...found];
}
