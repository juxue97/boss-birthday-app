import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  Signal,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { ImageConfigs } from '../../models/common.model';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-landing',
  imports: [CommonModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class AppLandingComponent implements AfterViewInit, OnDestroy {
  imageLogoConfigs: Signal<ImageConfigs[]>;
  currentImageIndex = 0;

  x = 100;
  y = 100;
  velocityX = 2.25;
  velocityY = 2.25;
  isEnterFadeDone = false;
  isExitFading = false;

  private animationFrameId: number | null = null;
  private waveAnimationFrameId: number | null = null;
  private canvasContext!: CanvasRenderingContext2D;
  private mouseX = 0;
  private mouseY = 0;
  private ripples: {
    x: number;
    y: number;
    radius: number;
    opacity: number;
    speed: number;
    lineWidth: number;
  }[] = [];
  private mouseGlowOpacity = 0;

  @ViewChild('dvdContainer') dvdContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('dvdImage') dvdImage!: ElementRef<HTMLImageElement>;
  @ViewChild('waveCanvas') waveCanvas!: ElementRef<HTMLCanvasElement>;

  constructor(
    private router: Router,
    private commonService: CommonService,
    private cdr: ChangeDetectorRef,
  ) {
    this.imageLogoConfigs = this.commonService.imageLogoConfigs;
  }

  ngAfterViewInit(): void {
    requestAnimationFrame(() => {
      this.setupCanvas();

      this.setStartPositionToCenter();
      this.startAnimation();
      this.startWaveAnimation();

      this.isEnterFadeDone = true;
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }

    if (this.waveAnimationFrameId !== null) {
      cancelAnimationFrame(this.waveAnimationFrameId);
    }
  }

  get currentImage(): ImageConfigs | null {
    return this.imageLogoConfigs()[this.currentImageIndex] ?? null;
  }

  private startAnimation(): void {
    const animate = () => {
      const container = this.dvdContainer.nativeElement;
      const image = this.dvdImage.nativeElement;

      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;

      const imageWidth = image.offsetWidth;
      const imageHeight = image.offsetHeight;

      this.x += this.velocityX;
      this.y += this.velocityY;

      let hasCollided = false;

      if (this.x <= 0 || this.x + imageWidth >= containerWidth) {
        this.velocityX *= -1;
        this.x = Math.max(0, Math.min(this.x, containerWidth - imageWidth));
        hasCollided = true;
      }

      if (this.y <= 0 || this.y + imageHeight >= containerHeight) {
        this.velocityY *= -1;
        this.y = Math.max(0, Math.min(this.y, containerHeight - imageHeight));
        hasCollided = true;
      }

      if (hasCollided) {
        this.changeImage();

        image.src = this.currentImage?.src ?? '';
        image.alt = this.currentImage?.description ?? '';
      }

      // Important: actually move the image
      image.style.transform = `translate(${this.x}px, ${this.y}px)`;

      this.animationFrameId = requestAnimationFrame(animate);
    };

    this.animationFrameId = requestAnimationFrame(animate);
  }

  private changeImage(): void {
    const totalImages = this.imageLogoConfigs().length;

    if (totalImages === 0) return;

    this.currentImageIndex = (this.currentImageIndex + 1) % totalImages;
  }

  private setStartPositionToCenter(): void {
    const container = this.dvdContainer.nativeElement;
    const image = this.dvdImage.nativeElement;

    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    const imageWidth = image.offsetWidth;
    const imageHeight = image.offsetHeight;

    this.x = (containerWidth - imageWidth) / 2;
    this.y = (containerHeight - imageHeight) / 2;

    image.style.transform = `translate(${this.x}px, ${this.y}px)`;
  }

  private navigate() {
    setTimeout(() => {
      this.router.navigate(['/welcome']);
    }, 850);
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;

    this.mouseGlowOpacity = 0.12;

    this.addRipple(event.clientX, event.clientY, false);
  }

  // @HostListener('window:click', ['$event'])
  // onClick(event: MouseEvent): void {
  //   this.addRipple(event.clientX, event.clientY, true);
  // }

  @HostListener('window:resize')
  onResize(): void {
    this.setupCanvas();
  }

  private setupCanvas(): void {
    const canvas = this.waveCanvas.nativeElement;
    const context = canvas.getContext('2d');

    if (!context) return;

    const ratio = window.devicePixelRatio || 1;

    canvas.width = window.innerWidth * ratio;
    canvas.height = window.innerHeight * ratio;

    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    context.setTransform(ratio, 0, 0, ratio, 0, 0);

    this.canvasContext = context;
  }

  private addRipple(x: number, y: number, isClick: boolean): void {
    this.ripples.push({
      x,
      y,
      radius: isClick ? 12 : 4,
      opacity: isClick ? 0.75 : 0.22,
      speed: isClick ? 4.5 : 1.4,
      lineWidth: isClick ? 3 : 1,
    });

    if (this.ripples.length > 150) {
      this.ripples.shift();
    }
  }

  private startWaveAnimation(): void {
    const animateWave = () => {
      const context = this.canvasContext;

      context.clearRect(0, 0, window.innerWidth, window.innerHeight);

      if (this.mouseGlowOpacity > 0) {
        const gradient = context.createRadialGradient(
          this.mouseX,
          this.mouseY,
          0,
          this.mouseX,
          this.mouseY,
          180,
        );

        gradient.addColorStop(0, `rgba(255, 255, 255, ${this.mouseGlowOpacity})`);
        gradient.addColorStop(0.45, `rgba(255, 255, 255, ${this.mouseGlowOpacity * 0.45})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        context.fillStyle = gradient;
        context.fillRect(0, 0, window.innerWidth, window.innerHeight);

        this.mouseGlowOpacity -= 0.001;

        if (this.mouseGlowOpacity < 0) {
          this.mouseGlowOpacity = 0;
        }
      }

      this.ripples.forEach((ripple) => {
        context.beginPath();
        context.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        context.strokeStyle = `rgba(255, 255, 255, ${ripple.opacity})`;
        context.lineWidth = ripple.lineWidth;
        context.stroke();

        ripple.radius += ripple.speed;
        ripple.opacity -= 0.01;
      });

      this.ripples = this.ripples.filter((ripple) => ripple.opacity > 0);

      this.waveAnimationFrameId = requestAnimationFrame(animateWave);
    };

    this.waveAnimationFrameId = requestAnimationFrame(animateWave);
  }

  onScreenClick(event: MouseEvent): void {
    if (this.isExitFading) return;

    this.addRipple(event.clientX, event.clientY, true);

    this.isExitFading = true;
    this.isEnterFadeDone = false;

    this.navigate();
  }
}
