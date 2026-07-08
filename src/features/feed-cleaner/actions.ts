import { safeHide, safeShow } from '@shared/dom/safe-hide';
import { findAncestorBySelector } from '@shared/dom/parent-finder';

const WRAPPER_SELECTOR = '[data-pagelet],[role="feed"] > div,[role="complementary"]';

export function hideFeedNoiseElement(element: Element): Element {
  const wrapper = findAncestorBySelector(element, WRAPPER_SELECTOR, 5);
  const target = wrapper ?? element;
  safeHide(target);
  return target;
}

export function showFeedNoiseElement(element: Element): void {
  safeShow(element);
}
