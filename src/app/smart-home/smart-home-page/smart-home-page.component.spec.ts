import { NgxsModule } from '@ngxs/store';
import { MeasurementState } from 'src/app/core/store/state/measurements.state';
import { ScheduledState } from 'src/app/core/store/state/scheduled.state';
import { SmartHomeModule } from 'src/app/smart-home/smart-home.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartHomePageComponent } from './smart-home-page.component';

describe('SmartHomePageComponent', () => {
  let component: SmartHomePageComponent;
  let fixture: ComponentFixture<SmartHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmartHomeModule, NgxsModule.forFeature([MeasurementState, ScheduledState])]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
