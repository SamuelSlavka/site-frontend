import { ChangeDetectionStrategy, Component, Input, OnInit, inject } from '@angular/core';
import { ConfirmationModalComponent } from '@app/shared/components/confirmation-modal/confirmation-modal.component';
import { LoginPromptComponent } from '@app/shared/components/login-prompt/login-prompt.component';
import { ModalService } from '@app/shared/services/modal.service';
import { SessionService } from '@app/wiki/services/session.service';
import { SectionActions } from '@app/wiki/store/actions/section.actions';
import { RevisionDto } from '@app/wiki/store/models/revision.model';
import { SectionDto } from '@app/wiki/store/models/section.model';
import { SectionState } from '@app/wiki/store/state/section.state';
import { Store } from '@ngxs/store';
import { Observable, filter, map } from 'rxjs';

import { SectionFormComponent } from '../section-form/section-form.component';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class SectionComponent implements OnInit {
  private sessionService = inject(SessionService);
  private store = inject(Store);
  private modalService = inject(ModalService);

  isCollapsed = false;

  @Input() selected!: string;
  @Input() isPublic = false;

  selected$!: Observable<SectionDto | undefined>;
  isLoggedIn$ = this.sessionService.isLoggedIn$;
  showActions$ = this.sessionService.showActions$;

  ngOnInit(): void {
    this.selected$ = this.store
      .select(SectionState.selectSections)
      .pipe(map((sections) => sections?.[this.selected]));
  }

  add(selected: string, isLoggedIn: boolean | null) {
    if (!isLoggedIn) {
      this.modalService.open(LoginPromptComponent);
      return;
    }
    this.modalService.open(SectionFormComponent, { size: 'lg' }).onClose.subscribe((revision: RevisionDto) => {
      this.store.dispatch(new SectionActions.Create({ superSectionId: selected, revision }));
    });
  }

  edit(selected: string, title: string | undefined, text: string | undefined) {
    this.modalService
      .open(SectionFormComponent, {
        size: 'lg',
        initialState: { isEdit: true, initData: { title: title ?? '', text: text ?? '' } },
      })
      .onClose.subscribe((revision: RevisionDto) => {
        this.store.dispatch(new SectionActions.Edit({ superSectionId: selected, revision }));
      });
  }

  delete(selected: string, superSectionId: string | undefined) {
    this.modalService
      .open(ConfirmationModalComponent, {
        initialState: {
          title: 'label.section.deleteTitle',
          label: 'label.section.deleteText',
          confirmLabel: 'button.delete',
          danger: true,
        },
      })
      .onClose.pipe(filter((res) => res))
      .subscribe(() => {
        this.store.dispatch(new SectionActions.Delete({ id: selected, superSectionId: superSectionId ?? '' }));
      });
  }

  collapse() {
    this.isCollapsed = !this.isCollapsed;
  }
}
