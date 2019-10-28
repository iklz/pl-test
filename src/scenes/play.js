import * as PIXI from '~/pixi'
import eventBus from '~/utils/eventBus'
import Menu from '~/objects/menu'
import Sprite from '~/utils/sprite'
import DecorBackground from '~/layers/decorBackground'
import DecorForeground from '~/layers/decorForeground'
import Stair from '~/objects/stair'
import Pin from '~/objects/pin'
import app, { final } from '~/app'
import config from '~/config'
import anime from 'animejs'

class PlayScene extends PIXI.Container {
  constructor(...args) {
    super(...args);
    this.addElements();
  }

  addElements() {
    this.bg = new Sprite('assets/back.png');
    this.bg.anchor.set(0.5);
    this.addChild(this.bg);

    let decorBackground = new DecorBackground();
    this.addChild(decorBackground);

    const austin = new Sprite('assets/austin.png');
    austin.position.set(2, -austin.originalSize.height / 2 - 55);
    this.addChild(austin)

    const stair = new Stair();
    this.addChild(stair);

    let decorForeground = new DecorForeground();
    this.addChild(decorForeground);

    const stairPin = new Pin(config.objectTypes.STAIR, 'assets/icon_hammer.png');
    stairPin.setPosition = () => {
      if (app.isPortrait) {
        stairPin.position.set(140, 30)
      } else {
        stairPin.position.set(441, 0)
      }
    }
    stairPin.setPosition();
    this.addChild(stairPin);

    const stairMenu = new Menu(config.objectTypes.STAIR);
    stairMenu.setPosition = () => {
      if (app.isPortrait) {
        stairMenu.position.set(-140, -30)
      } else {
        stairMenu.position.set(218, -242)
      }
    }
    stairMenu.setPosition();
    this.addChild(stairMenu);

    const menuInstances = {
      [config.objectTypes.STAIR]: stairMenu
    }

    eventBus.on('menuSelect', ({ target, variant }) => {
      switch(target) {
      case config.objectTypes.STAIR:
        stair.selectVariant(variant);
        break;
      case config.objectTypes.TABLE:
        break;
      }
    });

    eventBus.on('pinClick', ({ target }) => {
      let menu = menuInstances[target];

      try {
        menu.animation.play()
      } catch(e) {
        throw Error(`${target} - menu instance not found`);
      }
    });

    eventBus.on('okClick', ({ target }) => {
      switch(target) {
      case config.objectTypes.STAIR:
        anime.remove(...stairMenu.items);
        stairMenu.destroy({ children: true });
        final();
        break;
      case config.objectTypes.TABLE:
        break;
      }
    });
  }
}

export default PlayScene
