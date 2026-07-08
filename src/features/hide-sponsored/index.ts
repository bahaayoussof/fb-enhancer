import { featureManager } from '@core/feature-manager/feature-manager';
import { HideSponsoredFeature } from './feature';

featureManager.register(new HideSponsoredFeature());
