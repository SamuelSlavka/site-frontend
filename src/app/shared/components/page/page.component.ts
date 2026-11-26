import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

/**
 * Standard page layout: optional back link, page header (title, subtitle, actions) and content.
 *
 * Project actions with the `pageActions` attribute and extra header content with `pageMeta`.
 */
@Component({
  selector: 'app-page',
  template: `
    <div class="container-app page" [class.narrow]="width === 'narrow'">
      @if (backLink) {
        <a class="back-link" [routerLink]="backLink">
          <fa-icon icon="arrow-left"></fa-icon>
          {{ backLabel ?? ('button.back' | translate) }}
        </a>
      }
      @if (title) {
        <header class="page-header">
          <div class="min-w-0">
            <h1 class="page-title">{{ title }}</h1>
            @if (subtitle) {
              <p class="page-subtitle">{{ subtitle }}</p>
            }
            <ng-content select="[pageMeta]"></ng-content>
          </div>
          <div class="page-actions">
            <ng-content select="[pageActions]"></ng-content>
          </div>
        </header>
      }
      <ng-content></ng-content>
    </div>
  `,
  styles: `
    @use 'variables' as *;

    :host {
      display: block;
    }

    .page {
      padding-top: 2rem;

      @media (min-width: 768px) {
        padding-top: 2.5rem;
      }
    }

    .back-link {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 1rem;
      font-size: 0.875rem;
      color: var(--app-text-muted);
      transition: color $duration-fast $ease-out;

      &:hover {
        color: var(--app-text);
      }
    }

    .page-header {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-end;
      justify-content: space-between;
      gap: 1rem;
      margin-bottom: 1.75rem;
    }

    .page-title {
      margin: 0;
      font-size: 1.75rem;
      font-weight: 650;
      letter-spacing: -0.02em;
      overflow-wrap: anywhere;
    }

    .page-subtitle {
      margin: 0.25rem 0 0;
      color: var(--app-text-muted);
    }

    .page-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;

      &:empty {
        display: none;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class PageComponent {
  @Input() title?: string | null;
  @Input() subtitle?: string | null;
  @Input() backLink?: string;
  @Input() backLabel?: string;
  @Input() width: 'wide' | 'narrow' = 'wide';
}
