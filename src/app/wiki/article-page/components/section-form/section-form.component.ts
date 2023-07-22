import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RevisionCreate } from '@app/wiki/store/models/revision.model';
import { BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-section-form',
  templateUrl: './section-form.component.html',
  styleUrls: ['./section-form.component.scss'],
})
export class SectionFormComponent implements OnInit {
  isEdit: boolean = false;
  initData!: RevisionCreate;
  form!: FormGroup;
  public onClose: Subject<string> = new Subject();
  constructor(public options: ModalOptions, private bsModalRef: BsModalRef, private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      title: [this.initData?.title, Validators.required],
      text: [this.initData?.text, Validators.required],
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
