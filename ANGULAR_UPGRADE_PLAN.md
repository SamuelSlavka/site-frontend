# Angular 22 Upgrade Plan

Target: Angular **22.3.0** (latest). Branch: `angular22-upgrade`. Package manager: Yarn 1.22.22.

## Status (2026-11-26)

| Step | State |
|---|---|
| Angular 18 → 19 → 20 | Done (`9f78187`) |
| Angular 21 ecosystem libs (ng-bootstrap 20, ngxs 21, keycloak-angular 21, ngx-markdown 21, ngx-echarts 21, angular-fontawesome 4) | Done (`523ebba`) |
| Angular 21 core (21.2.26), CLI/build 21.2.31, TypeScript 5.9.3 | Done (Phase A) — dev + prod build pass |
| Phase B step 0: test/lint tooling, build warnings | Done |
| Phase B cleanup (deps) | Next |
| Angular 22 | Not started |

### Tooling (Phase B step 0)

- Unit tests: Karma/Jasmine/Jest replaced by the `@angular/build:unit-test` builder with Vitest + jsdom (no browser needed). Shared test providers live in `src/test-providers.ts`; it must not import app code (see comment there). All 39 spec files / 40 tests pass; none were removed.
- Lint: `angular-eslint` 21 flat config (`eslint.config.js`), run with `yarn lint`. `prefer-standalone` is off until the standalone migration; `no-namespace` is off for NGXS action files. The `inject()` migration was applied. `yarn lint:html` (htmlhint) is clean.
- Build warnings: SCSS moved from `@import` to `@use`; Bootstrap is now compiled once with the theme variables (it was imported four times, which left derived values such as `--bs-*-rgb`, focus rings and `.table-*` on Bootstrap's default palette). Unused ngx-bootstrap datepicker CSS removed. Dev and prod builds have no warnings.

### Known issues

- Resolved in Phase A: `ngx-bootstrap@21.0.0` had a broken `exports` map; moved to `~21.2.2`, which also removed `forRoot()` from `BsDropdownModule`, `ModalModule`, `TooltipModule`, `CollapseModule` (services are `providedIn: 'root'`). Angular 21 core/CLI migrations run: no changes needed. Optional `router-current-navigation` migration not applicable (no `getCurrentNavigation` usage).
- `ngx-toastr` latest (20.0.5) declares peer `@angular/core ^21` only — potential blocker for 22.
- `ngx-markdown@21` peers `zone.js ~0.15`; `ngx-markdown@22` peers `emoji-toolkit >=8` (currently 7).

### Unused dependencies (no imports in `src`)

- `@abacritt/angularx-social-login`
- `@ngneat/until-destroy`
- `zod`
- `fontawesome` (legacy v5 package; the app uses `@fortawesome/*`)
- `@types/marked` (marked ships its own types)
- `@auth0/angular-jwt` — only provided in `core.module.ts`; remove if `JwtHelperService` is never injected

## Phases

### A. Finish Angular 21

1. `ngx-bootstrap` `21.0.0` → `~21.2.2`.
2. Run skipped migrations: `npx ng update @angular/core@21 @angular/cli@21 --migrate-only --from=20`.
3. Verify the `lib` removal in `tsconfig.json` is intended.
4. Validate (see matrix), commit "Checkpoint Angular 21 migration".

### B. Cleanup on 21 (version-neutral changes)

0. ~~Restore the validation tooling~~ — done (see Tooling above).
1. Remove unused dependencies listed above, building after each.
2. Upgrade packages compatible with both 21 and 22:
   - `@ngx-translate/core` / `@ngx-translate/http-loader` → 18.1.0 (check `TranslateModule.forRoot` loader config)
   - `ngx-toastr` → 20.0.5
   - `prismjs` → ^1.30.0
   - `bootstrap` → 5.3.x stable (from `5.3.0-alpha3`)
3. Commit per package group.

### C. Angular 22 core

1. `npx ng update @angular/core@22 @angular/cli@22`.
2. TypeScript `~6.0.3` (not 7.x), `zone.js ~0.16.3`, `@angular/build`/`compiler-cli`/`localize` at 22.3.0.
3. Review migrations, validate, commit.

### D. Angular 22 libraries (one group per commit)

- `@ng-bootstrap/ng-bootstrap` 21.0.0, `ngx-bootstrap` 22.0.0
- `@ngxs/store` 22.0.0
- `keycloak-angular` 22.0.0 (keep `keycloak-js` 24; bump to 26 separately, coordinated with the Keycloak server)
- `@fortawesome/angular-fontawesome` 5.1.0 + `@fortawesome/*-svg-icons` / `fontawesome-svg-core` 7.x
- `ngx-echarts` 22.0.0 (stay on echarts 5; 6 is optional)
- `ngx-markdown` 22.1.1 + `emoji-toolkit` 11 + `marked` 17/18; re-check UMD paths in `angular.json` `scripts`
- `ngx-toastr`: if still no Angular 22 peer, accept the peer warning or replace with an ng-bootstrap toast

### E. Validate and merge

Run the validation matrix and manual checks, update this file, merge to `main`.

## Validation matrix

After every phase / package group:

- `yarn install --frozen-lockfile`
- `yarn lint` and `yarn lint:html`
- `yarn build` and `yarn build:prod`
- `yarn test`
- `git diff --check`

Manual checks:

- Keycloak login, logout, page refresh; auth/error/API-prefix interceptors
- Wiki: article list/page, modals, forms, Markdown + Prism highlighting, emoji, clipboard
- Dashboard charts, smart-home, admin, privacy, not-found routes
- Dropdowns, tooltips, collapse, toasts
- Production build via `Dockerfile`; mobile and desktop layouts

## Out of scope (after 22 is stable)

- Standalone conversion (`ng g @angular/core:standalone`) — 29 files still use `standalone: false`
- Control-flow / signal input migrations, zoneless change detection

## Rollback policy

- Commit after every passing phase and package group; keep work off `main` until Phase E.
- Revert `package.json` and `yarn.lock` together.
- Use `ng update` for Angular itself, never `yarn upgrade`.
