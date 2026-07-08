import { logger } from '@core/logger/logger';
import type { FeatureId, FeatureSettings } from '@shared/types';
import type { PageContext } from '@core/context/types';
import type { IFeature } from './types';

class FeatureManager {
  private readonly features = new Map<FeatureId, IFeature>();
  private settings: FeatureSettings | null = null;

  register(feature: IFeature): void {
    if (this.features.has(feature.id)) {
      logger.warn(`Feature already registered: ${feature.id}`);
      return;
    }
    this.features.set(feature.id, feature);
    logger.debug(`Feature registered: ${feature.id}`);
  }

  applySettings(settings: FeatureSettings): void {
    this.settings = settings;
  }

  refresh(newSettings: FeatureSettings, context: PageContext): void {
    const prev = this.settings;
    this.settings = newSettings;

    for (const [id, feature] of this.features) {
      const wasEnabled = prev ? (prev[id] ?? true) : true;
      const isNowEnabled = newSettings[id] ?? true;

      if (wasEnabled && !isNowEnabled) {
        try {
          feature.teardown();
        } catch (err) {
          logger.error(`Feature "${id}" teardown failed`, err);
        }
      } else if (!wasEnabled && isNowEnabled) {
        try {
          feature.run(context, [document.body]);
        } catch (err) {
          logger.error(`Feature "${id}" run failed`, err);
        }
      }
    }
  }

  run(context: PageContext, nodes: Node[]): void {
    for (const [id, feature] of this.features) {
      if (!this.isEnabled(id)) continue;

      try {
        feature.run(context, nodes);
      } catch (err) {
        logger.error(`Feature "${id}" threw an error`, err);
      }
    }
  }

  teardownAll(): void {
    for (const [id, feature] of this.features) {
      try {
        feature.teardown();
      } catch (err) {
        logger.error(`Feature "${id}" failed to tear down`, err);
      }
    }
    this.features.clear();
  }

  private isEnabled(id: FeatureId): boolean {
    if (!this.settings) return true; // default to enabled until settings load
    return this.settings[id] ?? true;
  }
}

export const featureManager = new FeatureManager();
