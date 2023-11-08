import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

enum AppPathsEnum {
  Components = 'components',
}

export const appRoutes: Routes = [
  {
    path: AppPathsEnum.Components,
    loadChildren: () =>
      import('./components/components.module').then((c) => c.ComponentsModule),
  },
  { path: '**', redirectTo: AppPathsEnum.Components, pathMatch: 'full' },
];
