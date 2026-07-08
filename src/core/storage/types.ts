import type { FeatureSettings } from '@shared/types';

export interface IStorageService {
  loadSettings(): Promise<FeatureSettings>;
  saveSettings(settings: FeatureSettings): Promise<void>;
  updateFeature(id: keyof FeatureSettings, enabled: boolean): Promise<FeatureSettings>;
}
