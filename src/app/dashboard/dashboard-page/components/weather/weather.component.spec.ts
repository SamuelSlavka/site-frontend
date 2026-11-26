import { NgxsModule } from '@ngxs/store';
import { MeasurementState } from 'src/app/core/store/state/measurements.state';
import { ScheduledState } from 'src/app/core/store/state/scheduled.state';
import { DashboardModule } from 'src/app/dashboard/dashboard.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherComponent } from './weather.component';

describe('WeatherComponent', () => {
  let component: WeatherComponent;
  let fixture: ComponentFixture<WeatherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardModule, NgxsModule.forFeature([MeasurementState, ScheduledState])],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
