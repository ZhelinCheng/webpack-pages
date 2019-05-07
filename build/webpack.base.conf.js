/**
 * Created by ChengZheLin on 2019/5/6.
 * Features:
 */

'use strict'
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const {initConfig, resolve} = require('./bundle')
const initLoader = require('./loaders')
const SpritesmithPlugin = require('webpack-spritesmith');


const config = {
  devtool: 'cheap-module-source-map',
  // 加载器
  module: {
    rules: []
  },
  resolve: {
    extensions: ['.js', '.json', '.ts'],
    mainFields: ['browser', 'module', 'main']
  },
  plugins: [
    new CleanWebpackPlugin({
      verbose: true,
      dry: false
    }),
    new CopyWebpackPlugin([{
      from: resolve('public'),
      to: resolve('dist'),
      ignore: ['*.html']
    }]),
    new SpritesmithPlugin({
      src: {
        cwd: resolve('src/icon'),
        glob: '*.png'
      },
      target: {
        image: resolve('src/images/icon.png'),
        css: [[resolve('src/less/icon.less'), {
          format: 'function_based_template'
        }]]
      },
      customTemplates: {
        'function_based_template': path.resolve(__dirname, './icon_handlebars_template.handlebars')
      },
      apiOptions: {
        cssImageRef: `../images/icon.png?t=${new Date().getTime()}`,
        handlebarsHelpers: {
          nameHandle (name) {
            let iconName = /^icon/img.test(name) ? name : 'icon-' + name;
            return /_?hover$/img.test(iconName) ? iconName.replace(/_?hover$/img, ':hover') : iconName;
          },
          zeroHandle (val) {
            val = parseInt(val);
            if (val === 0) {
              return 0
            } else {
              return val + 'px'
            }
          }
        }
      },
      spritesmithOptions: {
        algorithm: 'binary-tree'
      }
    })
  ]
}

module.exports = function () {
  const {
    entry,
    output,
    alias,
    htmlPlugins
  } = initConfig()
  const loaders = initLoader()

  config.entry = entry
  config.output = output
  config.resolve.alias = alias
  config.module.rules.push(...loaders)
  config.plugins.push(...htmlPlugins)

  return config
}
