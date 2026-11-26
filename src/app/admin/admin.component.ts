import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DevicesService } from '@app/core/services/devices.service';
import { SimpleDevice } from '@app/core/store/models/device.model';
import { ConfirmationModalComponent } from '@app/shared/components/confirmation-modal/confirmation-modal.component';
import { ModalService } from '@app/shared/services/modal.service';
import { ToastrService } from 'ngx-toastr';
import { Observable, filter, take } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class AdminComponent implements OnInit {
  private toastr = inject(ToastrService);
  private fb = inject(FormBuilder);
  private devicesService = inject(DevicesService);
  private modalService = inject(ModalService);

  form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    isMain: [false],
  });
  devices$!: Observable<SimpleDevice[]>;

  ngOnInit() {
    this.fetchDevices();
  }

  createDevice() {
    if (this.form.invalid) {
      return;
    }
    this.devicesService.createDevice(this.form.getRawValue()).subscribe({
      next: () => {
        this.toastr.success('Device created');
        this.form.reset();
        this.fetchDevices();
      },
      error: () => this.toastr.error('Creating the device failed'),
    });
  }

  deleteDevice(device: SimpleDevice) {
    this.modalService
      .open(ConfirmationModalComponent, {
        initialState: {
          title: 'label.admin.deleteTitle',
          label: 'label.admin.deleteText',
          confirmLabel: 'button.delete',
          danger: true,
        },
      })
      .onClose.pipe(filter((confirmed) => confirmed))
      .subscribe(() => {
        this.devicesService.deleteDevice(device.id).subscribe({
          next: () => {
            this.toastr.success('Device deleted');
            this.fetchDevices();
          },
          error: () => this.toastr.error('Deleting the device failed'),
        });
      });
  }

  fetchDevices() {
    this.devices$ = this.devicesService.getAllSmallDevices();
    this.devices$.pipe(take(1)).subscribe({
      error: (error) => {
        this.toastr.error('Loading devices failed');
        console.error(error);
      },
    });
  }
}
