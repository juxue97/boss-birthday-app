import { Injectable, signal } from '@angular/core';
import { ImageConfigs, VideoConfigs } from '../models/common.model';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  private _imageLogoConfigs = signal<ImageConfigs[]>([]);
  private _imagePersonConfigs = signal<ImageConfigs[]>([]);
  private _videoConfigs = signal<VideoConfigs>({
    src: '',
    description: '',
  });

  public readonly imageLogoConfigs = this._imageLogoConfigs.asReadonly();
  public readonly imagePersonConfigs = this._imagePersonConfigs.asReadonly();
  public readonly videoConfigs = this._videoConfigs.asReadonly();

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
        src: 'assets/images/person/CK_HEAD.png',
        description: 'ck-head',
        css: '',
      },
      {
        src: 'assets/images/person/alan.png',
        description: 'alan',
        css: '',
      },
      {
        src: 'assets/images/person/amelia.png',
        description: 'amelia',
        css: '',
      },
      {
        src: 'assets/images/person/candy.png',
        description: 'candy',
        css: '',
      },
      {
        src: 'assets/images/person/CK.png',
        description: 'ck',
        css: '',
      },
      {
        src: 'assets/images/person/clarisa.png',
        description: 'clarisa',
        css: '',
      },
      {
        src: 'assets/images/person/effie.png',
        description: 'effie',
        css: '',
      },
      {
        src: 'assets/images/person/esther.png',
        description: 'esther',
        css: '',
      },
      {
        src: 'assets/images/person/harris.png',
        description: 'harris',
        css: '',
      },
      {
        src: 'assets/images/person/huimin.png',
        description: 'huimin',
        css: '',
      },
      {
        src: 'assets/images/person/huisze.png',
        description: 'huisze',
        css: '',
      },
      {
        src: 'assets/images/person/jack.png',
        description: 'jack',
        css: '',
      },
      {
        src: 'assets/images/person/jasmine.png',
        description: 'jasmine',
        css: '',
      },
      {
        src: 'assets/images/person/kc.png',
        description: 'kc',
        css: '',
      },
      {
        src: 'assets/images/person/kiwi.png',
        description: 'kiwi',
        css: '',
      },
      {
        src: 'assets/images/person/leaneB.png',
        description: 'big leane',
        css: '',
      },
      {
        src: 'assets/images/person/leaneS.png',
        description: 'small leane',
        css: '',
      },
      {
        src: 'assets/images/person/linda.png',
        description: 'linda',
        css: '',
      },
      {
        src: 'assets/images/person/marcus.png',
        description: 'marcus',
        css: '',
      },
      {
        src: 'assets/images/person/peiqi.png',
        description: 'peiqi',
        css: '',
      },
      {
        src: 'assets/images/person/peiwen.png',
        description: 'peiwen',
        css: '',
      },
      {
        src: 'assets/images/person/pepsy.png',
        description: 'pepsy',
        css: '',
      },
      {
        src: 'assets/images/person/rachel.png',
        description: 'rachel',
        css: '',
      },
      {
        src: 'assets/images/person/riko.png',
        description: 'riko',
        css: '',
      },
      {
        src: 'assets/images/person/szeern.png',
        description: 'szeern',
        css: '',
      },
      {
        src: 'assets/images/person/teh.png',
        description: 'teh',
        css: '',
      },
      {
        src: 'assets/images/person/wenkang.png',
        description: 'wenkang',
        css: '',
      },
      {
        src: 'assets/images/person/wenting.png',
        description: 'wenting',
        css: '',
      },
      {
        src: 'assets/images/person/xavier.png',
        description: 'xavier',
        css: '',
      },
      {
        src: 'assets/images/person/xueping.png',
        description: 'xueping',
        css: '',
      },
    ]);

    this._videoConfigs.set({
      src: 'assets/videos/ck_birthday.mov',
      description: 'boss birthday video',
    });
  }
}
