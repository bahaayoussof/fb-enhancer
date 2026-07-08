import { featureManager } from '@core/feature-manager/feature-manager';
import { HideSidebarFeature } from './feature';

featureManager.register(new HideSidebarFeature());
