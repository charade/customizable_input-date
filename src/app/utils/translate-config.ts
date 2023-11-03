import { HttpBackend, HttpClient } from '@angular/common/http';
import { InjectionToken } from '@angular/core';
import { TranslateLoader, TranslateModuleConfig } from '@ngx-translate/core';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';

export namespace TranslateConfig {
  export enum FilesPathsEnum {
    InputDate = './assets/i18n/input-date/',
  }

  export const TRANSLATE_FILES_LOADER = new InjectionToken<FilesPathsEnum[]>(
    'Translation files paths'
  );

  const multipleHttpLoaderFactory = (
    httpBackend: HttpBackend,
    filesPaths: FilesPathsEnum[]
  ): MultiTranslateHttpLoader => {
    return new MultiTranslateHttpLoader(
      httpBackend,
      filesPaths.map((path) => ({ prefix: path, suffix: '.json' }))
    );
  };

  export const customTranslateConfig: TranslateModuleConfig = {
    loader: {
      provide: TranslateLoader,
      useFactory: multipleHttpLoaderFactory,
      deps: [HttpBackend, TRANSLATE_FILES_LOADER],
    },
  };
}
