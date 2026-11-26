import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-access-denied',
  template: `
    <app-page width="narrow">
      <div class="empty-state py-5 my-md-5">
        <div class="empty-state-icon"><fa-icon icon="lock"></fa-icon></div>
        <h1 class="h2">{{ 'label.denied.title' | translate }}</h1>
        <p>{{ 'label.denied.text' | translate }}</p>
        <a routerLink="/dashboard" class="btn btn-primary mt-2">{{ 'button.getBack' | translate }}</a>
      </div>
    </app-page>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class AccessDeniedComponent {}
