import { findAncestor } from '@shared/dom/parent-finder';

export function isSidebarElement(element: Element): boolean {
  if (element.children.length === 0) return false;

  const hiddenAncestor = findAncestor(
    element,
    (el) => (el as HTMLElement).style?.display === 'none',
    3
  );
  if (hiddenAncestor) return false;

  return true;
}
