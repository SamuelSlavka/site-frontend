import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-section-form',
  templateUrl: './section-form.component.html',
  styleUrls: ['./section-form.component.css'],
})
export class SectionFormComponent implements OnInit {
  isEdit: boolean = false;
  initText: string = '';
  form!: FormGroup;
  public onClose: Subject<string> = new Subject();
  constructor(public options: ModalOptions, private bsModalRef: BsModalRef, private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      text: [this.initText, Validators.required],
    });
  }

  save() {
    this.onClose.next(this.form.value.text);
    this.bsModalRef.hide();
  }

  cancel() {
    this.bsModalRef.hide();
  }
}
