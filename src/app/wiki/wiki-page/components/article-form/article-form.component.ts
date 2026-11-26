import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { CreateArticle, EditArticle } from '@app/wiki/store/models/article.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';

type Visibility = 'public' | 'private' | 'open';

interface VisibilityOption {
  value: Visibility;
  icon: IconProp;
  label: string;
  hint: string;
}

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ArticleFormComponent implements OnInit {
  private activeModal = inject(NgbActiveModal);
  private fb = inject(FormBuilder);

  isEdit = false;
  initData?: EditArticle;
  public onClose = new Subject<CreateArticle>();

  readonly visibilityOptions: VisibilityOption[] = [
    { value: 'public', icon: 'book-open', label: 'label.article.visibility.public', hint: 'label.article.visibility.publicHint' },
    { value: 'private', icon: 'lock', label: 'label.article.visibility.private', hint: 'label.article.visibility.privateHint' },
    { value: 'open', icon: 'users', label: 'label.article.visibility.open', hint: 'label.article.visibility.openHint' },
  ];

  form = this.fb.nonNullable.group({
    title: ['', Validators.required],
    visibility: ['public' as Visibility],
  });

  ngOnInit() {
    const visibility: Visibility = this.initData?.isPrivate
      ? 'private'
      : this.initData?.isPubliclyEditable
        ? 'open'
        : 'public';
    this.form.setValue({ title: this.initData?.title ?? '', visibility });
  }

  save() {
    if (this.form.invalid) {
      return;
    }
    const { title, visibility } = this.form.getRawValue();
    this.onClose.next({
      title,
      isPrivate: visibility === 'private',
      isPubliclyEditable: visibility === 'open',
    });
    this.activeModal.close();
  }

  cancel() {
    this.activeModal.dismiss();
  }
}
