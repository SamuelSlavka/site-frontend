import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-input-modal',
  templateUrl: './input-modal.component.html',
  styleUrls: ['./input-modal.component.scss'],
})
export class InputModalComponent implements OnInit {
  public onClose: Subject<string> = new Subject();
  form!: FormGroup;
  @Input() label: string = '';

  constructor(private bsModalRef: BsModalRef, private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      input: [null, Validators.required],
    });
  }

  save() {
    this.onClose.next(this.form.value.input);
    this.bsModalRef.hide();
  }

  cancel() {
    this.bsModalRef.hide();
  }
}
