export function queryFirst(root: Element | Document, selectors: readonly string[]): Element | null {
  for (const selector of selectors) {
    try {
      const el = root.querySelector(selector);
      if (el) return el;
    } catch {
      // Invalid selector — skip
    }
  }
  return null;
}

export function queryAll(root: Element | Document, selectors: readonly string[]): Element[] {
  const results: Element[] = [];
  const seen = new Set<Element>();

  for (const selector of selectors) {
    try {
      root.querySelectorAll(selector).forEach((el) => {
        if (!seen.has(el)) {
          seen.add(el);
          results.push(el);
        }
      });
    } catch {
      // Invalid selector — skip
    }
  }

  return results;
}

export function hasText(element: Element, text: string): boolean {
  return element.textContent?.includes(text) ?? false;
}

export function hasAriaLabel(element: Element, label: string): boolean {
  return element.getAttribute('aria-label')?.includes(label) ?? false;
}
