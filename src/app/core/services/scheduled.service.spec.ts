import { TestBed } from '@angular/core/testing';
import { ScheduledService } from './scheduled.service';

describe('ScheduledService', () => {
  let service: ScheduledService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScheduledService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
