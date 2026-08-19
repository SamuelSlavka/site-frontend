import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: true,
})
export class PrivacyComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  back() {
    this.router.navigate(['']);
  }
}
