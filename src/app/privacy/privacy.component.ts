import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-privacy',
    templateUrl: './privacy.component.html',
    styleUrls: ['./privacy.component.scss'],
    standalone: false
})
export class PrivacyComponent {
  private router = inject(Router);

  back() {
    this.router.navigate(['']);
  }
}
