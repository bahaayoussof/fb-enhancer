import { useMemo, useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { CategoryGroup } from './components/CategoryGroup';
import { useFeatureSettings } from './hooks/useFeatureSettings';
import type { FeatureMeta } from './components/CategoryGroup';
import styles from './Popup.module.css';

const FEED_FEATURES: FeatureMeta[] = [
  { id: 'hide-sponsored', label: 'Sponsored Posts', description: 'Remove paid advertisements' },
  { id: 'hide-suggested', label: 'Suggested Posts', description: 'Remove algorithmic suggestions' },
  { id: 'feed-cleaner', label: 'Feed Cleaner', description: 'General feed cleanup' },
];

const MEDIA_FEATURES: FeatureMeta[] = [
  { id: 'hide-stories', label: 'Stories', description: 'Hide the Stories bar' },
  { id: 'hide-reels', label: 'Reels', description: 'Hide Reels sections' },
];

const LAYOUT_FEATURES: FeatureMeta[] = [
  { id: 'hide-sidebar', label: 'Right Sidebar', description: 'Hide sponsored and suggested sidebar' },
];

const ALL_FEATURES: FeatureMeta[] = [...FEED_FEATURES, ...MEDIA_FEATURES, ...LAYOUT_FEATURES];
const VERSION = chrome.runtime.getManifest().version;

export function Popup() {
  const { settings, loading, toggle, toggleAll } = useFeatureSettings();
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    return ALL_FEATURES.filter(
      (f) => f.label.toLowerCase().includes(q) || f.description.toLowerCase().includes(q)
    );
  }, [query]);

  const enabledCount = ALL_FEATURES.filter((f) => settings[f.id]).length;
  const allEnabled = enabledCount === ALL_FEATURES.length;
  const allDisabled = enabledCount === 0;

  return (
    <div className={styles.popup}>
      <header className={styles.header}>
        <div className={styles.titleRow}>
          <h1 className={styles.title}>FB Enhancer</h1>
          <div className={styles.headerActions}>
            <span className={styles.badge}>
              {enabledCount}/{ALL_FEATURES.length} active
            </span>
            <button
              className={styles.toggleAllBtn}
              onClick={() => toggleAll(allDisabled ? true : false)}
              title={allEnabled ? 'Disable all' : 'Enable all'}
            >
              {allDisabled ? 'Enable all' : 'Disable all'}
            </button>
          </div>
        </div>
        <SearchBar value={query} onChange={setQuery} />
      </header>

      <main className={styles.content}>
        {loading ? (
          <p className={styles.loading}>Loading…</p>
        ) : filtered !== null ? (
          filtered.length === 0 ? (
            <div className={styles.emptyState}>
              <p className={styles.emptyTitle}>No results</p>
              <p className={styles.emptyHint}>Try a different search term</p>
            </div>
          ) : (
            <CategoryGroup
              title={`Results (${filtered.length})`}
              features={filtered}
              settings={settings}
              onToggle={toggle}
            />
          )
        ) : (
          <>
            <CategoryGroup title="Feed" features={FEED_FEATURES} settings={settings} onToggle={toggle} />
            <CategoryGroup title="Media" features={MEDIA_FEATURES} settings={settings} onToggle={toggle} />
            <CategoryGroup title="Layout" features={LAYOUT_FEATURES} settings={settings} onToggle={toggle} />
          </>
        )}
      </main>

      <footer className={styles.footer}>
        <span>v{VERSION}</span>
      </footer>
    </div>
  );
}
