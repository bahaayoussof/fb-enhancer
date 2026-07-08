# FB Enhancer — Pre-Code Plan

> Blueprint before Sprint 0. Approved plan = start coding. Each Sprint still needs explicit approval before implementation.

---

## 1. Project At a Glance

| Item     | Value                          |
| -------- | ------------------------------ |
| Name     | fb-enhancer                    |
| Type     | Chrome Extension (Manifest V3) |
| Language | TypeScript                     |
| UI       | React + CSS Modules            |
| Build    | Vite                           |
| Target   | Facebook.com feed cleanup      |
| Sprints  | 0 → 15 (16 total)              |

---

## 2. Final Folder Structure

Complete tree of what we'll build across all sprints.

```
fb-enhancer/
├── public/
│   └── icons/
│       ├── icon16.png
│       ├── icon32.png
│       ├── icon48.png
│       └── icon128.png
├── src/
│   ├── manifest.json                  ← MV3 manifest (lives in src, copied by Vite)
│   │
│   ├── core/                          ← Framework — knows nothing about features
│   │   ├── bootstrap.ts               ← Entry: wires everything together
│   │   ├── context/
│   │   │   ├── context-builder.ts     ← Builds PageContext (URL, page type, etc.)
│   │   │   └── types.ts
│   │   ├── scanner/
│   │   │   ├── dom-scanner.ts         ← Finds candidate DOM nodes
│   │   │   └── types.ts
│   │   ├── observer/
│   │   │   ├── observer-manager.ts    ← Owns all MutationObservers
│   │   │   └── types.ts
│   │   ├── feature-manager/
│   │   │   ├── feature-manager.ts     ← Registers + runs features
│   │   │   └── types.ts
│   │   ├── messaging/
│   │   │   ├── messaging-service.ts   ← chrome.runtime wrapper
│   │   │   └── types.ts
│   │   ├── storage/
│   │   │   ├── storage-service.ts     ← chrome.storage wrapper
│   │   │   └── types.ts
│   │   ├── logger/
│   │   │   ├── logger.ts              ← Centralized logger (info/warn/error/debug)
│   │   │   └── types.ts
│   │   └── pipeline/
│   │       └── extension-pipeline.ts  ← Orchestrates scan → match → act lifecycle
│   │
│   ├── features/                      ← Each feature is fully isolated
│   │   ├── hide-stories/
│   │   │   ├── index.ts               ← Feature entry (registers with FeatureManager)
│   │   │   ├── feature.ts             ← Feature definition (metadata + wiring)
│   │   │   ├── scanner.ts             ← Finds story containers
│   │   │   ├── matcher.ts             ← Confirms element IS a story
│   │   │   ├── actions.ts             ← Hides/removes matched elements
│   │   │   ├── observer.ts            ← Stories-specific observation config
│   │   │   ├── constants.ts           ← Selectors live here
│   │   │   └── types.ts
│   │   ├── hide-reels/                ← Same shape as hide-stories
│   │   ├── hide-sponsored/            ← Same shape
│   │   ├── hide-suggested/            ← Same shape
│   │   ├── hide-sidebar/              ← Same shape
│   │   └── feed-cleaner/              ← Combines & coordinates feed-level cleanup
│   │
│   ├── shared/                        ← Reusable utilities, no feature logic
│   │   ├── dom/
│   │   │   ├── safe-remove.ts
│   │   │   ├── safe-hide.ts
│   │   │   ├── parent-finder.ts
│   │   │   └── selector-helpers.ts
│   │   ├── utils/
│   │   │   ├── retry.ts
│   │   │   ├── debounce.ts
│   │   │   └── is-facebook.ts
│   │   └── types/
│   │       └── index.ts               ← Global shared types (FeatureId, etc.)
│   │
│   ├── ui/                            ← React components for Popup + Options
│   │   ├── popup/
│   │   │   ├── Popup.tsx
│   │   │   ├── Popup.module.css
│   │   │   ├── components/
│   │   │   │   ├── FeatureList.tsx
│   │   │   │   ├── FeatureToggle.tsx
│   │   │   │   ├── SearchBar.tsx
│   │   │   │   └── CategoryGroup.tsx
│   │   │   └── hooks/
│   │   │       └── useFeatureSettings.ts
│   │   └── options/
│   │       ├── Options.tsx
│   │       └── Options.module.css
│   │
│   ├── content/
│   │   └── content.ts                 ← Content script entry point
│   │
│   ├── background/
│   │   └── background.ts              ← Service worker entry point
│   │
│   ├── popup/
│   │   └── popup.tsx                  ← React root for popup page
│   │
│   └── options/
│       └── options.tsx                ← React root for options page
│
├── .docs/
│   ├── ROADMAP.md
│   ├── AI_RULES.md
│   └── PLAN.md                        ← this file
├── vite.config.ts
├── tsconfig.json
├── .eslintrc.cjs
├── .prettierrc
└── package.json
```

