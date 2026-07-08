export interface ObserverConfig {
  target: Element;
  options: MutationObserverInit;
  callback: MutationCallback;
}
