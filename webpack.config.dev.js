const HTMLWebpackPlugin = require('html-webpack-plugin');

const path = require('path');
const assetsPath = path.resolve(__dirname, 'src/assets/');
const fs = require('fs');
const imageSize = require('image-size');

function b64Encode(file) {
  return fs.readFileSync(file, { encoding: 'base64' });
}

function createSprite() {
  const files = fs.readdirSync(assetsPath),
    result = {};

  files.forEach(file => {
    const filePath = path.resolve(assetsPath, file);
    const dimensions = imageSize(filePath);

    result[`assets/${file}`] = {
      src: 'data:image/png;base64,' + b64Encode(filePath),
      w: dimensions.width,
      h: dimensions.height
    }
  });

  return result
}

let sprite = createSprite();

module.exports = {
  mode: 'development',
  devServer: {
    contentBase: 'dist',
    port: 3000
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src/')
    }
  },
  devtool: 'inline-source-map',
  plugins: [
    new HTMLWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html',
      sprite: JSON.stringify(sprite)
    })
  ]
}
