import { Observable } from 'rxjs';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-placeholder',
    templateUrl: './placeholder.component.html',
    styleUrls: ['./placeholder.component.css'],
    standalone: false
})
export class PlaceholderComponent {
  @Input() loading!: Observable<boolean>;
  @Input() count = 4;
  @Input() height = 3.5;
}
