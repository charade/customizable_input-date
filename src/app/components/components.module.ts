import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { appRoutes } from 'src/app/app-routes';
import { TranslateConfig } from 'src/app/utils/translate-config';

export enum ComponentsPathEnum {
  InputDate = 'input-date',
}
const componentsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./input-date/input-date.component').then(
        (c) => c.InputDateComponent
      ),
  },
  {
    path: '**',
    redirectTo: `${appRoutes}/ ${ComponentsPathEnum.InputDate}`,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(componentsRoutes),
    TranslateModule.forChild(TranslateConfig.customTranslateConfig),
  ],
  providers: [
    {
      provide: TranslateConfig.TRANSLATE_FILES_LOADER,
      useValue: [TranslateConfig.FilesPathsEnum.InputDate],
    },
  ],
})
export class ComponentsModule {}
