import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./components/components.module').then((c) => c.ComponentsModule),
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
