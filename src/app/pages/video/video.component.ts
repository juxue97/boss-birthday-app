import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-video',
  imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './video.component.html',
  styleUrl: './video.component.scss',
})
export class AppVideoComponent implements AfterViewInit {
  constructor(private router: Router) {}

  videoSrc: string = 'assets/videos/ck_birthday.mov';

  @ViewChild('birthdayVideo') birthdayVideo!: ElementRef<HTMLVideoElement>;

  goBack(): void {
    this.router.navigate(['./welcome']);
  }

  ngAfterViewInit(): void {
    this.playFullscreen();
  }

  playFullscreen(): void {
    const video = this.birthdayVideo.nativeElement;

    video.play();

    if (video.requestFullscreen) {
      video.requestFullscreen();
    }
  }
}
