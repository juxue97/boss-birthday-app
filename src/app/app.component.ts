import { Component, HostListener, OnDestroy, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class App implements OnDestroy {
  protected readonly title = signal('boss-birthday-app');

  private idleTimer: ReturnType<typeof setTimeout> | null = null;
  private readonly idleTimeoutMs = 60_000;

  constructor(private router: Router) {
    this.resetIdleTimer();
  }

  ngOnDestroy(): void {
    if (this.idleTimer) {
      clearTimeout(this.idleTimer);
    }
  }

  @HostListener('window:mousemove')
  @HostListener('window:mousedown')
  @HostListener('window:keydown')
  @HostListener('window:touchstart')
  resetIdleTimer(): void {
    if (this.idleTimer) {
      clearTimeout(this.idleTimer);
    }

    this.idleTimer = setTimeout(() => {
      this.router.navigate(['/landing']);
    }, this.idleTimeoutMs);
  }
}
