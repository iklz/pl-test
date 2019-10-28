import * as PIXI from '~/pixi'
import Sprite from '~/utils/sprite'
import app from '~/app'

export default class Decor extends PIXI.Container {
  constructor() {
    super();
    this.addElements();
  }

  addElements() {
    const plant3 = new Sprite('assets/dec_1.png');

    plant3.y = 118;
    plant3.setPosition = () => {
      plant3.x = app.isPortrait ? 250 : 423;
    }
    plant3.setPosition();
    this.addChild(plant3);
  }
}
