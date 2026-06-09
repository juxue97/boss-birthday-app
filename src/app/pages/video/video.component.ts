import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
export class AppVideoComponent {
  constructor(private router: Router) {}

  videoSrc: string = 'assets/videos/boss-video.mp4';

  goBack(): void {
    this.router.navigate(['./welcome']);
  }
}
