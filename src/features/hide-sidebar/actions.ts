import { safeHide, safeShow } from '@shared/dom/safe-hide';

export function hideSidebarElement(element: Element): Element {
  safeHide(element);
  return element;
}

export function showSidebarElement(element: Element): void {
  safeShow(element);
}
