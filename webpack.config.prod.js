const HTMLWebpackPlugin = require('html-webpack-plugin'),
  TerserPlugin = require('terser-webpack-plugin');

const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';

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
  mode: 'production',
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src/')
    }
  },
  module: {
    rules: [{
      test: /\.(js)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    }]
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 8
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2
          },
          mangle: {
            safari10: true
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true
          }
        },
        extractComments: false,
        parallel: true,
        cache: true,
        sourceMap: shouldUseSourceMap
      })
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html',
      sprite: JSON.stringify(sprite),
      hash: true,
      minify: true
    })
  ]
}