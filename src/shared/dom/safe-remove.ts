export function safeRemove(element: Element): boolean {
  try {
    element.remove();
    return true;
  } catch {
    return false;
  }
}
