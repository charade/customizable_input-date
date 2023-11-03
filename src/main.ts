import { enableProdMode, importProvidersFrom } from '@angular/core';
import { environment } from './environments/environment';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { appRoutes } from './app/app-routes';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateConfig } from './app/utils/translate-config';
import { HttpBackend, provideHttpClient } from '@angular/common/http';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(appRoutes, withComponentInputBinding()),
    importProvidersFrom([
      TranslateModule.forRoot(TranslateConfig.customTranslateConfig),
    ]),
    { provide: TranslateConfig.TRANSLATE_FILES_LOADER, useValue: [] },
  ],
});
