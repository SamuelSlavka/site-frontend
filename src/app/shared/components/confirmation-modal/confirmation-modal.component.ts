import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css'],
})
export class ConfirmationModalComponent {
  public onClose: Subject<boolean> = new Subject();
  @Input() label: string = 'Are you sure?';

  constructor(private bsModalRef: BsModalRef) {}

  confirm() {
    this.onClose.next(true);
    this.bsModalRef.hide();
  }
  cancel() {
    this.bsModalRef.hide();
  }
}
