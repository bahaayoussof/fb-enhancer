# anatomy.md

> Auto-maintained by OpenWolf. Last scanned: 2026-07-08T08:16:27.598Z
> Files: 51 tracked | Anatomy hits: 0 | Misses: 0

## ./

- `.eslintrc.cjs` — ESLint 8 config: TS + React + Hooks + Prettier rules (~207 tok)
- `.prettierrc` — Prettier: singleQuote, semi, tabWidth 2, printWidth 100 (~36 tok)
- `CLAUDE.md` — OpenWolf entry point (~57 tok)
- `manifest.json` — MV3 manifest: storage+activeTab perms, content script on facebook.com (~196 tok)
- `package.json` — React 18, Vite 5, TS 5, vite-plugin-web-extension, ESLint 8 (~238 tok)
- `tsconfig.json` — strict, bundler moduleResolution, paths aliases @/@core/@features/@shared/@ui (~200 tok)
- `vite.config.ts` — vite-plugin-web-extension + @vitejs/plugin-react + path aliases (~203 tok)

## .claude/

- `settings.json` (~441 tok)

## .claude/rules/

- `openwolf.md` (~313 tok)

## .docs/

- `AI_RULES.md` — Engineering standards, architecture rules, coding conventions (~900 tok)
- `PLAN.md` — Pre-code blueprint: full folder tree, core interfaces, sprint map, data flow, risks (~3754 tok)
- `ROADMAP.md` — Sprint roadmap S0–S15 with goals and acceptance criteria (~800 tok)

## src/background/

- `background.ts` (~261 tok)

## src/content/

- `content.ts` (~192 tok)

## src/core/context/

- `context-builder.ts` — Exports buildContext (~271 tok)
- `types.ts` — Exports FacebookPageType, PageContext (~57 tok)

## src/core/feature-manager/

- `feature-manager.ts` — Exports featureManager (~418 tok)
- `types.ts` — Exports IFeature (~95 tok)

## src/core/logger/

- `logger.ts` — Exports logger (~187 tok)
- `types.ts` — Exports ILogger (~67 tok)

## src/core/messaging/

- `messaging-service.ts` — Exports messagingService (~328 tok)
- `types.ts` — Exports ToggleFeaturePayload, SettingsUpdatedPayload, ExtensionMessage (~119 tok)

## src/core/observer/

- `observer-manager.ts` — Exports observerManager (~218 tok)
- `types.ts` — Exports ObserverConfig (~34 tok)

## src/core/pipeline/

- `extension-pipeline.ts` — Exports extensionPipeline (~451 tok)

## src/core/scanner/

- `dom-scanner.ts` — Exports domScanner (~105 tok)
- `types.ts` — Exports ScanResult (~36 tok)

## src/core/storage/

- `defaults.ts` — Exports DEFAULT_SETTINGS (~76 tok)
- `storage-service.ts` — Exports storageService (~400 tok)
- `types.ts` — Exports IStorageService (~81 tok)

## src/options/

- `index.html` — FB Enhancer — Settings (~83 tok)
- `options.tsx` — Options (~121 tok)

## src/popup/

- `index.html` — FB Enhancer (~98 tok)
- `popup.tsx` — rootEl (~56 tok)

## src/shared/dom/

- `parent-finder.ts` — Exports findAncestor, findAncestorBySelector (~156 tok)
- `safe-hide.ts` — Exports safeHide, safeShow (~107 tok)
- `safe-remove.ts` — Exports safeRemove (~40 tok)
- `selector-helpers.ts` — Exports queryFirst, queryAll, hasText, hasAriaLabel (~290 tok)

## src/shared/types/

- `index.ts` — Exports FeatureId, FeatureSettings (~59 tok)

## src/shared/utils/

- `debounce.ts` — Exports debounce (~96 tok)
- `is-facebook.ts` — Exports isFacebookPage (~34 tok)
- `retry.ts` — Exports retryWithDelay (~156 tok)

## src/ui/popup/

- `Popup.module.css` — Styles: 7 rules (~216 tok)
- `Popup.tsx` — FEED_FEATURES (~750 tok)

## src/ui/popup/components/

- `CategoryGroup.module.css` — Styles: 2 rules (~57 tok)
- `CategoryGroup.tsx` — CategoryGroup (~261 tok)
- `FeatureToggle.module.css` — Styles: 11 rules (~316 tok)
- `FeatureToggle.tsx` — FeatureToggle (~237 tok)
- `SearchBar.module.css` — Styles: 3 rules (~88 tok)
- `SearchBar.tsx` — SearchBar (~121 tok)

## src/ui/popup/hooks/

- `useFeatureSettings.ts` — Exports useFeatureSettings (~394 tok)
