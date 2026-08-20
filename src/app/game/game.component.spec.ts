import { GameComponent } from './game.component';
import { TestBed } from '@angular/core/testing';

describe('GamePageComponent', () => {
  it('should create', () => {
    TestBed.configureTestingModule({
      imports: [GameComponent],
      teardown: { destroyAfterEach: false },
    });
    const fixture = TestBed.createComponent(GameComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
