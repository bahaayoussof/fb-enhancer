import { queryAll } from '@shared/dom/selector-helpers';
import { SPONSORED_ARIA_SELECTORS, SPONSORED_TEXT_MARKERS } from './constants';

function containsSponsoredText(element: Element): boolean {
  const text = element.textContent ?? '';
  return SPONSORED_TEXT_MARKERS.some((marker) => text.includes(marker));
}

function findSponsoredByText(root: Element): Element[] {
  // Look for anchor/span elements that contain ONLY the sponsored text
  const candidates = root.querySelectorAll('a, span');
  const results: Element[] = [];

  for (const el of candidates) {
    const text = el.textContent?.trim();
    if (text && SPONSORED_TEXT_MARKERS.includes(text)) {
      results.push(el);
    }
  }

  return results;
}

export function findSponsoredElements(nodes: Node[]): Element[] {
  const found = new Set<Element>();

  for (const node of nodes) {
    if (!(node instanceof Element)) continue;

    // Strategy 1: aria/testid selectors
    queryAll(node, SPONSORED_ARIA_SELECTORS).forEach((el) => found.add(el));

    // Self-check
    for (const selector of SPONSORED_ARIA_SELECTORS) {
      try {
        if (node.matches(selector)) found.add(node);
      } catch {
        // skip
      }
    }

    // Strategy 2: text-based — find elements whose sole text is "Sponsored"
    if (containsSponsoredText(node)) {
      findSponsoredByText(node).forEach((el) => found.add(el));
    }
  }

  return [...found];
}
