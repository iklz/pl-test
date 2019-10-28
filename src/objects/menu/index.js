import * as PIXI from '~/pixi'
import anime from 'animejs/lib/anime.es'
import Sprite from '~/utils/sprite'
import MenuItem from '~/objects/menu/item'
import itemVariants from '~/objects/menu/variants'
import eventBus from '~/utils/eventBus'

class Menu extends PIXI.Container {
  constructor(target) {
    super();
    this.target = target;
    this.variants = itemVariants[this.target];
    this.items = [];
    this.addElements();
    this.on('variantChosen', this.selectVariant.bind(this))
  }

  selectVariant(variant) {
    this.selected = variant;

    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].itemVariant === variant) {
        this.items[i].select();
        this.okButton.position.set(this.items[i].position.x + 1, this.items[i].position.y + this.items[i].height / 2 + 22);
      } else {
        this.items[i].deselect()
      }
    }

    this.okButton.visible = true;
    eventBus.emit('menuSelect', {
      target: this.target,
      variant: this.selected
    })
  }

  addElements() {
    for (let i = 0; i < this.variants.length; i++) {
      const item = new MenuItem(this.variants[i].image, this.variants[i].variant);

      item.x = i * 140;
      this.items.push(item);
    }

    this.addChild(...this.items);

    this.animation = anime({
      targets: [...this.items],
      scaleAnimation: 1,
      duration: 800,
      delay: anime.stagger(130),
      autoplay: false,
      easing: 'easeOutElastic(1, .8)',
      update: (anim) => {
        anim.animatables.forEach(container => {
          container.target.scale.set(container.target.scaleAnimation);
        })
      }
    });

    this.okButton = new Sprite('assets/ok.png');
    this.okButton.anchor.set(.5);
    this.okButton.interactive = true;
    this.okButton.visible = false;
    this.addChild(this.okButton);

    this.okButton.once('pointertap', (e) => {
      eventBus.emit('okClick', { target: this.target })
    });
  }
}

export default Menu
