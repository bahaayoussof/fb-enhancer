import styles from './SearchBar.module.css';

interface SearchBarProps {
  value: string;
  onChange(value: string): void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className={styles.wrapper}>
      <span className={styles.icon}>⌕</span>
      <input
        className={styles.input}
        type="search"
        placeholder="Search features…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search features"
      />
    </div>
  );
}
