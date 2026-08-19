import { Component, Input, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateArticle, EditArticle } from '@app/wiki/store/models/article.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule, NgbTooltipModule, TranslateModule],
})
export class ArticleFormComponent implements OnInit, OnDestroy {
  isEdit: boolean = false;
  initData!: EditArticle;

  form!: FormGroup;

  subscription: Subscription = new Subscription();
  public onClose: Subject<CreateArticle> = new Subject();

  constructor(public options: ModalOptions, private bsModalRef: BsModalRef, private fb: FormBuilder) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.form = this.fb.group({
      title: [this.initData?.title, Validators.required],
      isPrivate: this.initData?.isPrivate ?? false,
      isPubliclyEditable: this.initData?.isPubliclyEditable ?? false,
    });

    this.subscription.add(
      this.form.get('isPrivate')?.valueChanges.subscribe((change) => {
        if (change) {
          this.form.patchValue({ isPubliclyEditable: false });
        }
      }),
    );

    this.subscription.add(
      this.form.get('isPubliclyEditable')?.valueChanges.subscribe((change) => {
        if (change) {
          this.form.patchValue({ isPrivate: false });
        }
      }),
    );
  }

  save() {
    this.onClose.next(this.form.value);
    this.bsModalRef.hide();
  }

  cancel() {
    this.bsModalRef.hide();
  }
}
