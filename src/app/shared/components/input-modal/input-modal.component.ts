import { ChangeDetectionStrategy, Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-input-modal',
    templateUrl: './input-modal.component.html',
    styleUrls: ['./input-modal.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class InputModalComponent implements OnInit {
  private bsModalRef = inject(BsModalRef);
  private fb = inject(FormBuilder);

  public onClose = new Subject<string>();
  form!: FormGroup;
  @Input() label = '';

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
