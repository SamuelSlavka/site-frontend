import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateArticle } from '@app/wiki/store/models/article.model';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss'],
})
export class ArticleFormComponent implements OnInit {
  public onClose: Subject<CreateArticle> = new Subject();
  form!: FormGroup;

  constructor(private bsModalRef: BsModalRef, private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      title: [null, Validators.required],
      isPrivate: [false],
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
