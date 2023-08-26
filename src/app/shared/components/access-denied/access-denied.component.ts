import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-access-denied',
  templateUrl: './access-denied.component.html',
  styleUrls: ['./access-denied.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccessDeniedComponent implements OnInit {
  message = 'message';

  constructor(private router: Router) {}

  ngOnInit(): void {}

  back() {
    this.router.navigate(['']);
  }
}
