import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
//import '../assets/i18n/en';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  lang: any;
  constructor(private translate: TranslateService) {
    if ('language' in localStorage) {
      this.lang = localStorage.getItem('language');
      this.translate.use(this.lang);
    } else {
      this.translate.use('en');
    }
  }
  title = 'Ang Project Manager';
}
