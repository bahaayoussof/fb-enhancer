export function safeHide(element: Element): boolean {
  try {
    (element as HTMLElement).style.setProperty('display', 'none', 'important');
    return true;
  } catch {
    return false;
  }
}

export function safeShow(element: Element): boolean {
  try {
    (element as HTMLElement).style.removeProperty('display');
    return true;
  } catch {
    return false;
  }
}
