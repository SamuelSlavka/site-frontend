import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateArticle } from '@app/wiki/store/models/article.model';
import { BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss'],
})
export class ArticleFormComponent implements OnInit {
  public onClose: Subject<CreateArticle> = new Subject();
  public title: string = '';
  public isPrivate: boolean = false;
  form!: FormGroup;

  constructor(public options: ModalOptions, private bsModalRef: BsModalRef, private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      title: [this.title, Validators.required],
      isPrivate: [this.isPrivate],
    });
  }

  save() {
    this.onClose.next(this.form.value);
    this.bsModalRef.hide();
  }

  cancel() {
    this.bsModalRef.hide();
  }
}