---

## 3. Core Contracts (Key Interfaces)

Defined in Sprint 2. Every module depends on these.

```typescript
// core/feature-manager/types.ts
interface IFeature {
  id: FeatureId;
  displayName: string;
  description: string;
  defaultEnabled: boolean;
  run(context: PageContext): void;
  teardown(): void;
}

// core/context/types.ts
interface PageContext {
  url: string;
  pageType: FacebookPageType; // 'home' | 'profile' | 'group' | 'watch' | 'other'
  timestamp: number;
}

// core/observer/types.ts
interface ObserverConfig {
  target: Element;
  options: MutationObserverInit;
  callback: MutationCallback;
}

// core/scanner/types.ts
interface ScanResult {
  element: Element;
  featureId: FeatureId;
}

// shared/types/index.ts
type FeatureId =
  | 'hide-stories'
  | 'hide-reels'
  | 'hide-sponsored'
  | 'hide-suggested'
  | 'hide-sidebar'
  | 'feed-cleaner';

interface FeatureSettings {
  [K in FeatureId]: boolean;
}
```

---

## 4. Data Flow

```
Facebook page loads
       │
       ▼
content.ts (entry)
       │
       ▼
bootstrap.ts
  ├─ ContextBuilder.build()      → PageContext
  ├─ StorageService.load()       → FeatureSettings
  ├─ FeatureManager.register()   ← all features self-register
  └─ ExtensionPipeline.start()
           │
           ▼
    ObserverManager watches DOM
           │
      mutation fires
           │
           ▼
    DOMScanner.scan(mutations)
           │
           ▼
    FeatureManager.run(context)
      for each enabled feature:
        ├─ feature.scanner.find()    → Element[]
        ├─ feature.matcher.match()   → Element[] (confirmed)
        └─ feature.actions.hide()    → DOM mutated
           │
           ▼
    Logger records action
```

---

## 5. Messaging Contract

```
Popup / Options  ──sendMessage──▶  background.ts
                                        │
                              chrome.tabs.sendMessage
                                        │
                                   content.ts
                                        │
                               StorageService.save()
                               FeatureManager.toggle()
```

Message types defined once in `core/messaging/types.ts`. No scattered `chrome.runtime.sendMessage` calls anywhere else.

---

## 6. Sprint Map

| Sprint | Name           | Key Deliverables                                                                | Depends On | Risk |
| ------ | -------------- | ------------------------------------------------------------------------------- | ---------- | ---- |
| **0**  | Foundation     | Vite, React, TS, MV3, ESLint, Prettier, aliases, build pipeline                 | —          | Low  |
| **1**  | Bootstrap      | Content script, background SW, popup page, options page, logger, messaging stub | S0         | Low  |
| **2**  | Core Engine    | ContextBuilder, DOMScanner, ObserverManager, FeatureManager, Pipeline           | S1         | High |
| **3**  | Storage        | StorageService, FeatureSettings, defaults, chrome.storage.sync wrapper          | S2         | Low  |
| **4**  | Popup UI       | React popup, FeatureList, FeatureToggle, SearchBar, CategoryGroup               | S3         | Med  |
| **5**  | DOM Utils      | safeRemove, safeHide, parentFinder, selectorHelpers, retry                      | S2         | Low  |
| **6**  | Hide Stories   | Full feature: scanner/matcher/actions/observer/constants                        | S2,S5      | Med  |
| **7**  | Hide Reels     | Full feature                                                                    | S2,S5      | Med  |
| **8**  | Hide Sponsored | Full feature                                                                    | S2,S5      | High |
| **9**  | Hide Suggested | Full feature                                                                    | S2,S5      | Med  |
| **10** | Hide Sidebar   | Full feature                                                                    | S2,S5      | Low  |
| **11** | Feed Cleaner   | Coordinates feed-level cleanup, deduplication                                   | S6-S10     | High |
| **12** | Performance    | CPU profiling, observer throttle, cache lookups, batch updates                  | S11        | Med  |
| **13** | Stability      | Multi-strategy selectors, fallback detection, graceful recovery                 | S12        | Med  |
| **14** | UI Polish      | Better UX, statistics counter, import/export settings                           | S4,S13     | Low  |
| **15** | Release        | Docs, icons, versioning, packaging, CWS readiness                               | All        | Low  |

