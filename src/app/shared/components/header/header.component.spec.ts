import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SessionService } from '@app/wiki/services/session.service';
import { SharedModule } from 'src/app/shared/shared.module';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let fixture: ComponentFixture<HeaderComponent>;
  let component: HeaderComponent;
  let session: SessionService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [SharedModule] }).compileComponents();
    session = TestBed.inject(SessionService);
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  const linkTexts = () =>
    Array.from((fixture.nativeElement as HTMLElement).querySelectorAll('.nav-links a')).map((a) => a.getAttribute('href'));

  it('shows admin-only links only to admins', () => {
    session.isAdmin$.next(false);
    fixture.detectChanges();
    expect(linkTexts()).toEqual(['/dashboard', '/wiki']);

    session.isAdmin$.next(true);
    fixture.detectChanges();
    expect(linkTexts()).toEqual(['/dashboard', '/wiki', '/smart', '/admin']);
  });

  it('shows a login button when logged out', () => {
    session.isLoggedIn$.next(false);
    fixture.detectChanges();
    expect((fixture.nativeElement as HTMLElement).querySelector('.avatar')).toBeNull();
  });

  it('builds initials from the name, falling back to the email', () => {
    expect(component.initials({ firstName: 'Jane', lastName: 'Doe' })).toBe('JD');
    expect(component.initials({ email: 'sam.smith@example.com' })).toBe('SS');
    expect(component.initials(undefined)).toBe('?');
  });

  it('toggles the mobile menu', () => {
    expect(component.menuOpen()).toBe(false);
    component.toggleMenu();
    expect(component.menuOpen()).toBe(true);
  });
});
