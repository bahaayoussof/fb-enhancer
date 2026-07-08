import { FeatureToggle } from './FeatureToggle';
import type { FeatureId, FeatureSettings } from '@shared/types';
import styles from './CategoryGroup.module.css';

export interface FeatureMeta {
  id: FeatureId;
  label: string;
  description: string;
}

interface CategoryGroupProps {
  title: string;
  features: FeatureMeta[];
  settings: FeatureSettings;
  onToggle(id: FeatureId, enabled: boolean): void;
}

export function CategoryGroup({ title, features, settings, onToggle }: CategoryGroupProps) {
  if (features.length === 0) return null;

  return (
    <section className={styles.group}>
      <h2 className={styles.title}>{title}</h2>
      {features.map((f) => (
        <FeatureToggle
          key={f.id}
          id={f.id}
          label={f.label}
          description={f.description}
          enabled={settings[f.id]}
          onToggle={onToggle}
        />
      ))}
    </section>
  );
}
