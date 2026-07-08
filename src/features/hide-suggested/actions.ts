import { safeHide, safeShow } from '@shared/dom/safe-hide';
import { findAncestorBySelector } from '@shared/dom/parent-finder';

const WRAPPER_SELECTOR = '[data-pagelet],[role="complementary"],section,[role="region"]';

export function hideSuggestedElement(element: Element): Element {
  const wrapper = findAncestorBySelector(element, WRAPPER_SELECTOR, 4);
  const target = wrapper ?? element;
  safeHide(target);
  return target;
}

export function showSuggestedElement(element: Element): void {
  safeShow(element);
}
