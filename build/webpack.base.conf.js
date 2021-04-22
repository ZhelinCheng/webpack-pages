/**
 * Created by ChengZheLin on 2019/5/6.
 * Features:
 */

'use strict'
const fs = require('fs')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const {initConfig, assetsPath, resolve, wpConfig} = require('./bundle')
const initLoader = require('./loaders')
// const SpritesmithPlugin = require('webpack-spritesmith')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJS = require('uglify-js')

// 判断是否进行public目录JS压缩
const isPublicJsMin = process.env.NODE_ENV === 'production' && wpConfig.publicJsMin

const config = {
  devtool: 'inline-source-map',
  // 加载器
  module: {
    rules: []
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    mainFields: ['browser', 'module', 'main']
  },
  /* optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          safe: true
        }
      })
    ],
  }, */
  plugins: [
    new MiniCssExtractPlugin({
      filename: assetsPath('css/[name].bundle.[contenthash:6].css')
    })
  ]
}

// 判断是否有静态资源目录
/* if (fs.existsSync(resolve('public'))) {
  config.plugins.push(
    new CopyWebpackPlugin([{
      from: resolve('public'),
      to: resolve(`dist/${wpConfig.assetsDir}`),
      ignore: ['*.html', '.gitkeep'],
      transform (content, path) {
        // 压缩static目录JS文件
        if (isPublicJsMin && /\.js$/.test(path) && path.indexOf('min.js') < 0) {
          content = UglifyJS.minify(content.toString('utf-8'), {
            warnings: true,
          }).code
        }
        return content
      }
    }])
  )
} */

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
