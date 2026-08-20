import { Observable } from 'rxjs';
import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-placeholder',
  templateUrl: './placeholder.component.html',
  styleUrls: ['./placeholder.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: true,
  imports: [CommonModule],
})
export class PlaceholderComponent {
  @Input() loading!: Observable<boolean>;
  @Input() count: number = 4;
  @Input() height: number = 3.5;
}
