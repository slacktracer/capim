# capim

A personal finance app.

## Overview

capim is a Nuxt 3 single-page application (SSR disabled) that talks to the [denarii](https://github.com/slacktracer/denarii/blob/main/README.md) HTTP API. It provides screens for:

- Accounts and balances
- Operations (create, edit, delete, filter)
- Transfers between accounts
- Groups and Categories.
- Authentication (session cookies issued by denarii)

All data lives in denarii. capim holds no state of its own beyond the Pinia stores that back the UI.

## Architecture

Two top-level directories:

- **`main/`** — the Nuxt app. `pages/` for routes, `components/` for UI, `modules/` for feature-scoped Pinia stores, `core/` for the HTTP client and domain helpers, `composables/` for shared logic.
- **`main/tools/local-client-to-remote-server-proxy/`** — a small HTTPS reverse proxy used during development. It listens on `https://capim.local:2099` and forwards requests to `https://api.capim.club`, rewriting CORS headers so credentialed cookies work. This exists because denarii's session cookie is set with `secure: true` and `sameSite: "None"`, which requires the frontend to also run on HTTPS and on a domain the browser will accept cross-site cookies for.

## Tech stack

- [Nuxt 3](https://nuxt.com/) (Vue 3, Composition API only — Options API is disabled)
- [TypeScript](https://www.typescriptlang.org/)
- [Pinia](https://pinia.vuejs.org/) (via `@pinia/nuxt`) for state
- [ky](https://github.com/sindresorhus/ky) for HTTP
- [Bootstrap 5](https://getbootstrap.com/) + Bootstrap Icons for styling
- [date-fns](https://date-fns.org/) and [Ramda](https://ramdajs.com/) for utilities

## Prerequisites

- Node.js 18 (see `.node-version`)
- npm
- [mkcert](https://github.com/FiloSottile/mkcert) — for locally-trusted HTTPS certificates on `capim.local`

## Setup

1. Install dependencies from the root:

```sh
npm install
```

This fans out to `main/` and `tests/`.

2. Copy the example env file and set the API base URL:

```sh
cp main/.env.example main/.env
```

`NUXT_PUBLIC_BASE_URL` points the frontend at the API. Use `https://capim.local:2099` for the local-proxy-to-remote-server workflow, or `http://localhost:2099` when running denarii locally.

3. Add `capim.local` to your hosts file. The local domain is what makes session cookies work — browsers will not set `SameSite=None; Secure` cookies for arbitrary ports on `localhost`.

```
# /etc/hosts
127.0.0.1 capim.local
```

4. Generate local HTTPS certificates with mkcert and place them in the project root:

```sh
mkcert -install           # install the local CA (once per machine)
mkcert capim.local        # generates capim.local.pem and capim.local-key.pem
```

mkcert certificates expire. If Chrome shows `NET::ERR_CERT_DATE_INVALID`, delete the two `.pem` files and re-run `mkcert capim.local`.

## Local development

Two workflows, depending on whether you want to run denarii yourself.

### Frontend against the remote server

The common workflow. No local denarii needed — a local proxy forwards API calls to `api.capim.club`.

Set `NUXT_PUBLIC_BASE_URL=https://capim.local:2099` in `main/.env`, then:

```sh
npm run x
```

This starts two processes in parallel:

- The Nuxt HTTPS dev server on `https://capim.local:3000`
- The reverse proxy on `https://capim.local:2099` → `https://api.capim.club`

Open `https://capim.local:3000` in the browser.

### Frontend against a local denarii

When working on both sides at once. Run denarii locally (see the [denarii README](https://github.com/slacktracer/denarii/blob/main/README.md#backend-development-local-denarii-server)), set `NUXT_PUBLIC_BASE_URL=http://localhost:2099` in `main/.env`, then:

```sh
npm start
```

This runs the Nuxt dev server on plain HTTP without the proxy. Note: denarii's `secret` cookie is not set over HTTP, but session auth via `connect.sid` still works.

## Build

```sh
npm run build
```

Runs `npm ci` and then `nuxt generate`, producing static files in `main/output/public`.

## Deploy

```sh
npm run deploy
```

Bumps the prerelease version (e.g. `v1.0.0-build.27`), commits, and pushes the tag. The tag triggers CircleCI, which lints and — on matching tags — hits the Render deploy webhook. Render serves the static build from `main/output/public` (see `render.yaml`).

## CI

CircleCI config lives at `.circleci/config.yml`:

- `lint` runs on every branch and tag.
- `deploy` runs only on tags matching `/^v\d+\.\d+.\d+-build\.\d+$/` and requires `lint` to pass.

## Scripts reference

### Root

| Script | Purpose |
|--------|---------|
| `install` | Installs dependencies for both `main/` and `tests/` |
| `start` | Runs the Nuxt dev server (plain HTTP, no proxy) |
| `x` | Runs the HTTPS dev server and the local-to-remote proxy in parallel |
| `s` | Runs just the HTTPS dev server |
| `p` | Runs just the local-to-remote proxy |
| `build` | `npm ci` + `nuxt generate` (static site) |
| `lint` | Lints `main/` and `tests/` |
| `test` | Runs the test suite |
| `lf` | Live feedback — watches files and runs type-check + lint on change |
| `deploy` | Bumps the prerelease version and pushes a tag (triggers CI) |
| `postversion` | Pushes the version commit and tag after `deploy` |

### Main (`main/`)

| Script | Purpose |
|--------|---------|
| `dev` / `no-https` | Starts Nuxt dev server on plain HTTP |
| `https-dev` / `start-using-https` | Starts Nuxt dev server on `https://capim.local:3000` using the mkcert certs |
| `local-client-to-remote-server-proxy` | Starts the HTTPS proxy on `capim.local:2099` → `api.capim.club` |
| `x` | Runs `local-client-to-remote-server-proxy` and `https-dev` in parallel |
| `build` | `nuxt build` |
| `generate` | `nuxt generate` — static site generation |
| `preview` | Previews the built app |
| `check-types` | Type-checks with `tsc-files` and `nuxi typecheck` |
| `lint` | ESLint with auto-fix (`.js`, `.ts`, `.vue`) |
| `format` | Prettier across the project |
| `live-feedback` | Nodemon: re-runs `check-types` + `lint` on file changes |

# Rules

These are non-negotiable development MUSTs for this codebase.

Rule #1: You MUST NOT destructure stores directly. If you need to destructure, you MUST use `toRefs`.

Rule #2: If it does not hold reactive state, it MUST NOT be a store.
