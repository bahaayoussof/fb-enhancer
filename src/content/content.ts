import { logger } from '@core/logger/logger';
import { messagingService } from '@core/messaging/messaging-service';
import type { ExtensionMessage } from '@core/messaging/types';

logger.info('content ready');

messagingService.onMessage((message: ExtensionMessage) => {
  logger.debug('Content received message', message);
});
