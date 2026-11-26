<!-- Based on: https://github.com/github/awesome-copilot/blob/main/instructions/performance-optimization.instructions.md -->
---
applyTo: '**/*.{ts,html,scss}'
description: 'Angular 18 frontend development standards for this repository'
---

# Angular Development Guidelines

## Project conventions

- Use Angular 18 patterns already present in the repository: NgModules, standalone routing components, NGXS, and lazy-loaded feature modules.
- Match the existing structure under `src/app/`; keep feature code in its feature folder and shared reusable code under `src/app/shared/`.
- Inspect nearby components, modules, services, and tests before making changes. Preserve existing aliases such as `@app` and the project's public module boundaries.
- Use the existing `environment.ts`, `environment.development.ts`, and `environment.production.ts` file-replacement setup for configuration.
- Preserve Keycloak, route guards, ngx-translate, NGXS actions/states, and existing API interceptor patterns.

## Components and templates

- Prefer standalone components for new code only when it fits the existing module-based architecture; do not mix patterns arbitrarily.
- Keep components focused on presentation and orchestration. Put reusable behavior in services and state logic in NGXS stores/actions.
- Use `ChangeDetectionStrategy.OnPush` for presentational components where practical.
- Use Angular template control flow (`@if`, `@for`, `@switch`) for new markup in this Angular 18 application.
- Use typed inputs, outputs, and observable/select state contracts. Avoid `any` unless integrating an existing untyped third-party API.
- Keep large templates readable and avoid duplicating markup already implemented in shared components.
- Do not bypass Angular security mechanisms. Use Angular sanitization and avoid `bypassSecurityTrust*` APIs with untrusted content.

## TypeScript, RxJS, and state

- Follow strict TypeScript settings and handle nullable values explicitly.
- Unsubscribe from manual subscriptions when no framework-managed lifecycle cleanup exists. Prefer `async` pipe or existing lifecycle utilities such as `UntilDestroy`.
- Avoid nested subscriptions. Prefer `switchMap`, `mergeMap`, `forkJoin`, or NGXS patterns where they express intent clearly.
- Use typed NGXS actions and selectors. Dispatch actions for state changes instead of mutating store state directly.
- Handle HTTP and WebSocket failures through existing interceptors/services and provide user-visible errors where appropriate.

## Accessibility and UI

- Use semantic HTML, labels, keyboard-operable controls, visible focus, and accessible translated text.
- Preserve responsive Bootstrap classes and existing dark-theme styling conventions.
- Use the existing translation keys and `ngx-translate` pipe instead of hardcoding user-facing English.
- Do not remove existing loading, access-denied, or not-found behavior when changing routes or navigation.

## Validation

- Make only targeted edits; do not format unrelated files.
- Run `yarn lint:ts` and `yarn lint:html` when applicable.
- Run `yarn build:prod` and tests when the task affects behavior or public templates.
- Check for broken imports and stale routes after deleting or renaming components.
- Preserve backward behavior for existing URLs unless the task explicitly changes routing.
