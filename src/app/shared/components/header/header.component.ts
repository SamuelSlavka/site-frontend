import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { SessionService } from '@app/wiki/services/session.service';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { filter } from 'rxjs';

interface NavLink {
  path: string;
  label: string;
  icon: IconProp;
  adminOnly: boolean;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class HeaderComponent {
  private keycloakService = inject(KeycloakService);
  private sessionService = inject(SessionService);
  private router = inject(Router);

  readonly links: NavLink[] = [
    { path: '/dashboard', label: 'navigation.dashboard', icon: 'gauge-high', adminOnly: false },
    { path: '/wiki', label: 'navigation.wiki', icon: 'book-open', adminOnly: false },
    { path: '/smart', label: 'navigation.smartHome', icon: 'house-signal', adminOnly: true },
    { path: '/admin', label: 'navigation.admin', icon: 'sliders', adminOnly: true },
  ];

  readonly menuOpen = signal(false);

  isAdmin$ = this.sessionService.isAdmin$;
  isLoggedIn$ = this.sessionService.isLoggedIn$;
  showActions$ = this.sessionService.showActions$;
  profile$ = this.sessionService.profile$;

  constructor() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(inject(DestroyRef)),
      )
      .subscribe(() => this.menuOpen.set(false));
  }

  toggleMenu() {
    this.menuOpen.update((open) => !open);
  }

  initials(profile: KeycloakProfile | undefined | null): string {
    const source = [profile?.firstName, profile?.lastName].filter(Boolean).join(' ') || profile?.email || '?';
    return source
      .split(/[\s@.]+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0].toUpperCase())
      .join('');
  }

  toggleShowActions() {
    this.sessionService.showActions$.next(!this.showActions$.getValue());
  }

  login() {
    this.keycloakService.login({ redirectUri: window.location.origin + this.router.routerState.snapshot.url });
  }

  logout() {
    const section = this.router.routerState.snapshot.url.split('/')[1];
    this.keycloakService.logout(window.location.origin + (section === 'wiki' ? '/wiki' : ''));
  }
}
