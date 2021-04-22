/**
 * Created by ChengZheLin on 2019/5/6.
 * Features:
 */

'use strict'

const fs = require('fs')
const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
// const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const alias = require('./alias')
const resolve = (p) => path.resolve(__dirname, '..', p)
const ejs = require('ejs')
const glob = require('glob')
const { merge } = require('webpack-merge')

// 入口目录
const entryDir = resolve('src/pages')
// 输出目录
const outputDir = resolve('dist')
// 基础HTML模板
const templatePath = fs.readFileSync(path.resolve(__dirname, '../src/document.ejs'))
// 入口文件
const entryFiles = glob.sync(`${entryDir}/**/*.+(t|j)s`)


const isDev = process.env.NODE_ENV === 'development'
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
    contentBase: resolve('div'),
    port: '8080',
    host: '0.0.0.0',
    hot: true,
    // compress: true,
    noInfo: true,
    overlay: {
      errors: true
    }
  },
  // 生产环境是否需要SourceMap
  productionSourceMap: true,
  // public目录JS是否需要SourceMap
  publicSourceMap: true,
  // 是否压缩public目录JS
  publicJsMin: true,
  // 是否生成hash
  filenameHashing: true,
  // 是否支持IE8
  ie8: false,
  // 是否使用shim
  shim: '',
  // 给script标签添加熟悉
  defaultAttribute: 'defer'
}

exports.wpConfig = config

// 设置别名
function resolveAlias () {
  Object.keys(alias).forEach(attr => {
    const val = alias[attr]
    alias[attr] = resolve(val)
  })
}

function getPageName (filePath) {
  const dirs = filePath.split(/\\|\//) || []
  const len = dirs.length
  const dir = dirs[len - 1]

  // const isFile = /\.(j|t)s$/.test(dir)
  const isIndex = /^index\.(j|t)sx?/.test(dir)
  const fileName = dir.replace(/\.(j|t)sx?/i, '')

  return isIndex ? dirs[len - 2] : fileName
}

// 输出文件名配置
function resolveEntryAndOutput () {
  entryFiles.forEach(filePath => {
    entry[getPageName(filePath)] = filePath

    output.filename = assetsPath('js/[name].bundle.[contenthash:6].js')
    output.path = outputDir
    output.publicPath = config.publicPath || ''
    output.clean = true
  })
}

// shim处理函数
function shimHandle (ie8, shim) {
  let html = ''

  // ie8 没有配置shim
  if (ie8 && !shim) {
    return `<script src="https://cdnjs.cloudflare.com/ajax/libs/es5-shim/4.5.7/es5-shim.min.js" type="text/javascript"></script>`
  }

  // 配置了shim
  if (shim) {
    let shimArr = shim instanceof Array ? shim : [shim]
    for (let item of shimArr) {
      html += `<script src="${item}" type="text/javascript"></script>\n`
    }
  }

  return html
}


// HTML模板配置
function combineHTMLWithTemplate () {
  entryFiles.forEach(filePath => {
    const name = getPageName(filePath)
    const htmlPath = resolve(`src/pages/${name}/index.html`)

    if (!fs.existsSync(htmlPath)) {
      fs.writeFileSync(htmlPath, ejs.render(templatePath.toString('utf-8'), {}, {}))
    }

    htmlPlugins.push(
      new HTMLWebpackPlugin({
        title: 'Custom template',
        filename: `${name}.html`,
        template: htmlPath,
        chunks: [name, 'vendor', 'base', 'common'],
        // SHIM: shimHandle(config.ie8, config.shim)
      })
    )

    /* config.defaultAttribute && htmlPlugins.push(
      new ScriptExtHtmlWebpackPlugin({
        defaultAttribute: config.defaultAttribute
      })
    ) */
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

  // 生产环境图片
  if (!isDev && /^img/.test(_path)) {
    return path.posix.join(assets, _path)
  }

  // 开发环境，hash关闭
  if ((isDev || !config.filenameHashing)) {
    _path = _path.replace(/\.\[[a-z]*hash(:\d+)?]/, '')
  }

  return path.posix.join(assets, _path)
}

// resolveEntryAndOutput()

exports.assetsPath = assetsPath
exports.initConfig = initConfig
exports.resolve = resolve
