import { SPONSORED_TEXT_MARKERS } from './constants';

export function isSponsoredLabel(element: Element): boolean {
  const text = element.textContent?.trim() ?? '';

  // Must match an exact sponsored text marker
  if (!SPONSORED_TEXT_MARKERS.includes(text)) return false;

  // Exclude very large elements — sponsored label is always a small inline element
  if (element.children.length > 3) return false;

  return true;
}
