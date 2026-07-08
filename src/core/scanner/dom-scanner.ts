function hasRelevantAdditions(records: MutationRecord[]): boolean {
  for (const record of records) {
    if (record.type !== 'childList') continue;
    for (const node of record.addedNodes) {
      if (node.nodeType === Node.ELEMENT_NODE) return true;
    }
  }
  return false;
}

function extractAddedElements(records: MutationRecord[]): Element[] {
  const elements: Element[] = [];

  for (const record of records) {
    if (record.type !== 'childList') continue;
    for (const node of record.addedNodes) {
      if (node.nodeType === Node.ELEMENT_NODE) {
        elements.push(node as Element);
      }
    }
  }

  return elements;
}

export const domScanner = { hasRelevantAdditions, extractAddedElements };