**Risk Legend:** Low = well-understood. Med = Facebook DOM may require iteration. High = Facebook obfuscates these elements aggressively.

---

## 7. Sprint 0 — Foundation Detail

First sprint to implement. Goal: working build with nothing running yet.

### Files to create

```
vite.config.ts
tsconfig.json
package.json
.eslintrc.cjs
.prettierrc
src/manifest.json
src/content/content.ts          ← empty stub
src/background/background.ts    ← empty stub
src/popup/popup.tsx             ← empty stub
src/options/options.tsx         ← empty stub
public/icons/                   ← placeholder icons
```

### Vite config strategy

Vite needs multiple entry points (content script, background SW, popup page, options page). Use `vite-plugin-web-extension` or manual multi-entry `rollupOptions` with `input` map.

Recommended: **`vite-plugin-web-extension`** — reads `manifest.json`, auto-discovers entries, handles MV3 service worker quirks, HMR for popup/options.

### Aliases

```typescript
'@': './src',
'@core': './src/core',
'@features': './src/features',
'@shared': './src/shared',
'@ui': './src/ui',
```

### Acceptance Criteria Sprint 0

- [ ] `npm run build` produces `dist/` with valid MV3 extension
- [ ] `dist/manifest.json` is valid (MV3 format)
- [ ] Content script, background, popup, options all bundled separately
- [ ] Zero TypeScript errors
- [ ] ESLint passes
- [ ] Prettier passes
- [ ] Extension loads in Chrome without errors

---

## 8. Sprint 1 — Bootstrap Detail

### Logger contract (established in S1, used everywhere)

```typescript
interface ILogger {
  info(message: string, ...args: unknown[]): void;
  warn(message: string, ...args: unknown[]): void;
  error(message: string, error?: unknown): void;
  debug(message: string, ...args: unknown[]): void;
}
```

Prefix all output: `[FB Enhancer]`. Respect `isDev` flag — debug logs silent in production.

### Messaging stub (S1 → full impl in S2)

Define message types immediately. Avoid stringly-typed messages.

```typescript
type MessageType = 'TOGGLE_FEATURE' | 'GET_SETTINGS' | 'SETTINGS_UPDATED';

interface ExtensionMessage<T extends MessageType, P = void> {
  type: T;
  payload: P;
}
```

### Acceptance Criteria Sprint 1

- [ ] Content script injects and logs `[FB Enhancer] content ready` on facebook.com
- [ ] Background SW starts and logs `[FB Enhancer] background ready`
- [ ] Popup page renders (React root mounts)
- [ ] Options page renders (React root mounts)
- [ ] Popup can send a message; background receives it
- [ ] Logger is the only console output path

---

## 9. Sprint 2 — Core Engine Detail

Most complex sprint. Sets the architectural foundation.

### FeatureManager registration pattern

Features self-register — Core never imports features directly.

```typescript
// In each feature's index.ts:
featureManager.register(myFeature);

// In bootstrap.ts:
import '@features/hide-stories'; // side-effect import triggers register()
import '@features/hide-reels';
// ...
```

This satisfies Open/Closed: add a feature by adding one import line, not editing FeatureManager.

### ObserverManager strategy

