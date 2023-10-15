import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DevicesService } from '@app/core/services/devices.service';
import { Device, SimpleDevice } from '@app/core/store/models/device.model';
import { ToastrService } from 'ngx-toastr';
import { Observable, take } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  form!: FormGroup;
  devices$!: Observable<SimpleDevice[]>;

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private fb: FormBuilder,
    private devicesService: DevicesService,
  ) {}

  ngOnInit() {
    this.fetchDevices();
    this.form = this.fb.group({
      name: [null, Validators.required],
      isMain: [false],
    });
  }

  createDevice() {
    this.devicesService.createDevice(this.form.value).subscribe({
      next: () => {
        this.toastr.success('device created');
        this.fetchDevices();
      },
      error: () => {
        this.toastr.error('creation failed');
      },
    });
  }

  deleteDevice(id: string | undefined) {
    this.devicesService.deleteDevice(id).subscribe({
      next: () => {
        this.toastr.success('device deleted');
        this.fetchDevices();
      },
      error: () => {
        this.toastr.error('delete failed');
      },
    });
  }

  fetchDevices() {
    this.devices$ = this.devicesService.getAllSmallDevices();
    this.devices$.pipe(take(1)).subscribe({
      error: (error) => {
        this.toastr.error('fetch failed');
        console.error(error);
      },
    });
  }

  back() {
    this.router.navigate(['']);
  }
}
