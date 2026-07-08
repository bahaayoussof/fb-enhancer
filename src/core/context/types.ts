export type FacebookPageType = 'home' | 'profile' | 'group' | 'watch' | 'marketplace' | 'other';

export interface PageContext {
  url: string;
  pageType: FacebookPageType;
  timestamp: number;
}
