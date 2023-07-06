import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-section-form',
  templateUrl: './section-form.component.html',
  styleUrls: ['./section-form.component.css'],
})
export class SectionFormComponent implements OnInit {
  form!: FormGroup;
  public onClose: Subject<string> = new Subject();
  constructor(private bsModalRef: BsModalRef, private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      text: [null, Validators.required],
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
