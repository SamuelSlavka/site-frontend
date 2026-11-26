import { NgxsModule } from '@ngxs/store';
import { MeasurementState } from 'src/app/core/store/state/measurements.state';
import { ScheduledState } from 'src/app/core/store/state/scheduled.state';
import { DashboardModule } from 'src/app/dashboard/dashboard.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastComponent } from './forecast.component';

describe('ForecastComponent', () => {
  let component: ForecastComponent;
  let fixture: ComponentFixture<ForecastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardModule, NgxsModule.forFeature([MeasurementState, ScheduledState])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
