# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What is capim

A personal finance SPA (Nuxt 4, SSR disabled) that talks to the [denarii](https://github.com/slacktracer/denarii) HTTP API. All data lives in denarii; capim holds no persistent state beyond Pinia stores backing the UI.

## Commands

All commands run from the repo root unless noted.

| Task | Command |
|------|---------|
| Install deps | `npm install` (fans out to `main/` and `tests/`) |
| Dev server (HTTP) | `npm start` |
| Dev server (HTTPS + remote proxy) | `npm run x` |
| Build (static site) | `npm run build` |
| Lint (main + tests) | `npm run lint` |
| Format | `npm run format --prefix main` |
| Type-check | `npm run check-types --prefix main` |
| Live feedback (watch types + lint) | `npm run lf` |
| Run tests | `npm test` |
| Deploy (bump version, push tag) | `npm run deploy` |

Tests use Vitest with `happy-dom`. Test files live under `tests/__tests__/`.

## Architecture

```
main/
  core/         # HTTP client (ky), domain helpers, TrackedPromise, types
  modules/      # Feature-scoped Pinia stores (accounts, operations, etc.)
  composables/  # Shared composition functions
  components/   # Vue components
  pages/        # File-based routing
  types/        # App-level TypeScript types
```

### Core module

Everything in `core/` is accessed through `core/core.js` — direct imports from `core/*` subpaths are forbidden by an ESLint rule. Import like:

```ts
import { core } from "../../core/core.js";
```

Core provides: HTTP methods (`get`, `post`, `patch`, `delete` via ky), domain fetchers (`getOperations`, `getAccounts`, etc.), `makeTrackedPromise`, `makeUUID`, `makeEventBus`, `promiseState`/`promiseAction` symbols, and utility functions.

### State management

Pinia stores use the Composition API (`defineStore("name", () => { ... })`). Options API is disabled project-wide.

**Store pattern:** Stores hold reactive state, expose it via `toRefs(readonly(state))`, and subscribe to `core.mainEventBus.on("reset-all", $reset)` for logout cleanup.

**TrackedPromise:** Async operations use `makeTrackedPromise()` which tracks `state` (blank/pending/fulfilled/rejected), `value`, `reason`, and boolean helpers (`isPending`, `isFulfilled`, etc.). Stores use `loadDataIntoState()` to wire API calls into `AsyncDataState` shape.

**`useEditableResource` composable:** Watches a TrackedPromise, and when it fulfills, runs a transform function (e.g., `makeEditableOperation`) to produce editable reactive data for forms.

### Nuxt configuration

- SSR disabled, auto-imports disabled (all imports are explicit), component auto-discovery disabled
- `exactOptionalPropertyTypes: true` in tsconfig
- Vue Options API disabled (`__VUE_OPTIONS_API__: false`)
- Modules: `@nuxt/eslint`, `@pinia/nuxt`

## Rules

1. **MUST NOT destructure stores directly.** Use `toRefs` if destructuring is needed.
2. **If it does not hold reactive state, it MUST NOT be a store.**
3. **All imports from `core/` must go through `core/core.js`** — never import from `core/utils/...` or `core/http/...` directly (enforced by ESLint).
4. **Use `type` imports** for type-only imports (`@typescript-eslint/consistent-type-imports`).
5. **Use package.json scripts** for linting, formatting, and type-checking — do not invoke tools directly.
6. **No type assertions** — avoid `as` casts.
7. **CSS properties must be in alphabetical order.**
8. **Object properties must be in alphabetical order.**
9. **CSS class names must match the component name** — do not shorten or abbreviate. When the root element is a wrapper `div`, use the component name directly (e.g., `AddOperationToDate.vue` → `.add-operation-to-date`). When the root element is a specific tag (e.g., `button`, `section`), append the tag name (e.g., `.add-operation-to-date-button`).
10. **Framework-agnostic logic belongs in `core/`** — `core/` must not depend on Nuxt, Vue, or any framework. It assumes only a browser environment. Domain helpers, storage, options, and any logic that doesn't need reactivity or the component lifecycle goes in `core/`.
