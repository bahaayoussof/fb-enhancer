export type FeatureId =
  | 'hide-stories'
  | 'hide-reels'
  | 'hide-sponsored'
  | 'hide-suggested'
  | 'hide-sidebar'
  | 'feed-cleaner';

export type FeatureSettings = {
  [K in FeatureId]: boolean;
};
