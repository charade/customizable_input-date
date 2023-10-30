import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

enum PathsEnum {
  Components = 'components',
}

export const appRoutes: Routes = [
  {
    path: PathsEnum.Components,
    loadComponent: () =>
      import('../components/input-date/input-date.component').then(
        (c) => c.InputDateComponent
      ),
  },
  { path: '**', redirectTo: PathsEnum.Components, pathMatch: 'full' },
];
