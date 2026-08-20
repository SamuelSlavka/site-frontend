import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SessionService } from '@app/core/services/session.service';
import { MarkdownModule } from 'ngx-markdown';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-revision',
  templateUrl: './revision.component.html',
  styleUrls: ['./revision.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MarkdownModule],
})
export class RevisionComponent {
  @Input() text!: string | undefined;
  @Input() title!: string | undefined;

  isAdmin$: BehaviorSubject<boolean> = this.sessionService.isAdmin$;

  isCollapsed = false;

  constructor(private sessionService: SessionService) {}
}
