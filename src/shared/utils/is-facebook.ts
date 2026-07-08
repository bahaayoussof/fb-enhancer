export function isFacebookPage(): boolean {
  return /^https?:\/\/(www\.)?facebook\.com/.test(window.location.href);
}
