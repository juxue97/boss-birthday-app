import { inject } from '@angular/core';
import { CanActivateFn, CanDeactivateFn } from '@angular/router';
import { IdleService } from '../../services/idle.service';

export const idleGuard: CanActivateFn = (route) => {
  const idleService = inject(IdleService);

  const timeoutMs = route.data['idleTimeoutMs'] ?? 10_000;
  const redirectTo = route.data['idleRedirectTo'] ?? '/landing';

  idleService.startWatching(timeoutMs, redirectTo);

  return true;
};

export const idleDeactivateGuard: CanDeactivateFn<unknown> = () => {
  const idleService = inject(IdleService);

  idleService.stopWatching();

  return true;
};
