import { featureManager } from '@core/feature-manager/feature-manager';
import { HideStoriesFeature } from './feature';

featureManager.register(new HideStoriesFeature());
