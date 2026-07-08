# Permission Justification — FB Enhancer

This document explains every permission declared in `manifest.json` and why it is required.

---

## `"storage"` — chrome.storage API

**Why it exists:**
The Extension needs to remember which filters the user has toggled on or off. Without storage, every time the user opens a new Facebook tab their preferences would reset to defaults.

**Why it is required:**
This is the only browser-native API for extensions to persist key-value settings across sessions. It is the recommended approach in the Chrome Extension and Edge Add-on developer documentation.

**Why it cannot be removed:**
Removing it would mean the extension forgets all user preferences the moment the popup is closed. The entire settings system (`chrome.storage.sync.get` / `chrome.storage.sync.set`) would break.

**What user data it accesses:**
Only the extension's own settings object — a JSON record of which features are enabled:

```json
{ "hide-stories": true, "hide-reels": true, "hide-sponsored": true, ... }
```

No personal information, no browsing history, no Facebook content.

---

## `host_permissions: ["https://www.facebook.com/*", "https://facebook.com/*"]`

**Why it exists:**
The Extension must inject a content script into Facebook pages to scan the DOM and hide unwanted elements. MV3 requires that the exact domains a content script targets are declared in `host_permissions`.

**Why it is required:**
Without this declaration, the browser will not permit the content script to run on `facebook.com`. The extension would be completely non-functional.

**Why it cannot be removed:**
This is the narrowest possible host permission for an extension that operates on Facebook. It is scoped to exactly two URL patterns covering the canonical and non-www variants of facebook.com.

**What user data it accesses:**
The content script reads the Facebook page DOM solely to identify structural patterns (CSS selectors, ARIA attributes, text content of "Sponsored" labels) that match unwanted elements. It does not:

- Read or transmit the content of posts
- Access your Facebook account information
- Capture or log any page data
- Communicate with any server

---

## Permissions that were considered and rejected

| Permission     | Reason not included                                                                                                                               |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `"tabs"`       | Not needed. `chrome.tabs.sendMessage()` and `chrome.tabs.query()` work without it.                                                                |
| `"activeTab"`  | Was previously included, removed in v1.0.0. Content script handles page reloads via `window.location.reload()` instead of `chrome.tabs.reload()`. |
| `"scripting"`  | Not needed. Content scripts are declared statically in the manifest.                                                                              |
| `"cookies"`    | Not used. No cookies are read or written.                                                                                                         |
| `"history"`    | Not used. No browsing history is accessed.                                                                                                        |
| `"webRequest"` | Not used. No network requests are intercepted or modified.                                                                                        |
| `"identity"`   | Not used. No user identity or login is required.                                                                                                  |
