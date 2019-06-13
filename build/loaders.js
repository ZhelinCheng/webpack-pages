/**
 * Created by ChengZheLin on 2019/5/6.
 * Features:
 */

'use strict'

const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {assetsPath} = require('./bundle')

module.exports = function () {
  let loaders = [
    {
      test: /\.less$/,
      exclude: /node_modules/,
      include: path.resolve(__dirname, '../src'),
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            sourceMap: true
          }
        },
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
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
            sourceMap: true
          }
        }
      ]
    },
    {
      test: /\.css$/,
      include: [
        path.resolve(__dirname, '../src'),
        path.resolve(__dirname, '../node_modules'),
      ],
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            sourceMap: true
          }
        },
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
          }
        }
      ]
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      include: path.resolve(__dirname, '../src'),
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        },
        {
          loader: 'eslint-loader',
          options: {
            cache: true
          }
        }
      ]
    },
    {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 1000,
        name: assetsPath('img/[name].[contenthash:6].[ext]')
      }
    },
    {
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac|swf|flv)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 1000,
        name: assetsPath('media/[name].[contenthash:6].[ext]')
      }
    },
    {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 1000,
        name: assetsPath('fonts/[name].[contenthash:6].[ext]')
      }
    }
  ]

  /*return loaders.map((item) => {
    return {
      ...item,
      exclude: /node_modules/,
      include: path.resolve(__dirname, '../src')
    }
  })*/

  return loaders
}
