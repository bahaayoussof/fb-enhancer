import { logger } from '@core/logger/logger';
import type { FeatureSettings } from '@shared/types';
import type { IStorageService } from './types';
import { DEFAULT_SETTINGS } from './defaults';

const STORAGE_KEY = 'fb-enhancer-settings';

class StorageService implements IStorageService {
  async loadSettings(): Promise<FeatureSettings> {
    try {
      const result = await chrome.storage.sync.get(STORAGE_KEY);
      const stored = result[STORAGE_KEY] as Partial<FeatureSettings> | undefined;

      // Merge stored values over defaults so new features get their default state
      return { ...DEFAULT_SETTINGS, ...stored };
    } catch (err) {
      logger.error('Failed to load settings, using defaults', err);
      return { ...DEFAULT_SETTINGS };
    }
  }

  async saveSettings(settings: FeatureSettings): Promise<void> {
    try {
      await chrome.storage.sync.set({ [STORAGE_KEY]: settings });
      logger.debug('Settings saved', settings);
    } catch (err) {
      logger.error('Failed to save settings', err);
    }
  }

  async updateFeature(
    id: keyof FeatureSettings,
    enabled: boolean
  ): Promise<FeatureSettings> {
    const current = await this.loadSettings();
    const updated: FeatureSettings = { ...current, [id]: enabled };
    await this.saveSettings(updated);
    return updated;
  }
}

export const storageService: IStorageService = new StorageService();
