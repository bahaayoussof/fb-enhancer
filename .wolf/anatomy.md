# anatomy.md

> Auto-maintained by OpenWolf. Last scanned: 2026-07-08T07:25:23.611Z
> Files: 23 tracked | Anatomy hits: 0 | Misses: 0

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

- `background.ts` (~136 tok)

## src/content/

- `content.ts` (~94 tok)

## src/core/logger/

- `logger.ts` — Exports logger (~187 tok)
- `types.ts` — Exports ILogger (~67 tok)

## src/core/messaging/

- `messaging-service.ts` — Exports messagingService (~328 tok)
- `types.ts` — Exports ToggleFeaturePayload, SettingsUpdatedPayload, ExtensionMessage (~119 tok)

## src/options/

- `index.html` — FB Enhancer — Settings (~83 tok)
- `options.tsx` — Options (~121 tok)

## src/popup/

- `index.html` — FB Enhancer (~98 tok)
- `popup.tsx` — Popup (~216 tok)

## src/shared/types/

- `index.ts` — Exports FeatureId, FeatureSettings (~59 tok)
