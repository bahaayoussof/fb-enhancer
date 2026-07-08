import { safeHide, safeShow } from '@shared/dom/safe-hide';
import { findAncestorBySelector } from '@shared/dom/parent-finder';

// Some story containers are nested — walk up to find the outermost wrapping div
const WRAPPER_SELECTORS = [
  '[data-pagelet]',
  'section',
  '[role="region"]',
  '[role="complementary"]',
];

export function hideStoryElement(element: Element): Element {
  // Try to hide the nearest semantic wrapper so layout gaps are minimized
  const wrapper = findAncestorBySelector(element, WRAPPER_SELECTORS.join(','), 3);
  const target = wrapper ?? element;
  safeHide(target);
  return target;
}

export function showStoryElement(element: Element): void {
  safeShow(element);
}
