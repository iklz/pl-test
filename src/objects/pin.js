import * as PIXI from '~/pixi'
import anime from 'animejs/lib/anime.es'
import eventBus from '~/utils/eventBus'
import Sprite from '~/utils/sprite'

export default class Pin extends PIXI.Container {
  constructor(target, image) {
    super();
    this.target = target;
    this.image = image;
    this.addElements();
  }

  addElements() {
    const pin = new Sprite(this.image);
    pin.anchor.set(.5);
    pin.interactive = true;
    pin.buttonMode = true;
    pin.scale.set(0);
    pin.scaleAnimation = 0;
    this.addChild(pin);

    pin.once('pointertap', () => {
      clearInterval(pinShakeInterval);
      anime.remove(pin);
      pin.destroy();
      eventBus.emit('pinClick', { target: this.target })
    });

    anime({
      targets: pin,
      scaleAnimation: 1,
      duration: 800,
      delay: 1500,
      easing: 'easeOutElastic',
      update: () => {
        pin.scale.set(pin.scaleAnimation)
      }
    });

    const rMax = 20;
    const pinShakeAnimation = anime({
      targets: pin,
      duration: 550,
      angle: [
        { value: rMax * -1 },
        { value: rMax },
        { value: rMax / -2 },
        { value: rMax / 2 },
        { value: 0 }
      ],
      autoplay: false,
      easing: 'easeInOutSine'
    });

    let pinShakeInterval = setInterval(() => {
      pinShakeAnimation.restart()
    }, 3000);
  }
}
