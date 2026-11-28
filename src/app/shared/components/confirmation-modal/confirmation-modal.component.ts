import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-confirmation-modal',
    templateUrl: './confirmation-modal.component.html',
    styleUrls: ['./confirmation-modal.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ConfirmationModalComponent {
  private bsModalRef = inject(BsModalRef);

  public onClose = new Subject<boolean>();
  label = 'Are you sure?';

  confirm() {
    this.onClose.next(true);
    this.bsModalRef.hide();
  }
  cancel() {
    this.bsModalRef.hide();
  }
}
