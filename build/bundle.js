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
    entry[dir.replace(/\.js$/, '')] = ['@babel/polyfill', resolve(`${entryDir}/${dir}`)]
    if (process.env.NODE_ENV === 'development') {
      output.filename = 'js/[name].bundle.js'
    } else {
      output.filename = 'js/[name].bundle.[hash:6].js'
    }
    output.path = outputDir
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
        chunks: [name, 'vendor']
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

exports.initConfig = initConfig
exports.resolve = resolve
