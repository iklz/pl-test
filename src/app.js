import * as PIXI from '~/pixi'
import UI from '~/layers/ui'
import config from '~/config'
import PlayScene from '~/scenes/play'
import FinalScene from '~/scenes/final'
import resize from '~/utils/resizer'

PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;

let app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  resolution: window.devicePixelRatio,
  autoResize: true
});

app.isFirstRender = true;

export default app

let playScene, finalScene, mainStage;

app.init = () => {
  document.body.appendChild(app.view);
  mainStage = new PIXI.Container();
  mainStage.originalSize = { width: config.width, height: config.height };

  onResize();
  playScene = new PlayScene();
  finalScene = new FinalScene();
  const ui = new UI();

  finalScene.visible = false;

  mainStage.addChild(playScene);
  mainStage.addChild(finalScene);
  mainStage.addChild(ui);
  app.stage.addChild(mainStage);

  window.addEventListener('resize', onResize);
}

export function final() {
  finalScene.visible = true;
}

let timer;

function onResize() {
  if (app.isFirstRender) {
    app.isFirstRender = false;
    resize(app, mainStage);
  } else {
    app.renderer.view.className = 'hide';
    clearTimeout(timer);

    timer = setTimeout(function() {
      resize(app, mainStage);
      timer = setTimeout(function() {
        app.renderer.view.className = ''
      }, 70);
    }, 200);
  }
}
