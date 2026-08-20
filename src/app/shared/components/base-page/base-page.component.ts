import { ChangeDetectionStrategy, Component, Input, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-base-page',
  templateUrl: './base-page.component.html',
  styleUrls: ['./base-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, NavComponent],
})
export class BasePageComponent {
  @Input() showContent: string | null = null;
  @Input() navTemplate: TemplateRef<NavComponent> | null = null;
  @Input() contentTemplate: TemplateRef<any> | null = null;
}
