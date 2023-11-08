import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { provideHttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideComponentStore } from '@ngrx/component-store';

import { environment } from './environments/environment';

import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app-routes';
import { TranslateConfig } from './app/utils/translate-config';
import { InputDateStore } from './app/components/input-date/services/input-date.store';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideComponentStore(InputDateStore),
    provideRouter(appRoutes, withComponentInputBinding()),
    importProvidersFrom([
      TranslateModule.forRoot(TranslateConfig.customTranslateConfig),
    ]),
    importProvidersFrom([BrowserAnimationsModule]),
    { provide: TranslateConfig.TRANSLATE_FILES_LOADER, useValue: [] },
  ],
});
