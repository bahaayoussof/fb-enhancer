import type { SelectorEntry } from '@shared/dom/selector-engine';

// Ordered by stability: data-pagelet > aria > testid > structural
// Never use obfuscated class names here — they change every deploy.
export const STORIES_SELECTOR_ENTRIES: readonly SelectorEntry[] = [
  { selector: '[data-pagelet="Stories"]', strategy: 'data-attr' },
  { selector: '[data-pagelet="StoriesHero"]', strategy: 'data-attr' },
  { selector: '[aria-label="Stories"]', strategy: 'aria' },
  { selector: '[aria-label="Create a story"]', strategy: 'aria' },
  { selector: '[data-testid="stories_tray"]', strategy: 'data-attr' },
  { selector: 'div[role="region"][aria-label*="tory"]', strategy: 'structural' },
  { selector: 'div[role="complementary"][aria-label*="tory"]', strategy: 'structural' },
];

// Flat array kept for backward compatibility
export const STORIES_SELECTORS: readonly string[] = STORIES_SELECTOR_ENTRIES.map((e) => e.selector);
