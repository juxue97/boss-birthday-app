import { Injectable, signal } from '@angular/core';
import { ImageConfigs } from '../models/common.model';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  private _imageLogoConfigs = signal<ImageConfigs[]>([]);
  private _imagePersonConfigs = signal<ImageConfigs[]>([]);

  public readonly imageLogoConfigs = this._imageLogoConfigs.asReadonly();
  public readonly imagePersonConfigs = this._imagePersonConfigs.asReadonly();

  constructor() {
    this._imageLogoConfigs.set([
      {
        src: 'assets/images/logo/Primary Logo.png',
        description: 'original (blue text & red logo)',
        css: '',
      },
      {
        src: 'assets/images/logo/ifortePlainWhiteColour.png',
        description: 'white',
        css: '',
      },
      {
        src: 'assets/images/logo/IforteNavyBlueColour.png',
        description: 'blue',
        css: '',
      },
      {
        src: 'assets/images/logo/iforteDigitalRedColour.png',
        description: 'red',
        css: '',
      },
      //   {
      //     src: 'assets/images/logo/iforteBlackColour.png',
      //     description: 'black',
      //     css: '',
      //   },
      {
        src: 'assets/images/logo/iforteInvertedColour.png',
        description: 'inverted (white text & red logo)',
        css: '',
      },
    ]);

    this._imagePersonConfigs.set([
      {
        src: 'assets/images/person/CK.png',
        description: 'ck',
        css: '',
      },
    ]);
  }
}
