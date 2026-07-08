import type { FeatureId } from '@shared/types';
import styles from './FeatureToggle.module.css';

interface FeatureToggleProps {
  id: FeatureId;
  label: string;
  description: string;
  enabled: boolean;
  onToggle(id: FeatureId, enabled: boolean): void;
}

export function FeatureToggle({ id, label, description, enabled, onToggle }: FeatureToggleProps) {
  return (
    <div className={styles.row}>
      <div className={styles.text}>
        <span className={styles.label}>{label}</span>
        <span className={styles.description}>{description}</span>
      </div>
      <button
        role="switch"
        aria-checked={enabled}
        aria-label={`Toggle ${label}`}
        className={`${styles.toggle} ${enabled ? styles.on : styles.off}`}
        onClick={() => onToggle(id, !enabled)}
      />
    </div>
  );
}
