import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrl: './picture.component.scss',
})
export class PictureComponent implements OnInit {
  ngOnInit(): void {
    this.background = 'url(../../../../../assets/pics/img' + this.imgnum + '.jpeg)';
  }
  @Input() imgnum: number = 1;

  @HostBinding('style.background-image')
  background: string = '';
}
