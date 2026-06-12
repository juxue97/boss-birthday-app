import { Routes } from '@angular/router';
import { idleDeactivateGuard, idleGuard } from './pages/guards/idle.guard';

export const routes: Routes = [
  {
    path: 'landing',
    loadComponent: () =>
      import('./pages/landing/landing.component').then((m) => m.AppLandingComponent),
  },
  {
    canActivate: [idleGuard],
    canDeactivate: [idleDeactivateGuard],
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
