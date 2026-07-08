// Ordered by stability: ARIA/data attrs first, class-based last
export const STORIES_SELECTORS: readonly string[] = [
  '[data-pagelet="Stories"]',
  '[data-pagelet="StoriesHero"]',
  '[aria-label="Stories"]',
  '[aria-label="Create a story"]',
  '[data-testid="stories_tray"]',
  'div[role="region"][aria-label*="tory"]',
  'div[role="complementary"][aria-label*="tory"]',
];
