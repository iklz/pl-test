import * as PIXI from '~/pixi'
import Sprite from '~/utils/sprite'

class MenuItem extends PIXI.Container {
  constructor(image, variant) {
    super();

    this.width = 137;
    this.height = 137;
    this.originalSize = { width: 137, height: 137 };
    this.interactive = true;
    this.buttonMode = true;
    this.scale.set(0);
    this.scaleAnimation = 0;
    this.itemVariant = variant;
    this.itemImage = image;

    this.addElements();

    this.on('pointertap', (e) => {
      this.parent.emit('variantChosen', this.itemVariant);
    });
  }

  select() {
    this.chosenSprite.visible = true;
  }

  deselect() {
    this.chosenSprite.visible = false;
  }

  addElements() {
    const containerSprite = new Sprite('assets/menu_item.png');
    containerSprite.anchor.set(.5);
    containerSprite.position.set(0, 0);
    this.addChild(containerSprite)

    this.chosenSprite = new Sprite('assets/menu_item_choosed.png');
    this.chosenSprite.anchor.set(.5);
    this.chosenSprite.position.set(0, -4);
    this.chosenSprite.visible = false;
    this.addChild(this.chosenSprite)

    const itemSprite = new Sprite(this.itemImage)
    itemSprite.anchor.set(.5);
    itemSprite.position.set(3, -2);
    this.addChild(itemSprite);
  }
}

export default MenuItem
