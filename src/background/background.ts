import { logger } from '@core/logger/logger';
import { messagingService } from '@core/messaging/messaging-service';
import { storageService } from '@core/storage/storage-service';
import type { ExtensionMessage } from '@core/messaging/types';

logger.info('background ready');

messagingService.onMessage((message: ExtensionMessage): Promise<unknown> | void => {
  logger.debug('Background received message', message);

  if (message.type === 'GET_SETTINGS') {
    return storageService.loadSettings();
  }

  if (message.type === 'TOGGLE_ALL') {
    return storageService
      .loadSettings()
      .then((current) => {
        const updated = Object.fromEntries(
          Object.keys(current).map((k) => [k, message.payload.enabled])
        ) as typeof current;
        return storageService.saveSettings(updated).then(() => updated);
      })
      .then((updated) => {
        messagingService.sendToActiveTab({
          type: 'SETTINGS_UPDATED',
          payload: { settings: updated },
        });
        return updated;
      })
      .catch((err) => logger.error('Failed to toggle all features', err));
  }

  if (message.type === 'TOGGLE_FEATURE') {
    return storageService
      .updateFeature(message.payload.featureId, message.payload.enabled)
      .then((updated) => {
        messagingService.sendToActiveTab({
          type: 'SETTINGS_UPDATED',
          payload: { settings: updated },
        });
        return updated;
      })
      .catch((err) => logger.error('Failed to toggle feature', err));
  }
});
