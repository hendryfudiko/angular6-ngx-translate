import { Component } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { LabelConstant } from 'projects/constant/label.constant';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  readonly constant = {
    label: LabelConstant
  };
  readonly languages = [
    { key: 'id', value: 'ID', selected: false },
    { key: 'en', value: 'EN', selected: true },
  ];
  selectedLang = this.languages[1].key;

  title = 'APP - 1';

  constructor(private translate: TranslateService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.translate.use('en');
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
  }
}
