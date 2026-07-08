import { logger } from '@core/logger/logger';
import { messagingService } from '@core/messaging/messaging-service';
import { featureManager } from '@core/feature-manager/feature-manager';
import { extensionPipeline } from '@core/pipeline/extension-pipeline';
import type { ExtensionMessage } from '@core/messaging/types';

logger.info('content ready');

messagingService.onMessage((message: ExtensionMessage) => {
  logger.debug('Content received message', message);

  if (message.type === 'SETTINGS_UPDATED') {
    featureManager.applySettings(message.payload.settings);
  }
});

extensionPipeline.start();
