import type { FeatureId, FeatureSettings } from '@shared/types';

export interface ToggleFeaturePayload {
  featureId: FeatureId;
  enabled: boolean;
}

export interface SettingsUpdatedPayload {
  settings: FeatureSettings;
}

export interface ToggleAllPayload {
  enabled: boolean;
}

export type ExtensionMessage =
  | { type: 'TOGGLE_FEATURE'; payload: ToggleFeaturePayload }
  | { type: 'TOGGLE_ALL'; payload: ToggleAllPayload }
  | { type: 'GET_SETTINGS' }
  | { type: 'SETTINGS_UPDATED'; payload: SettingsUpdatedPayload };
