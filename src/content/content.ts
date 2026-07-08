import { logger } from '@core/logger/logger';
import { messagingService } from '@core/messaging/messaging-service';
import { featureManager } from '@core/feature-manager/feature-manager';
import { extensionPipeline } from '@core/pipeline/extension-pipeline';
import type { ExtensionMessage } from '@core/messaging/types';

// Feature registrations — side-effect imports trigger featureManager.register()
import '@features/hide-stories';
import '@features/hide-reels';
import '@features/hide-sponsored';
import '@features/hide-suggested';
import '@features/hide-sidebar';
import '@features/feed-cleaner';

logger.info('content ready');

messagingService.onMessage((message: ExtensionMessage) => {
  logger.debug('Content received message', message);

  if (message.type === 'SETTINGS_UPDATED') {
    featureManager.applySettings(message.payload.settings);
  }
});

extensionPipeline.start().catch((err) => logger.error('Pipeline failed to start', err));
