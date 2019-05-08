/**
 * Created by ChengZheLin on 2019/5/6.
 * Features:
 */

'use strict'

const fs = require('fs')
const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const alias = require('./alias')
const resolve = (p) => path.resolve(__dirname, '..', p)
const webpackMerge = require('webpack-merge')

// 入口目录
const entryDir = resolve('src/js/page')
// 输出目录
const outputDir = resolve('dist')
// 基础HTML模板
const templatePath = fs.readFileSync(path.resolve(__dirname, './tpl.html'))
// 入口文件
const entryFiles = fs.readdirSync(entryDir)

const
  entry = {},
  output = {},
  htmlPlugins = []

// 默认配置
let config = {
  css: {
    // 清除冗余CSS
    purify: true
  },
  // assets目录
  assetsDir: 'assets',
  // 代理服务器
  devServer: {
    contentBase: resolve('dev'),
    port: '8080',
    host: '0.0.0.0',
    // hot: true,
    // compress: true,
    noInfo: true,
    overlay: {
      errors: true
    }
  },
  // 开发环境是否需要SourceMap
  productionSourceMap: false,
  // public目录JS是否需要SourceMap
  publicSourceMap: false,
  // 是否压缩public目录JS
  publicJsMin: false,
  // 是否生成hash
  filenameHashing: true,
  ie8: false
}

if (fs.existsSync(resolve('wp.config.js'))) {
  let userConfig = require('../wp.config')
  config = webpackMerge(config, userConfig)
}

exports.wpConfig = config

// 设置别名
function resolveAlias () {
  Object.keys(alias).forEach(attr => {
    const val = alias[attr]
    alias[attr] = resolve(val)
  })
}

// 输出文件名配置
function resolveEntryAndOutput () {
  entryFiles.forEach(dir => {
    entry[dir.replace(/\.js$/, '')] = [resolve('src/global'), resolve(`${entryDir}/${dir}`)]

    output.filename = assetsPath('js/[name].bundle.[hash:6].js')
    output.path = outputDir
    output.publicPath = config.publicPath || ''
  })
}

// HTML模板配置
function combineHTMLWithTemplate () {
  entryFiles.forEach(dir => {
    const name = dir.replace(/\.js$/, '')
    const htmlPath = resolve(`src/${name}.html`)

    if (!fs.existsSync(htmlPath)) {
      fs.writeFileSync(htmlPath, templatePath)
    }

    htmlPlugins.push(
      new HTMLWebpackPlugin({
        filename: `${name}.html`,
        template: htmlPath,
        chunks: [name, 'vendor', 'base', 'common']
      })
    )
  })
}

function initConfig () {
  resolveAlias()
  resolveEntryAndOutput()
  combineHTMLWithTemplate()
  return {
    entry,
    output,
    htmlPlugins,
    alias
  }
}

function assetsPath (_path) {
  const assets = config.assetsDir || 'assets'

  if (process.env.NODE_ENV === 'development' || !config.filenameHashing) {
    _path = _path.replace(/\.\[hash(:\d+)?]/, '')
  }

  return path.posix.join(assets, _path)
}

exports.assetsPath = assetsPath

exports.initConfig = initConfig
exports.resolve = resolve
