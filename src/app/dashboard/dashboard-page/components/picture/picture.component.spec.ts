import { NgxsModule } from '@ngxs/store';
import { MeasurementState } from 'src/app/core/store/state/measurements.state';
import { ScheduledState } from 'src/app/core/store/state/scheduled.state';
import { DashboardModule } from 'src/app/dashboard/dashboard.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureComponent } from './picture.component';

describe('PictureComponent', () => {
  let component: PictureComponent;
  let fixture: ComponentFixture<PictureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardModule, NgxsModule.forFeature([MeasurementState, ScheduledState])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
