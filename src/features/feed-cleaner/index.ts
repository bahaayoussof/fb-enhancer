import { featureManager } from '@core/feature-manager/feature-manager';
import { FeedCleanerFeature } from './feature';

featureManager.register(new FeedCleanerFeature());
