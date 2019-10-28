import * as PIXI from '~/pixi'
import Sprite from '~/utils/sprite'
import app from '~/app'

class FinalScene extends PIXI.Container {
  constructor(...args) {
    super(...args);
    this.addElements();
  }

  addElements() {
    const bg = new PIXI.Graphics();
    bg.beginFill(0x000000);
    bg.drawRect(-695, -320, 1390, 640);
    bg.alpha = .6;
    this.addChild(bg);

    const banner = new Sprite('assets/final.png');
    banner.setPosition = () => {
      if (app.isPortrait) {
        banner.scale.set(.6);
        banner.position.set(-183, -130);
      } else {
        banner.scale.set(1);
        banner.position.set(-305, -270);
      }
    }
    banner.setPosition();
    this.addChild(banner);
  }
}

export default FinalScene
