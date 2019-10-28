import * as PIXI from '~/pixi'

class Sprite extends PIXI.Sprite {
  constructor(name) {
    const texture = PIXI.Texture.from(sprite[name].src);

    super(texture);

    this.originalSize = {
      width: sprite[name].w,
      height: sprite[name].h
    }
  }
}

export default Sprite
