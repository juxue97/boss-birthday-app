import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'landing',
    loadComponent: () =>
      import('./pages/landing/landing.component').then((m) => m.AppLandingComponent),
  },
  {
    path: 'welcome',
    loadComponent: () =>
      import('./pages/welcome/welcome.component').then((m) => m.AppWelcomeComponent),
  },
  {
    path: 'video',
    loadComponent: () => import('./pages/video/video.component').then((m) => m.AppVideoComponent),
  },
  {
    path: '**',
    redirectTo: 'landing',
  },
];
