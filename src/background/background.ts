import { logger } from '@core/logger/logger';
import { messagingService } from '@core/messaging/messaging-service';
import type { ExtensionMessage } from '@core/messaging/types';

logger.info('background ready');

messagingService.onMessage((message: ExtensionMessage) => {
  logger.debug('Background received message', message);

  if (message.type === 'GET_SETTINGS') {
    // Sprint 3 will return real settings from StorageService
    return Promise.resolve(null);
  }
});
