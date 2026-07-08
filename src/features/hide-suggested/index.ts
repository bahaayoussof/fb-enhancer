import { featureManager } from '@core/feature-manager/feature-manager';
import { HideSuggestedFeature } from './feature';

featureManager.register(new HideSuggestedFeature());
