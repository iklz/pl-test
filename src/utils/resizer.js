import config from '~/config'

export default function resize(app, stage) {
  const width = document.body.clientWidth,
    height = document.body.clientHeight,
    isPortrait = width < height;

  let ratio,
    clientRatio,
    newWidth = width,
    newHeight,
    scaleIndex;

  if (isPortrait) {
    if (height < config.height) {
      scaleIndex = height / config.height;
      newHeight = scaleIndex * height;
      newWidth = config.width * scaleIndex;
    } else {
      scaleIndex = 1;
      newHeight = config.height;
      newWidth = config.width;
    }

    app.renderer.resize(newWidth, newHeight);
    stage.position.set(width / 2, newHeight / 2);
  } else {
    clientRatio = width / height;
    ratio = config.width / config.height;

    if (ratio < clientRatio) {
      newWidth = Math.floor(height * ratio);
    }

    newHeight = Math.floor(newWidth / ratio);
    scaleIndex = newWidth / config.width;

    app.renderer.resize(newWidth, newHeight);
    stage.position.set(newWidth / 2, newHeight / 2);
  }

  stage.scale.set(scaleIndex);
  app.renderer.view.style.top = Math.max((height - newHeight) / 2, 0) + "px";
  app.isPortrait = isPortrait;

  setChildPosition(stage);
}

function setChildPosition(node) {
  for (let i = 0; i < node.children.length; i++) {
    let child = node.children[i];
    setChildPosition(child);
    typeof child.setPosition === 'function' && child.setPosition();
  }
}
