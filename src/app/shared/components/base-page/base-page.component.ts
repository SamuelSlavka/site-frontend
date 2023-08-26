import { ChangeDetectionStrategy, Component, Input, TemplateRef } from '@angular/core';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-base-page',
  templateUrl: './base-page.component.html',
  styleUrls: ['./base-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasePageComponent {
  @Input() showContent: string | null = null;
  @Input() navTemplate: TemplateRef<NavComponent> | null = null;
  @Input() contentTemplate: TemplateRef<any> | null = null;
}
