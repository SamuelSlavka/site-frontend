import { ChangeDetectionStrategy, Component, Input, OnInit, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationModalComponent } from '@app/shared/components/confirmation-modal/confirmation-modal.component';
import { LoginPromptComponent } from '@app/shared/components/login-prompt/login-prompt.component';
import { HasAccessDirective } from '@app/shared/directives/has-access.directive';
import { SessionService } from '@app/core/services/session.service';
import { SectionActions } from '@app/wiki/store/actions';
import { RevisionDto } from '@app/wiki/store/models';
import { SectionDto } from '@app/wiki/store/models';
import { SectionState } from '@app/wiki/store/state';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BehaviorSubject, filter, map, Observable } from 'rxjs';

import { RevisionComponent } from '../revision/revision.component';
import { SectionActionsComponent } from '../section-actions/section-actions.component';
import { SectionFormComponent } from '../section-form/section-form.component';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    CollapseModule,
    FontAwesomeModule,
    HasAccessDirective,
    RevisionComponent,
    SectionActionsComponent,
    forwardRef(() => SectionComponent),
  ],
})
export class SectionComponent implements OnInit {
  isCollapsed: boolean = false;
  bsModalRef?: BsModalRef;

  @Input() selected!: string;
  @Input() isPublic: boolean = false;
  @Select(SectionState.selectSections) sections$!: Observable<Record<string, SectionDto>>;

  selected$!: Observable<SectionDto | null>;
  isLoggedIn$: Observable<boolean> = this.sessionService.isLoggedIn$;
  showActions$: BehaviorSubject<boolean> = this.sessionService.showActions$;

  constructor(private sessionService: SessionService, private store: Store, private modalService: BsModalService) {}
  ngOnInit(): void {
    this.selected$ = this.sections$.pipe(map((sections) => sections[this.selected]));
  }

  add(selected: string, isLoggedIn: boolean | null) {
    if (isLoggedIn) {
      this.bsModalRef = this.modalService.show(SectionFormComponent, { class: 'modal-lg' });
      this.bsModalRef.content.onClose.subscribe((revision: RevisionDto) => {
        this.store.dispatch(new SectionActions.Create({ superSectionId: selected, revision }));
      });
    } else {
      this.bsModalRef = this.modalService.show(LoginPromptComponent);
    }
  }

  edit(selected: string, title: string | undefined, text: string | undefined) {
    this.bsModalRef = this.modalService.show(SectionFormComponent, {
      class: 'modal-lg',
      initialState: { isEdit: true, initData: { title: title ?? '', text: text ?? '' } },
    });

    this.bsModalRef.content.onClose.subscribe((revision: RevisionDto) => {
      this.store.dispatch(new SectionActions.Edit({ superSectionId: selected, revision }));
    });
  }

  delete(selected: string, superSectionId: string | undefined) {
    this.bsModalRef = this.modalService.show(ConfirmationModalComponent, {
      initialState: { label: 'Do you want to delete this section?' },
    });
    this.bsModalRef.content.onClose.pipe(filter((res: boolean) => res)).subscribe(() => {
      this.store.dispatch(new SectionActions.Delete({ id: selected, superSectionId: superSectionId ?? '' }));
    });
  }

  collapse() {
    this.isCollapsed = !this.isCollapsed;
  }
}
