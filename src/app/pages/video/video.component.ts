import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Signal, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { VideoConfigs } from '../../models/common.model';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-video',
  imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './video.component.html',
  styleUrl: './video.component.scss',
})
export class AppVideoComponent implements AfterViewInit {
  videoConfigs: Signal<VideoConfigs>;

  constructor(
    private router: Router,
    private commonService: CommonService,
  ) {
    this.videoConfigs = this.commonService.videoConfigs;
  }

  @ViewChild('birthdayVideo') birthdayVideo!: ElementRef<HTMLVideoElement>;

  goBack(): void {
    this.router.navigate(['./welcome']);
  }

  ngAfterViewInit(): void {
    this.playFullscreen();
  }

  get currentVideo(): VideoConfigs | null {
    return this.videoConfigs() ?? null;
  }

  playFullscreen(): void {
    const video = this.birthdayVideo.nativeElement;

    video.play();

    if (video.requestFullscreen) {
      video.requestFullscreen();
    }
  }
}
