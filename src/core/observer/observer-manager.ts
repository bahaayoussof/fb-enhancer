import type { ObserverConfig } from './types';

const BODY_OBSERVER_OPTIONS: MutationObserverInit = {
  childList: true,
  subtree: true,
};

class ObserverManager {
  private observer: MutationObserver | null = null;

  observe(callback: MutationCallback): void {
    if (this.observer) return;

    this.observer = new MutationObserver(callback);
    this.observer.observe(document.body, BODY_OBSERVER_OPTIONS);
  }

  observeCustom({ target, options, callback }: ObserverConfig): MutationObserver {
    const observer = new MutationObserver(callback);
    observer.observe(target, options);
    return observer;
  }

  disconnect(): void {
    this.observer?.disconnect();
    this.observer = null;
  }
}

export const observerManager = new ObserverManager();
