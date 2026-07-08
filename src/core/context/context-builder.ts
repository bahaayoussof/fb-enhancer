import type { FacebookPageType, PageContext } from './types';

const PAGE_PATTERNS: Array<{ pattern: RegExp; type: FacebookPageType }> = [
  { pattern: /^https?:\/\/(www\.)?facebook\.com\/?$/, type: 'home' },
  { pattern: /^https?:\/\/(www\.)?facebook\.com\/\?/, type: 'home' },
  { pattern: /^https?:\/\/(www\.)?facebook\.com\/marketplace/, type: 'marketplace' },
  { pattern: /^https?:\/\/(www\.)?facebook\.com\/watch/, type: 'watch' },
  { pattern: /^https?:\/\/(www\.)?facebook\.com\/groups\//, type: 'group' },
  { pattern: /^https?:\/\/(www\.)?facebook\.com\/[^/]+\/?$/, type: 'profile' },
];

function detectPageType(url: string): FacebookPageType {
  for (const { pattern, type } of PAGE_PATTERNS) {
    if (pattern.test(url)) return type;
  }
  return 'other';
}

export function buildContext(): PageContext {
  return {
    url: window.location.href,
    pageType: detectPageType(window.location.href),
    timestamp: Date.now(),
  };
}
