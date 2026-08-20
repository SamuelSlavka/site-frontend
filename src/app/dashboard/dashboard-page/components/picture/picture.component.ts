import { Component, HostBinding, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrl: './picture.component.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: true,
})
export class PictureComponent implements OnInit {
  ngOnInit(): void {
    const img = new Image();
    img.src = `assets/pics/img${this.imgnum}.jpeg`;
    img.onload = () => {
      this.background = `url(${img.src})`;
    };
  }
  @Input() imgnum: number = 1;

  @HostBinding('style.background-image')
  background: string = '';
}
