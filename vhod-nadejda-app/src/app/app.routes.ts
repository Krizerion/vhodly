import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./residents/residents.component').then(
        (m) => m.ResidentsComponent
      ),
  },
];
