import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  @Output() action = new EventEmitter();
  @Input() actionLabel: string | undefined;
  @Input() title: string | undefined;
  @Input() backUrl: string = '';

  constructor(private router: Router) {}

  ngOnInit() {}

  actionTrigger() {
    this.action.emit();
  }

  back() {
    this.router.navigate([this.backUrl]);
  }
}