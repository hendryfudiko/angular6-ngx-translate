import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { merge } from 'lodash';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';

export class CustomLoader implements TranslateLoader {
  constructor(
    protected http: HttpClient,
    protected prefix: string = '/assets/i18n/',
    protected suffix: string = '.json'
  ) {
    this.http = http;
  }

  public getTranslation(lang: string): Observable<any> {
    if (environment.production) {
      return this.http.get(`${this.prefix}${lang}${this.suffix}`);
    }

    return forkJoin(
      this.http.get(`${this.prefix}shared/${lang}${this.suffix}`),
      this.http.get(`${this.prefix}${lang}${this.suffix}`)
    ).pipe(
      map(([sharedLang, internalLang]) => merge({}, sharedLang, internalLang))
    );
  }
}

export function createTranslateLoader(http: HttpClient) {
  return new CustomLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
