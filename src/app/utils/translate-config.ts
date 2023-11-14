import { HttpClient } from '@angular/common/http';
import { InjectionToken } from '@angular/core';
import { TranslateLoader, TranslateModuleConfig } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export namespace TranslateConfig {
  export enum FilesPathsEnum {
    InputDate = './assets/i18n/',
  }

  export const TRANSLATE_FILES_LOADER = new InjectionToken<FilesPathsEnum>(
    'Translation files paths'
  );

  const translateHttpLoaderFactory = (
    httpClient: HttpClient,
    path: FilesPathsEnum
  ): TranslateHttpLoader => {
    return new TranslateHttpLoader(httpClient, path, '.json');
  };

  export const customTranslateConfig: TranslateModuleConfig = {
    loader: {
      provide: TranslateLoader,
      useFactory: translateHttpLoaderFactory,
      deps: [HttpClient, TRANSLATE_FILES_LOADER],
    },
  };
}
