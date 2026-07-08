import { safeHide, safeShow } from '@shared/dom/safe-hide';
import { findAncestorBySelector } from '@shared/dom/parent-finder';

const WRAPPER_SELECTOR = '[data-pagelet],section,[role="region"]';

export function hideReelElement(element: Element): Element {
  const wrapper = findAncestorBySelector(element, WRAPPER_SELECTOR, 3);
  const target = wrapper ?? element;
  safeHide(target);
  return target;
}

export function showReelElement(element: Element): void {
  safeShow(element);
}
