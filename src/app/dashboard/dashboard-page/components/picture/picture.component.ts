import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, Input, OnInit, inject } from '@angular/core';

/** Decorative photo tile; the image fades in once loaded. */
@Component({
  selector: 'app-picture',
  template: '',
  styleUrl: './picture.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class PictureComponent implements OnInit {
  private cdr = inject(ChangeDetectorRef);

  @Input() imgnum = 1;

  @HostBinding('attr.aria-hidden') readonly ariaHidden = 'true';
  @HostBinding('style.background-image') background = '';
  @HostBinding('class.loaded') loaded = false;

  ngOnInit(): void {
    const img = new Image();
    img.src = `assets/pics/img${this.imgnum}.jpeg`;
    img.onload = () => {
      this.background = `url(${img.src})`;
      this.loaded = true;
      this.cdr.markForCheck();
    };
  }
}
