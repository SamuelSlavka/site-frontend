import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

/** Skeleton rows shown while `loading` emits true. */
@Component({
  selector: 'app-placeholder',
  template: `
    @if (loading | async) {
      <div class="d-grid gap-2" aria-busy="true">
        @for (row of rows; track $index) {
          <span class="skeleton" [style.height.rem]="height"></span>
        }
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class PlaceholderComponent {
  @Input() loading!: Observable<boolean>;
  @Input() count = 4;
  @Input() height = 3.5;

  get rows(): unknown[] {
    return Array.from({ length: this.count });
  }
}
