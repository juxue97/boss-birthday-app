import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, NgZone, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class IdleService implements OnDestroy {
  private idleTimer: ReturnType<typeof setTimeout> | null = null;
  private isWatching = false;

  private timeoutMs = 60_000;
  private redirectTo = '/landing';

  private readonly events = ['mousemove', 'mousedown', 'keydown', 'touchstart'];

  private readonly resetIdleTimer = (): void => {
    if (!this.isWatching) return;

    if (this.idleTimer) {
      clearTimeout(this.idleTimer);
    }

    this.idleTimer = setTimeout(() => {
      this.stopWatching();
      this.zone.run(() => {
        this.router.navigate([this.redirectTo]);
      });
    }, this.timeoutMs);
  };

  constructor(
    private router: Router,
    private zone: NgZone,
    @Inject(DOCUMENT) private document: Document,
  ) {}

  startWatching(timeoutMs: number = 60_000, redirectTo: string = '/landing'): void {
    this.timeoutMs = timeoutMs;
    this.redirectTo = redirectTo;

    if (!this.isWatching) {
      this.isWatching = true;

      this.zone.runOutsideAngular(() => {
        this.events.forEach((eventName) => {
          this.document.addEventListener(eventName, this.resetIdleTimer);
        });
      });
    }

    this.resetIdleTimer();
  }

  stopWatching(): void {
    this.isWatching = false;

    if (this.idleTimer) {
      clearTimeout(this.idleTimer);
      this.idleTimer = null;
    }

    this.events.forEach((eventName) => {
      this.document.removeEventListener(eventName, this.resetIdleTimer);
    });
  }

  ngOnDestroy(): void {
    this.stopWatching();
  }
}
