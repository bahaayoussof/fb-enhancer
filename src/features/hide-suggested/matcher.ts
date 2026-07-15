import { findAncestor, findAncestorBySelector } from '@shared/dom/parent-finder';

export function isSuggestedElement(element: Element): boolean {
  if (element.children.length === 0) return false;

  // Photo/image viewer opens as a dialog overlay — never hide it, even if
  // its aria-label happens to contain a noise marker like "Marketplace".
  if (element.matches('[role="dialog"]') || findAncestorBySelector(element, '[role="dialog"]')) {
    return false;
  }

  const hiddenAncestor = findAncestor(
    element,
    (el) => (el as HTMLElement).style?.display === 'none',
    5
  );
  if (hiddenAncestor) return false;

  return true;
}
