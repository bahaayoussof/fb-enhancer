# Store Submission Answers — FB Enhancer

Ready-to-copy answers for Microsoft Edge Add-ons and Chrome Web Store submission forms.

---

## Single Purpose Description

> **Copy this into the "Single Purpose" field:**

FB Enhancer has a single purpose: to improve the Facebook browsing experience by hiding unwanted content (sponsored posts, stories, reels, suggested posts, and the right sidebar) from facebook.com pages. It does this by injecting a content script that detects and hides matching DOM elements on the page. No other functionality exists.

---

## Storage Permission Justification

> **Copy this into the storage permission justification field:**

The `storage` permission is used exclusively to persist the user's six toggle preferences (hide-stories, hide-reels, hide-sponsored, hide-suggested, hide-sidebar, feed-cleaner) across browser sessions using `chrome.storage.sync`. This is a single JSON object with boolean values. No personal data, browsing history, or page content is stored. Without this permission, the extension would reset to default settings every time the user opens a new tab.

---

## Host Permission Justification

> **Copy this into the host permissions justification field:**

The host permission for `https://www.facebook.com/*` and `https://facebook.com/*` is required to inject the content script that hides unwanted UI elements on Facebook pages. The extension operates exclusively on Facebook and requires no access to any other domain. This is the narrowest possible host permission for the extension's purpose. The content script reads DOM structure only to identify elements to hide — it does not read, capture, or transmit any page content, user data, or account information.

---

## Remote Code Justification

> **Copy this into the remote code field:**

The extension does not use any remote code. All JavaScript is bundled at build time using Vite and included in the extension package. No scripts are fetched from external URLs at runtime. The extension makes no network requests of any kind. This can be verified by inspecting the extension package — the only entry points are the bundled files in `dist/`.

---

## Data Collection

> **Answer: Does your extension collect user data?**

**No.**

> **Detailed explanation (copy if required):**

FB Enhancer does not collect any user data. It does not transmit any information to any server. It does not use analytics, telemetry, crash reporting, or any third-party data services. The only data the extension handles is the user's own toggle preferences, which are stored locally in `chrome.storage.sync` and never leave the user's browser environment (except via the user's own browser sync, which is handled entirely by Google/Microsoft, not by this extension).

---

## Privacy Disclosures

### Does your extension handle personal communications?

No.

### Does your extension handle financial or payment information?

No.

### Does your extension handle health information?

No.

### Does your extension handle authentication credentials?

No.

### Does your extension handle personal data?

No.

### Does your extension sell user data?

No.

### Does your extension share user data with third parties?

No.

### Does your extension use the data for purposes other than the extension's single purpose?

No. The only data stored is the user's feature toggle preferences, used exclusively to restore those preferences when the extension loads.

---

## Privacy Policy URL

```
https://zokavic1.github.io/fb-enhancer/privacy-policy
```

---

## Chrome Web Store — Additional Fields

**Category:** Productivity

**Language:** English

**Description (short, max 132 chars):**

```
Clean up your Facebook feed — hide sponsored posts, stories, reels, suggestions, and the right sidebar.
```

**Description (detailed):**

```
FB Enhancer is a lightweight, privacy-first browser extension that removes unwanted content from your Facebook feed.

FEATURES:
• Hide Sponsored Posts — removes paid advertisements
• Hide Suggested Posts — removes algorithmic suggestions
• Hide Stories — removes the Stories bar
• Hide Reels — removes short-video carousels
• Feed Cleaner — general feed cleanup
• Hide Right Sidebar — removes sponsored and suggested sidebar blocks

CONTROLS:
• Toggle each filter individually from the popup
• Enable All / Disable All with a single click
• Settings sync across your devices

PRIVACY:
• No data collection
• No analytics or tracking
• No external servers
• All processing happens locally on your device
• Settings stored locally using the browser's built-in Storage API
```
