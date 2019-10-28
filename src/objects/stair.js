import * as PIXI from '~/pixi'
import Sprite from '~/utils/sprite'
import anime from 'animejs/lib/anime.es'
import app from '~/app'

export default class Stair extends PIXI.Container {
  constructor() {
    super();
    this.isNew = false;
    this.variants = {
      1: { texture: 'assets/new_stair_01.png' },
      2: { texture: 'assets/new_stair_02.png' },
      3: { texture: 'assets/new_stair_03.png' }
    };
    this.selectedVariant = null;
    this.addElements();
  }

  addElements() {
    this.stair = new Sprite('assets/old_stair.png');
    this.stair.anchor.set(1, 0);
    this.stair.y = -267;
    this.stair.setPosition = () => {
      this.stair.x = app.isPortrait ? 450 : 695;
    }
    this.stair.setPosition();
    this.addChild(this.stair);
  }

  changeStair() {
    const item = this.variants[this.selectedVariant];

    this.stair.y = -330;
    this.stair.texture = PIXI.Texture.from(sprite[item.texture].src);
    this.stair.alpha = 0;
    this.animate();
  }

  animate() {
    if (this.animation) {
      return this.animation.restart()
    }

    this.animation = anime({
      targets: this.stair,
      alpha: {
        value: 1,
        duration: 250,
        easing: "linear"
      },
      y: -301,
      duration: 500,
      easing: "easeOutCubic"
    })
  }

  selectVariant(variant) {
    if (variant === this.selectedVariant) {
      return
    }

    this.selectedVariant = variant;
    this.changeStair();
  }
}
