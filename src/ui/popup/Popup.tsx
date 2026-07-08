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
const LOGO = chrome.runtime.getURL('images/logo.png');

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
  const allDisabled = enabledCount === 0;

  return (
    <div className={styles.popup}>
      <header className={styles.header}>
        <div className={styles.titleRow}>
          <img src={LOGO} className={styles.logo} alt="" />
          <div className={styles.titleMeta}>
            <h1 className={styles.title}>FB Enhancer</h1>
            <span className={styles.subtitle}>Facebook Feed Cleaner</span>
          </div>
          <div className={styles.headerActions}>
            <span className={`${styles.badge} ${enabledCount === 0 ? styles.badgeZero : ''}`}>
              {enabledCount}/{ALL_FEATURES.length}
            </span>
            <button
              className={styles.toggleAllBtn}
              onClick={() => toggleAll(allDisabled ? true : false)}
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

      <footer className={styles.footer}>v{VERSION}</footer>
    </div>
  );
}
