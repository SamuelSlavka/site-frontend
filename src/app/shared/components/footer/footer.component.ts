import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="app-footer">
      <div class="container-app footer-bar">
        <span class="text-faint">© {{ year }} Site</span>
        <nav class="footer-links" aria-label="Footer">
          <a routerLink="/privacy">{{ 'navigation.privacy' | translate }}</a>
          <a href="https://github.com/SamuelSlavka/" target="_blank" rel="noopener">
            <fa-icon [icon]="['fab', 'github']"></fa-icon>
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  `,
  styles: `
    .app-footer {
      margin-top: 4rem;
      border-top: 1px solid var(--app-border);
      font-size: 0.875rem;
    }

    .footer-bar {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 1rem;
      padding-block: 1.5rem;
    }

    .footer-links {
      display: flex;
      gap: 1.25rem;
      margin-left: auto;

      a {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        color: var(--app-text-muted);

        &:hover {
          color: var(--app-text);
        }
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class FooterComponent {
  readonly year = new Date().getFullYear();
}
