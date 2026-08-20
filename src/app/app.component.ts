import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSonnerToaster } from 'ngx-sonner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: true,
  imports: [RouterOutlet, NgxSonnerToaster],
})
export class AppComponent {
  constructor(translate: TranslateService) {
    translate.reloadLang('en');
    translate.addLangs(['en']);
    translate.setDefaultLang('en');
    translate.use('en');
  }
}
