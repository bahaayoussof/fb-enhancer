function extractAddedElements(records: MutationRecord[]): Element[] {
  const elements: Element[] = [];

  for (const record of records) {
    for (const node of record.addedNodes) {
      if (node.nodeType === Node.ELEMENT_NODE) {
        elements.push(node as Element);
      }
    }
  }

  return elements;
}

export const domScanner = { extractAddedElements };
