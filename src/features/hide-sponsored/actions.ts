import { safeHide, safeShow } from '@shared/dom/safe-hide';
import { findAncestorBySelector } from '@shared/dom/parent-finder';
import { FEED_POST_SELECTORS } from './constants';

const POST_SELECTOR = FEED_POST_SELECTORS.join(',');

export function hideSponsoredPost(labelElement: Element): Element {
  // Walk up to find the feed post container that wraps this sponsored label
  const postRoot = findAncestorBySelector(labelElement, POST_SELECTOR, 20);
  const target = postRoot ?? labelElement.closest('[role="article"]') ?? labelElement;
  safeHide(target);
  return target;
}

export function showSponsoredPost(element: Element): void {
  safeShow(element);
}
