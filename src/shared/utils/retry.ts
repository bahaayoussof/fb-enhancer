interface RetryOptions {
  attempts: number;
  delayMs: number;
}

export function retryWithDelay<T>(
  fn: () => T | null,
  { attempts, delayMs }: RetryOptions
): Promise<T | null> {
  return new Promise((resolve) => {
    let remaining = attempts;

    const attempt = () => {
      const result = fn();
      if (result !== null) {
        resolve(result);
        return;
      }
      remaining--;
      if (remaining <= 0) {
        resolve(null);
        return;
      }
      setTimeout(attempt, delayMs);
    };

    attempt();
  });
}
