import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

/** Renders a section revision's Markdown with the shared prose typography. */
@Component({
  selector: 'app-revision',
  template: '<markdown [data]="text"></markdown>',
  host: { class: 'prose d-block' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class RevisionComponent {
  @Input() text: string | undefined;
}
