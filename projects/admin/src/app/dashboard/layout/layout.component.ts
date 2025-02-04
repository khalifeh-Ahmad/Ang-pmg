import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  lang: any = 'en';
  constructor(private translate: TranslateService) {
    this.lang = this.translate.currentLang;
  }

  ngOnInit(): void {}
  onLanguageChange(event: any): void {
    const selectedLang = event.target.value;
    localStorage.setItem('language', selectedLang);
    this.translate.use(selectedLang);
    //window.location.reload();
  }
}
