import { Component, Input, OnInit } from '@angular/core';
import { Revision } from '@app/wiki/store/models/revision.model';

@Component({
  selector: 'app-revision',
  templateUrl: './revision.component.html',
  styleUrls: ['./revision.component.css'],
})
export class RevisionComponent implements OnInit {
  @Input() revision!: Revision;
  constructor() {}

  ngOnInit() {}
}
