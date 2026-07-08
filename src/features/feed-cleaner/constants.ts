// Catch-all for feed elements not covered by other features
export const FEED_NOISE_SELECTORS: readonly string[] = [
  '[data-pagelet*="GroupsFeed"]',
  '[data-pagelet*="MarketplaceFeed"]',
  '[aria-label*="Marketplace"]',
  '[aria-label*="People you may know"]',
  '[aria-label*="Groups you might like"]',
  '[aria-label*="Pages you might like"]',
  '[aria-label*="Events you might like"]',
];

export const FEED_NOISE_TEXT_MARKERS: readonly string[] = [
  'People you may know',
  'Groups you might like',
  'Pages you might like',
  'Events you might like',
  'Join groups',
];
