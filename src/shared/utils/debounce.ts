export function debounce<T extends unknown[]>(
  fn: (...args: T) => void,
  waitMs: number
): (...args: T) => void {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return (...args: T) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
      timer = null;
    }, waitMs);
  };
}
