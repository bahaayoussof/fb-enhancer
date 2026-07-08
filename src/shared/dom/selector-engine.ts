import { logger } from '@core/logger/logger';

export type SelectorStrategy = 'aria' | 'data-attr' | 'text' | 'structural' | 'class';

export interface SelectorEntry {
  selector: string;
  strategy: SelectorStrategy;
}

export class SelectorEngine {
  constructor(private readonly entries: readonly SelectorEntry[]) {}

  queryAll(root: Element | Document): Element[] {
    const found = new Set<Element>();

    for (const { selector, strategy } of this.entries) {
      try {
        root.querySelectorAll(selector).forEach((el) => found.add(el));
      } catch (err) {
        logger.warn(`[SelectorEngine] invalid selector (${strategy}): "${selector}"`, err);
      }
    }

    return [...found];
  }

  matches(element: Element): boolean {
    for (const { selector, strategy } of this.entries) {
      try {
        if (element.matches(selector)) return true;
      } catch (err) {
        logger.warn(`[SelectorEngine] invalid selector (${strategy}): "${selector}"`, err);
      }
    }
    return false;
  }
}
