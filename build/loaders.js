/**
 * Created by ChengZheLin on 2019/5/6.
 * Features:
 */

'use strict'

const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const Autoprefixer = require('autoprefixer')
const AutoprefixerConfig = {
  browsers: ['> 1%', 'last 4 versions', 'not ie <= 8']
}

module.exports = function () {
  let loaders = [
    {
      test: /\.css$/,
      use: [
        {
          loader: process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader'
        },
        {
          loader: 'css-loader',
          options: {
            modules: true
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
            plugins: [
              Autoprefixer(AutoprefixerConfig)
            ]
          }
        }
      ]
    },
    {
      test: /\.less$/,
      use: [
        {
          loader: process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader'
        },
        {
          loader: 'css-loader',
          options: {
            sourceMap: true
          }
        },
        {
          loader: 'less-loader',
          options: {
            sourceMap: true
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
            plugins: [
              Autoprefixer(AutoprefixerConfig)
            ]
          }
        }
      ]
    },
    {
      test: /\.js$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }
  ]

  return loaders.map((item) => {
    return {
      ...item,
      exclude: /node_modules/,
      include: path.resolve(__dirname, '../src')
    }
  })
}
