# site frontend

An application for md document storage and visualization. Needs keycloak, server and db to run properly.

The app uses two environments. By default `environment.development.ts` is used. When running in production `environment.production.ts`.

## requirements

- Node.js >=22.22.3
- npm (lockfile-based installs with `package-lock.json`)

## modernization baseline

- Angular framework/tooling: 22.x
- TypeScript: 6.x
- Test runner path: Karma via `@angular/build:karma` (`npm run test:ci`)

## install

    $ npm ci

## run

    $ npm run start

## build

    $ npm run build

## test

    $ npm run test

## test (headless CI)

    $ npm run test:ci

## dependency policy

- Framework/tooling (Angular, CLI, build chain): major upgrades are allowed in controlled phases.
- App libraries: prefer patch/minor updates; only take majors when required for compatibility/security.

## architecture conventions

- Root app wiring is standalone-first (`bootstrapApplication`, `app.config.ts`, `app.routes.ts`).
- Components/directives/pipes should be standalone by default and declare their own `imports`.
- Environment/runtime helpers should use `@env/*` and `@utils/*` aliases.
- Feature boundaries should be enforced through route-level lazy `loadComponent` and explicit shared/core imports (no feature NgModules).

## ci / cd

The workflow in `.github/workflows/deploy.yml` runs on every push to `main`:

1. **ci** job — lints, runs headless tests, builds for production, and uploads the archive as an artifact.
2. **deploy** job — downloads the artifact, copies it to the server, unpacks it, and restarts the nginx container. Requires the `production` environment to be configured in GitHub repository settings.

### required secrets

| Secret | Description |
|--------|-------------|
| `HOST` | SSH hostname or IP address of the deployment server |
| `USERNAME` | SSH username on the deployment server |
| `KEY` | SSH private key with access to the deployment server (PEM format) |

## known compatibility notes

- `ngx-bootstrap` and `ngx-toastr` have been upgraded to their Angular 22-compatible releases (`ngx-bootstrap@22`, `ngx-sonner` as toastr replacement).

