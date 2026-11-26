import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ConfirmationModalComponent {
  private activeModal = inject(NgbActiveModal);

  public onClose = new Subject<boolean>();
  title = 'label.confirm.title';
  label = 'label.confirm.text';
  confirmLabel = 'button.confirm';
  danger = false;

  confirm() {
    this.onClose.next(true);
    this.activeModal.close(true);
  }

  cancel() {
    this.activeModal.dismiss();
  }
}