Single MutationObserver on `document.body` (not per-feature). Broadcasts to features via FeatureManager. Avoids N observers for N features.

### DOMScanner

Scans only `addedNodes` from mutation records. Never re-scans entire page. Filters text nodes immediately.

### ExtensionPipeline lifecycle

```
start() → init context → load settings → register features → start observer
stop()  → disconnect observer → teardown features → clear state
```

### Acceptance Criteria Sprint 2

- [ ] FeatureManager registers/runs/tears down features
- [ ] ObserverManager observes body, fires on DOM changes
- [ ] DOMScanner processes only addedNodes
- [ ] ContextBuilder detects Facebook page type
- [ ] Pipeline start/stop work without errors
- [ ] Feature failure does NOT stop other features (try/catch per feature)

---

## 10. Critical Architectural Decisions

| Decision             | Choice                                                  | Reason                                                |
| -------------------- | ------------------------------------------------------- | ----------------------------------------------------- |
| Build tool           | Vite + vite-plugin-web-extension                        | HMR, MV3 support, minimal config                      |
| Observer strategy    | Single observer on body                                 | Avoids N observers, easier lifecycle management       |
| Feature registration | Self-registration via side-effect imports               | Open/Closed — Core never changes when adding features |
| Storage              | chrome.storage.sync                                     | Persists across devices, fits extension pattern       |
| Selector resilience  | Array of fallback selectors per element type            | Facebook changes class names frequently               |
| CSS                  | CSS Modules                                             | Scoped, no global leakage, good TS support            |
| State (UI)           | Local React state + chrome.storage                      | No Redux needed at this scale                         |
| Message typing       | Discriminated union types                               | Type-safe, no stringly-typed messages                 |
| DOM actions          | Centralized in `actions.ts` per feature + `shared/dom/` | Never scatter DOM ops                                 |

---

## 11. Facebook DOM Selectors Strategy

Facebook obfuscates class names (e.g., `x1abc123`). Detection must be multi-strategy.

Priority order for each element type:

1. **ARIA attributes** — `role`, `aria-label` (most stable)
2. **Data attributes** — `data-testid`, `data-pagelet`
3. **Text content matching** — e.g. "Sponsored" text node
4. **Structural patterns** — parent/child relationships
5. **Fallback class selectors** — last resort, most fragile

Each feature's `constants.ts` holds an ordered array:

```typescript
export const STORY_SELECTORS: readonly string[] = [
  '[data-pagelet="Stories"]',
  '[aria-label="Stories"]',
  'div[role="complementary"] [aria-label*="story"]',
];
```

Matcher tries each in order, stops on first match.

---

## 12. Risks & Mitigations

| Risk                             | Impact | Mitigation                                         |
| -------------------------------- | ------ | -------------------------------------------------- |
| Facebook changes DOM structure   | High   | Multi-strategy selectors, graceful fail            |
| Content script blocked by CSP    | Med    | MV3 content scripts bypass page CSP                |
| MutationObserver performance     | Med    | Single observer, throttle callback, filter early   |
| Feature crashes entire extension | High   | try/catch per feature in pipeline                  |
| Storage quota exceeded           | Low    | Settings are minimal (booleans), sync quota ~100KB |
| MV3 service worker termination   | Med    | Stateless background — re-initialize on wake       |

---

## 13. Non-Goals (Out of Scope)

- Firefox support (MV3 only for now)
- Custom user-defined rules
- Cloud sync beyond chrome.storage.sync
- Analytics / telemetry
- Multiple profiles / accounts
- Notification system

---

## 14. Pre-Sprint Checklist

Before Sprint 0 starts:

- [ ] Node.js 18+ installed
- [ ] Chrome installed (for testing)
- [ ] Project directory initialized (`git init`)
- [ ] `package.json` scaffolded (`npm init`)
- [ ] This plan reviewed and approved

---

## 15. Sprint Approval Order

```
PLAN approved ✓
    ↓
Sprint 0 approved? → implement → done
    ↓
Sprint 1 approved? → implement → done
    ↓
... (never skip, never implement ahead)
```

**Rule:** No sprint starts without explicit "approved" from user.
