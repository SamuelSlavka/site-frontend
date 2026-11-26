# Angular 22 Upgrade Plan

## Goals

- Upgrade Angular 18.2.9 to the latest supported Angular major, Angular 22.3.0.
- Upgrade Angular ecosystem dependencies and application code in one-major-version steps.
- Keep NGXS, Keycloak, routing, translations, Bootstrap, charts, Markdown, and test behavior working.
- Do not upgrade unrelated server applications or the backend repository.

## Baseline

- Angular packages: 18.2.9
- Angular CLI/build tooling: 18.2.10
- Angular compiler CLI: 18.2.9
- TypeScript: 5.4.5
- RxJS: 7.8.0
- Zone.js: 0.14.10
- Package manager: Yarn 1.22.22
- Current Node: 22.18.0
- Angular 22 requirements: Node `^22.22.3 || ^24.15.0 || >=26.0.0`, TypeScript `>=6.0 <6.1`, and Zone.js `~0.15.0 || ~0.16.0`.

Angular major upgrades must be performed one major at a time. Planned sequence:

1. Angular 18 to Angular 19
2. Angular 19 to Angular 20
3. Angular 20 to Angular 21
4. Angular 21 to Angular 22

## Package upgrade targets

### Angular core

For each major step, use `ng update` to align all Angular packages and the CLI rather than editing versions manually:

- `@angular/core`
- `@angular/cli`
- `@angular/animations`
- `@angular/common`
- `@angular/compiler`
- `@angular/compiler-cli`
- `@angular/forms`
- `@angular/localize`
- `@angular/platform-browser`
- `@angular/platform-browser-dynamic`
- `@angular/router`
- `@angular-devkit/build-angular`

Final Angular target: 22.3.0.

### Required runtime upgrades

- Node.js: upgrade to Node 24.15.0 or newer compatible LTS before Angular 22.
- TypeScript: use a version satisfying Angular 22.3.0, currently `>=6.0 <6.1` (not TypeScript 7).
- Zone.js: 0.16.3 for Angular 22.
- RxJS: 7.8.2.
- tslib: 2.9.1.

### Angular ecosystem packages

Upgrade these alongside Angular rather than merging in unrelated dependency replacements:

- `@ng-bootstrap/ng-bootstrap`: 21.0.0
- `ngx-bootstrap`: 22.0.0
- `ngx-echarts`: 22.0.0
- `ngx-markdown`: 22.1.1
- `ngx-toastr`: 20.0.5
- `@ngx-translate/core`: 18.1.0
- `@ngx-translate/http-loader`: 18.1.0
- `@ngxs/store`: 22.0.0
- `keycloak-angular`: 22.0.0
- `keycloak-js`: 26.2.5
- `@fortawesome/angular-fontawesome`: 5.1.0
- `@fortawesome/fontawesome-svg-core`: 7.3.1
- `@fortawesome/free-brands-svg-icons`: 7.3.1
- `@fortawesome/free-regular-svg-icons`: 7.3.1
- `@fortawesome/free-solid-svg-icons`: 7.3.1
- `echarts`: 6.1.0
- `marked`: 18.3.0
- `bootstrap`: 5.3.9
- `@popperjs/core`: latest compatible version
- `@ngneat/until-destroy`: 10.0.0
- `@auth0/angular-jwt`: retain only if still used; check and remove it if unused
- `@abacritt/angularx-social-login`: 2.6.0 if it remains required
- `emoji-toolkit`: 11.x, but only after confirming it satisfies `ngx-markdown` peer ranges
- `zod`: evaluate 4.6.7 separately because changing this major can affect runtime validation APIs

### Markdown-specific peer packages

For `ngx-markdown` 22.1.1, verify and add compatible peer dependencies instead of assuming them from a generic `yarn upgrade`:

- `marked`: 17 or 18
- `prismjs`: 1.30.0
- `clipboard`: compatible 2.x
- `emoji-toolkit`: 8 through 11
- `katex`: 0.16 through 0.18 only if KaTeX features are used
- `mermaid`: 10.6 through 11 only if Mermaid features are used
- `marked-katex-extension`: 5.x only if KaTeX is used

Do not add unused Markdown peer packages solely to satisfy optional functionality.

### Testing and tooling

- `@types/jasmine`: 7.0.0
- `jasmine-core`: 7.0.2
- `karma`: 6.4.4
- `karma-chrome-launcher`: 3.2.0
- `karma-coverage`: 2.2.1
- `karma-jasmine`: latest compatible with the Angular test setup
- `karma-jasmine-html-reporter`: 2.3.0
- `htmlhint`: 1.9.2
- `stylelint`: 18.1.0
- `stylelint-config-standard`: 41.1.0
- `prismjs`: 1.30.0
- `@types/marked`: remove if no longer required or replace with package-owned types

## Pre-upgrade preparation

1. Commit or stash all current changes and confirm both repositories have clean working trees.
2. Record the baseline:
   - `yarn build:prod`
   - `yarn test --watch=false --browsers=ChromeHeadless`
   - `yarn lint:ts`
   - `yarn lint:html`
