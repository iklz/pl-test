import * as PIXI from '~/pixi'
import Sprite from '~/utils/sprite'
import anime from 'animejs/lib/anime.es'
import app from '~/app'

export default class UI extends PIXI.Container {
  constructor () {
    super();
    this.addElements();
  }

  addElements () {
    const logo = new Sprite('assets/logo.png');
    logo.y = -317;
    logo.setPosition = () => {
      logo.x = app.isPortrait ? -logo.originalSize.width / 2 : -664;
    }
    logo.setPosition();
    this.addChild(logo);

    const button = new Sprite('assets/btn.png');
    button.anchor.set(.5);
    button.y = 241;
    button.setPosition = () => {
      button.x = app.isPortrait ? 0 : -10;
    }
    button.setPosition();
    button.interactive = true;
    button.buttonMode = true;
    button.scale.set(.93);
    button.on('pointertap', () => {});
    this.addChild(button);

    anime({
      targets: button.scale,
      x: 1,
      y: 1,
      duration: 650,
      delay: 80,
      loop: true,
      direction: 'alternate',
      easing: 'linear'
    });
  }
}
