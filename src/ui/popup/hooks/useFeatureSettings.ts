import { useCallback, useEffect, useState } from 'react';
import { messagingService } from '@core/messaging/messaging-service';
import { logger } from '@core/logger/logger';
import { DEFAULT_SETTINGS } from '@core/storage/defaults';
import type { FeatureId, FeatureSettings } from '@shared/types';

interface UseFeatureSettingsResult {
  settings: FeatureSettings;
  loading: boolean;
  toggle(id: FeatureId, enabled: boolean): void;
  toggleAll(enabled: boolean): void;
}

export function useFeatureSettings(): UseFeatureSettingsResult {
  const [settings, setSettings] = useState<FeatureSettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    messagingService
      .sendToBackground({ type: 'GET_SETTINGS' })
      .then((result) => {
        if (result) setSettings(result as FeatureSettings);
      })
      .catch((err) => logger.error('Failed to load settings', err))
      .finally(() => setLoading(false));
  }, []);

  const toggle = useCallback((id: FeatureId, enabled: boolean) => {
    setSettings((prev) => ({ ...prev, [id]: enabled }));

    messagingService
      .sendToBackground({ type: 'TOGGLE_FEATURE', payload: { featureId: id, enabled } })
      .catch((err) => {
        logger.error('Failed to toggle feature', err);
        setSettings((prev) => ({ ...prev, [id]: !enabled }));
      });
  }, []);

  const toggleAll = useCallback(
    (enabled: boolean) => {
      const ids = Object.keys(settings) as FeatureId[];
      const allUpdated = Object.fromEntries(ids.map((id) => [id, enabled])) as FeatureSettings;
      setSettings(allUpdated);

      messagingService
        .sendToBackground({ type: 'TOGGLE_ALL', payload: { enabled } })
        .catch((err) => {
          logger.error('Failed to toggle all features', err);
          setSettings(settings);
        });
    },
    [settings]
  );

  return { settings, loading, toggle, toggleAll };
}
