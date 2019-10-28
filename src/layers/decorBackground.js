import * as PIXI from '~/pixi'
import Sprite from '~/utils/sprite'
import app from '~/app'

export default class DecorBackground extends PIXI.Container {
  constructor() {
    super();
    this.addElements();
  }

  addElements() {
    const globe = new Sprite('assets/globe.png');
    globe.y = -210;
    globe.setPosition = () => {
      globe.x = app.isPortrait ? -390 : -600;
    }
    globe.setPosition();
    this.addChild(globe);

    const table = new Sprite('assets/table.png');
    table.y = -122;
    table.setPosition = () => {
      table.x = app.isPortrait ? -300 : -480;
    }
    table.setPosition();
    this.addChild(table);

    const sofa = new Sprite('assets/sofa.png');
    sofa.y = 3;
    sofa.setPosition = () => {
      sofa.x = app.isPortrait ? -390 : -570;
    }
    sofa.setPosition();
    this.addChild(sofa);

    const plant1 = new Sprite('assets/plant.png');
    plant1.position.set(-245, -360);
    this.addChild(plant1);

    const bookStand = new Sprite('assets/book_stand.png');
    bookStand.position.set(139, -320);
    this.addChild(bookStand);

    const plant2 = new Sprite('assets/plant.png');
    plant2.position.set(442, -155);
    this.addChild(plant2);
  }
}
