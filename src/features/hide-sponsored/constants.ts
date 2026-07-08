// Sponsored posts are identified by text content, aria attributes, and structural patterns.
// Facebook actively obfuscates class names — never rely on them here.
export const SPONSORED_ARIA_SELECTORS: readonly string[] = [
  '[aria-label="Sponsored"]',
  '[data-testid="sponsored-post"]',
];

// Text strings Facebook uses to mark sponsored content (check multiple locales)
export const SPONSORED_TEXT_MARKERS: readonly string[] = [
  'Sponsored',
  'Gesponsert', // German
  'Patrocinado', // Spanish/Portuguese
  'Sponsorisé', // French
  'Sponsorizzato', // Italian
];

// Feed post container selectors — we walk UP from the sponsored label to find the post root
export const FEED_POST_SELECTORS: readonly string[] = [
  '[data-pagelet^="FeedUnit"]',
  '[data-pagelet="FeedUnit"]',
  'div[role="feed"] > div',
  'div[role="article"]',
];
