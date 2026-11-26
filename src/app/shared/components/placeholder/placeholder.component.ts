import { Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-placeholder',
    templateUrl: './placeholder.component.html',
    styleUrls: ['./placeholder.component.css'],
    standalone: false
})
export class PlaceholderComponent {
  @Input() loading!: Observable<boolean>;
  @Input() count: number = 4;
  @Input() height: number = 3.5;
}
