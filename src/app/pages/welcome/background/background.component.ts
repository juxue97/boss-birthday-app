import { CommonModule } from '@angular/common';
import { Component, Signal } from '@angular/core';
import { CommonService } from '../../../services/common.service';
import { ImageConfigs } from '../../../models/common.model';

@Component({
  selector: 'app-background',
  imports: [CommonModule],
  templateUrl: './background.component.html',
  styleUrl: './background.component.scss',
})
export class AppBackgroundComponent {
  imagePersonConfigs: Signal<ImageConfigs[]>;

  constructor(private commonService: CommonService) {
    this.imagePersonConfigs = this.commonService.imagePersonConfigs;
  }

  get backgroundPersonImages(): ImageConfigs[] {
    return this.imagePersonConfigs().slice(1);
  }

  getEmployeePhotoStyle(index: number): Record<string, string> {
    const positions = [
      // Upper-left area, below balloons
      { x: 19, y: 20, r: -8 },
      { x: 29, y: 20, r: 7 },

      // Upper-right area, below balloons
      { x: 71, y: 20, r: -7 },
      { x: 81, y: 20, r: 8 },

      // Left side, away from center card
      { x: 10, y: 32, r: 9 },
      { x: 21, y: 34, r: -10 },
      { x: 9, y: 45, r: -7 },
      { x: 20, y: 48, r: 8 },
      { x: 10, y: 60, r: 10 },
      { x: 21, y: 63, r: -9 },
      { x: 11, y: 74, r: -8 },
      { x: 23, y: 77, r: 7 },

      // Right side, away from center card
      { x: 90, y: 32, r: -9 },
      { x: 79, y: 34, r: 10 },
      { x: 91, y: 45, r: 7 },
      { x: 80, y: 48, r: -8 },
      { x: 90, y: 60, r: -10 },
      { x: 79, y: 63, r: 9 },
      { x: 89, y: 74, r: 8 },
      { x: 77, y: 77, r: -7 },

      // Bottom row, avoid poppers at far left/right
      { x: 25, y: 90, r: 9 },
      { x: 35, y: 88, r: -8 },
      { x: 45, y: 92, r: 7 },
      { x: 55, y: 89, r: -10 },
      { x: 65, y: 92, r: 8 },
      { x: 75, y: 89, r: -7 },

      // Safe filler positions, still outside center prompt card
      { x: 29, y: 34, r: -9 },
      { x: 72, y: 35, r: 9 },
      { x: 30, y: 76, r: 8 },
    ];

    const position = positions[index % positions.length];

    return {
      '--x': `${position.x}%`,
      '--y': `${position.y}%`,
      '--rotate': `${position.r}deg`,
      '--delay': `${index * 0.07}s`,
      '--duration': `${2.6 + (index % 5) * 0.2}s`,
    };
  }
}
