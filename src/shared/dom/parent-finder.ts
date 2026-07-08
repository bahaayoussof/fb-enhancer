export function findAncestor(
  element: Element,
  predicate: (el: Element) => boolean,
  maxDepth = 15
): Element | null {
  let current: Element | null = element.parentElement;
  let depth = 0;

  while (current && depth < maxDepth) {
    if (predicate(current)) return current;
    current = current.parentElement;
    depth++;
  }

  return null;
}

export function findAncestorBySelector(
  element: Element,
  selector: string,
  maxDepth = 15
): Element | null {
  return findAncestor(element, (el) => el.matches(selector), maxDepth);
}
