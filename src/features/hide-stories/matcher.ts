import { findAncestor } from '@shared/dom/parent-finder';

export function isStoriesElement(element: Element): boolean {
  // Must have content — skip empty placeholders
  if (element.children.length === 0) return false;

  // Skip if already inside a hidden ancestor (avoid double-processing)
  const hiddenAncestor = findAncestor(
    element,
    (el) => (el as HTMLElement).style?.display === 'none',
    5
  );
  if (hiddenAncestor) return false;

  return true;
}
