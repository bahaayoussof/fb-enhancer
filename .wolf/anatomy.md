# anatomy.md

> Auto-maintained by OpenWolf. Last scanned: 2026-07-08T10:47:53.377Z
> Files: 88 tracked | Anatomy hits: 0 | Misses: 0

## ./

- `.eslintrc.cjs` — ESLint 8 config: TS + React + Hooks + Prettier rules (~207 tok)
- `.prettierrc` — Prettier: singleQuote, semi, tabWidth 2, printWidth 100 (~36 tok)
- `CLAUDE.md` — OpenWolf entry point (~57 tok)
- `manifest.json` (~290 tok)
- `package.json` — Node.js package manifest (~273 tok)
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

- `background.ts` — Declares updated (~411 tok)

## src/content/

- `content.ts` — Feature registrations — side-effect imports trigger featureManager.register() (~244 tok)

## src/core/context/

- `context-builder.ts` — Exports buildContext (~271 tok)
- `types.ts` — Exports FacebookPageType, PageContext (~57 tok)

## src/core/feature-manager/

- `feature-manager.ts` — Exports featureManager (~598 tok)
- `types.ts` — Exports IFeature (~95 tok)

## src/core/logger/

- `logger.ts` — Exports logger (~187 tok)
- `types.ts` — Exports ILogger (~67 tok)

## src/core/messaging/

- `messaging-service.ts` — Exports messagingService (~387 tok)
- `types.ts` — Exports ToggleFeaturePayload, SettingsUpdatedPayload, ToggleAllPayload, ExtensionMessage (~152 tok)

## src/core/observer/

- `observer-manager.ts` — Exports observerManager (~218 tok)
- `types.ts` — Exports ObserverConfig (~34 tok)

## src/core/pipeline/

- `extension-pipeline.ts` — Idle window before processing accumulated mutations. (~942 tok)

## src/core/scanner/

- `dom-scanner.ts` — Exports domScanner (~205 tok)
- `types.ts` — Exports ScanResult (~36 tok)

## src/core/storage/

- `defaults.ts` — Exports DEFAULT_SETTINGS (~76 tok)
- `storage-service.ts` — Exports storageService (~400 tok)
- `types.ts` — Exports IStorageService (~81 tok)

## src/features/feed-cleaner/

- `actions.ts` — Exports hideFeedNoiseElement, showFeedNoiseElement (~148 tok)
- `constants.ts` — Catch-all for feed elements not covered by other features (~167 tok)
- `feature.ts` — Exports FeedCleanerFeature (~354 tok)
- `index.ts` (~50 tok)
- `matcher.ts` — Exports isFeedNoiseElement (~101 tok)
- `scanner.ts` — Exports findFeedNoiseElements (~266 tok)

## src/features/hide-reels/

- `actions.ts` — Exports hideReelElement, showReelElement (~140 tok)
- `constants.ts` — Exports REELS_SELECTORS (~60 tok)
- `feature.ts` — Exports HideReelsFeature (~338 tok)
- `index.ts` (~48 tok)
- `matcher.ts` — Exports isReelsElement (~100 tok)
- `scanner.ts` — Exports findReelElements (~170 tok)

## src/features/hide-sidebar/

- `actions.ts` — Exports hideSidebarElement, showSidebarElement (~72 tok)
- `constants.ts` — Exports SIDEBAR_SELECTORS (~54 tok)
- `feature.ts` — Exports HideSidebarFeature (~347 tok)
- `index.ts` (~50 tok)
- `matcher.ts` — Exports isSidebarElement (~100 tok)
- `scanner.ts` — Exports findSidebarElements (~156 tok)

## src/features/hide-sponsored/

- `actions.ts` — Exports hideSponsoredPost, showSponsoredPost (~190 tok)
- `constants.ts` — Sponsored posts are identified by text content, aria attributes, and structural patterns. (~243 tok)
- `feature.ts` — Exports HideSponsoredFeature (~347 tok)
- `index.ts` (~51 tok)
- `matcher.ts` — Exports isSponsoredLabel (~122 tok)
- `scanner.ts` — Exports findSponsoredElements (~406 tok)

## src/features/hide-stories/

- `actions.ts` — Some story containers are nested — walk up to find the outermost wrapping div (~198 tok)
- `constants.ts` — Ordered by stability: data-pagelet > aria > testid > structural (~266 tok)
- `feature.ts` — Exports HideStoriesFeature (~343 tok)
- `index.ts` (~50 tok)
- `matcher.ts` — Exports isStoriesElement (~135 tok)
- `scanner.ts` — Exports findStoryElements (~195 tok)

## src/features/hide-suggested/

- `actions.ts` — Exports hideSuggestedElement, showSuggestedElement (~149 tok)
- `constants.ts` — Exports SUGGESTED_SELECTORS, SUGGESTED_TEXT_MARKERS (~147 tok)
- `feature.ts` — Exports HideSuggestedFeature (~353 tok)
- `index.ts` (~51 tok)
- `matcher.ts` — Exports isSuggestedElement (~101 tok)
- `scanner.ts` — Exports findSuggestedElements (~288 tok)

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
- `selector-engine.ts` — Exports SelectorStrategy, SelectorEntry, SelectorEngine (~292 tok)
- `selector-helpers.ts` — Exports queryFirst, queryAll, hasText, hasAriaLabel (~290 tok)

## src/shared/types/

- `index.ts` — Exports FeatureId, FeatureSettings (~59 tok)

## src/shared/utils/

- `debounce.ts` — Exports debounce (~96 tok)
- `is-facebook.ts` — Exports isFacebookPage (~34 tok)
- `retry.ts` — Exports retryWithDelay (~156 tok)

## src/ui/popup/

- `Popup.module.css` — Styles: 19 rules, 25 vars (~1012 tok)
- `Popup.tsx` — FEED_FEATURES (~908 tok)

## src/ui/popup/components/

- `CategoryGroup.module.css` — Styles: 3 rules (~100 tok)
- `CategoryGroup.tsx` — CategoryGroup (~281 tok)
- `FeatureToggle.module.css` — Styles: 10 rules (~659 tok)
- `FeatureToggle.tsx` — FeatureToggle (~225 tok)
- `SearchBar.module.css` — Styles: 5 rules (~180 tok)
- `SearchBar.tsx` — SearchBar (~151 tok)

## src/ui/popup/hooks/

- `useFeatureSettings.ts` — Exports useFeatureSettings (~550 tok)
