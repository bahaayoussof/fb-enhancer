import { findAncestor } from '@shared/dom/parent-finder';

export function isReelsElement(element: Element): boolean {
  if (element.children.length === 0) return false;

  const hiddenAncestor = findAncestor(
    element,
    (el) => (el as HTMLElement).style?.display === 'none',
    5
  );
  if (hiddenAncestor) return false;

  return true;
}