3. Archive the baseline package/dependency results:
   - `node --version`
   - `yarn outdated`
   - `yarn list --depth=0`
4. Review every direct package import and remove packages with no source usage.
5. Search for deprecated Angular APIs, including deprecated router APIs, `NgModule` behavior that may fail strict migrations, and `BrowserAnimationsModule` usage.
6. Upgrade Node first, then create a dedicated git branch such as `upgrade/angular-22`.

## Upgrade execution

### Phase 1: Repair and baseline

- Upgrade to Node 24.15.0 or the newest compatible 24.x release.
- Reinstall dependencies from `yarn.lock`.
- Resolve the existing Babel/traverse build incompatibility if it remains after Yarn and Node reinstall.
- Confirm no source or lockfile package is left from the removed game module.
- Establish a passing baseline build or record exact unrelated failures before framework edits.

### Phase 2: Angular 19

- Run `npx ng update @angular/core@19 @angular/cli@19`.
- Run framework migration schematics.
- Address router, test, TypeScript, and dependency migrations reported by `ng update`.
- Commit the Angular 19 checkpoint before continuing.

### Phase 3: Angular 20

- Run `npx ng update @angular/core@20 @angular/cli@20`.
- Apply build-system migration if the CLI proposes it.
- Review zoneless and control-flow migrations. Do not force architectural rewrites in this phase.
- Upgrade Angular-compatible third-party packages when peer warnings require it.
- Commit the Angular 20 checkpoint.

### Phase 4: Angular 21

- Run `npx ng update @angular/core@21 @angular/cli@21`.
- Run migration schematics and resolve package-peer incompatibilities.
- Commit the Angular 21 checkpoint.

### Phase 5: Angular 22

- Run `npx ng update @angular/core@22 @angular/cli@22`.
- Align compiler CLI, build package, localization, animation, common, forms, platform, and router packages exactly at 22.3.0.
- Upgrade TypeScript to the 6.0 compatible range.
- Upgrade Zone.js and RxJS to compatible versions.
- Run migrations, review diffs, and update package-specific APIs.
- Commit the Angular 22 checkpoint.

### Phase 6: Third-party packages

After Angular core is stable, upgrade Angular-bound libraries to their Angular 22-compatible versions:

- ng-bootstrap and ngx-bootstrap
- NGXS
- Keycloak Angular and Keycloak JS
- translate packages
- Font Awesome Angular
- ngx-echarts and ECharts
- ngx-markdown and Markdown peer dependencies
- ngx-toastr
- Angular social login

Resolve each package independently and commit package groups as separate commits where practical.

## Code migration review

- Prefer existing NgModule architecture unless Angular-specific migrations or maintainability work explicitly justify standalone conversion.
- Preserve lazy-loaded feature modules and route guards.
- Replace deprecated APIs and test providers reported by Angular migrations.
- Review `RouterTestingModule`, `BrowserAnimationsModule`, `HttpClientModule`, and legacy dependency-injection setup for Angular 22 alternatives.
- Review strict template errors and signal/input migrations only after build stability is reached.
- Modernize `APP_INITIALIZER` if appropriate, but preserve current Keycloak startup behavior unless an Angular-supported replacement is adopted deliberately.
- Update Bootstrap 5 and ngx-bootstrap markup only where breaking changes are present; do not run a broad visual rewrite.
- Update NGXS state registration and action APIs only to versions whose peer ranges match Angular 22.
- Review interceptors and bearer-token behavior after Keycloak upgrades.
- Add or improve tests for Keycloak initialization, route guards, HTTP interceptors, state dispatch, and existing feature CRUD flows.

## Validation matrix

Run after each major upgrade and after every third-party package group:

- `yarn install --frozen-lockfile`
- `yarn lint:ts`
- `yarn lint:html`
- `yarn build`
- `yarn build:prod`
- `yarn test --watch=false --browsers=ChromeHeadless`
- `yarn outdated`
- `git diff --stat`
- `git diff --check`

Manual checks:

- Login, logout, and page refresh with Keycloak.
- Dashboard, wiki, smart-home, admin, privacy, and not-found routes.
- NGXS data loading and error states.
- Modals, dropdowns, tooltips, datepickers, charts, Markdown rendering, and toast notifications.
- API prefix, authentication, and error interceptors.
- Development and production environment file replacement.
- Mobile and desktop layouts.

## Rollback policy

- Commit after every passing major upgrade and package group.
- Keep the upgrade branch separate from `main`.
- Roll back only the failing package group before broadening a migration.
- Do not use `yarn upgrade` or full dependency rewrites as the primary Angular migration command.
- Revert `yarn.lock` together with `package.json` if dependency resolution becomes inconsistent.

## Acceptance criteria

- Angular and Angular CLI packages are aligned at 22.3.0.
- Node, TypeScript, Zone.js, RxJS, and test tooling satisfy Angular 22 peer requirements.
- `yarn build:prod` succeeds with no framework migration pending.
- TypeScript and HTML lint pass or any remaining warnings are documented and intentionally scoped.
- Automated tests pass or gaps are recorded with a follow-up plan.
- No unsupported third-party peer dependency warnings remain.
- The application works in development and production configurations.
