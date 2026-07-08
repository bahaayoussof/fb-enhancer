# Cerebrum

> OpenWolf's learning memory. Updated automatically as the AI learns from interactions.
> Do not edit manually unless correcting an error.
> Last updated: 2026-07-08

## User Preferences

<!-- How the user likes things done. Code style, tools, patterns, communication. -->

## Key Learnings

- **Project:** fb-enhancer — Chrome Extension MV3, TypeScript + React + Vite
- **Build:** `vite-plugin-web-extension` reads root `manifest.json`, auto-discovers all entry points (HTML, .ts), outputs valid MV3 manifest to `dist/`. `.ts` refs in manifest become `.js` in output automatically.
- **Entry points:** popup + options use `src/*/index.html` → `*.tsx` (React root). background + content are bare `.ts` files. All 4 built as separate chunks.
- **Aliases:** `@`, `@core`, `@features`, `@shared`, `@ui` — defined in both `vite.config.ts` (resolve.alias) and `tsconfig.json` (paths). Must stay in sync.
- **ESLint:** v8 with `.eslintrc.cjs` (legacy format). `webextensions: true` env enables chrome.* globals. `react/react-in-jsx-scope: off` needed for React 17+ JSX transform.
- **Sprints:** Never implement a sprint until user explicitly approves. User approved PLAN.md to start Sprint 0.

## Do-Not-Repeat

<!-- Mistakes made and corrected. Each entry prevents the same mistake recurring. -->
<!-- Format: [YYYY-MM-DD] Description of what went wrong and what to do instead. -->

## Decision Log

- **[2026-07-08] Build tool:** `vite-plugin-web-extension` over manual `rollupOptions` — reads manifest.json directly, handles MV3 service worker quirks, no manual entry point config needed.
- **[2026-07-08] ESLint 8** kept (not 9) to match plan's `.eslintrc.cjs` format. ESLint 9 uses flat config (`eslint.config.js`) — different format.
- **[2026-07-08] manifest.json at root** (not `src/manifest.json` as plan noted) — vite-plugin-web-extension default. Simpler, no extra config needed.
- **[2026-07-08] Single MutationObserver on body** (decided in PLAN.md) — avoids N observers for N features. Broadcasts via FeatureManager.
- **[2026-07-08] Feature self-registration via side-effect imports** — satisfies Open/Closed. Core never modified when adding features.
