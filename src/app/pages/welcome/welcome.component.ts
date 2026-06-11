import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnDestroy, Signal, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { ImageConfigs } from '../../models/common.model';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-welcome',
  imports: [CommonModule, MatButtonModule, MatCardModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
})
export class AppWelcomeComponent implements OnDestroy {
  imagePersonConfigs: Signal<ImageConfigs[]>;

  @ViewChild('restrictionContainer', { read: ElementRef })
  restrictionContainer!: ElementRef<HTMLElement>;

  @ViewChild('noButton', { read: ElementRef })
  noButton!: ElementRef<HTMLButtonElement>;

  showVideoPlaceholder: boolean = false;
  hasNoButtonMoved: boolean = false;
  isClosing: boolean = false;

  noButtonPosition = {
    x: 0,
    y: 0,
  };

  private idleTimer: ReturnType<typeof setTimeout> | null = null;
  private readonly idleTimeoutMs = 60_000;

  constructor(
    private router: Router,
    private commonService: CommonService,
  ) {
    this.imagePersonConfigs = this.commonService.imagePersonConfigs;
    this.resetIdleTimer();
  }

  ngOnDestroy(): void {
    if (this.idleTimer) {
      clearTimeout(this.idleTimer);
    }
  }

  get firstPersonImageSrc(): string {
    return this.imagePersonConfigs()[0]?.src ?? '';
  }

  onYesClick(): void {
    this.showVideoPlaceholder = true;

    this.isClosing = true;

    setTimeout(() => {
      this.router.navigate(['/video']);
    }, 850);
  }

  moveNoButton(): void {
    const container = this.restrictionContainer.nativeElement;
    const button = this.noButton.nativeElement;

    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    const buttonWidth = button.offsetWidth;
    const buttonHeight = button.offsetHeight;

    const padding = 16;

    const maxX = containerWidth - buttonWidth - padding;
    const maxY = containerHeight - buttonHeight - padding;

    this.hasNoButtonMoved = true;

    this.noButtonPosition = {
      x: this.getRandomNumber(padding, maxX),
      y: this.getRandomNumber(padding, maxY),
    };
  }

  private getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  @HostListener('window:mousemove')
  @HostListener('window:mousedown')
  @HostListener('window:keydown')
  @HostListener('window:touchstart')
  resetIdleTimer(): void {
    if (this.isClosing) return;

    if (this.idleTimer) {
      clearTimeout(this.idleTimer);
    }

    this.idleTimer = setTimeout(() => {
      this.router.navigate(['/landing']);
    }, this.idleTimeoutMs);
  }
}
