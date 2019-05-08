/**
 * Created by ChengZheLin on 2019/5/6.
 * Features:
 */

'use strict'

const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const Autoprefixer = require('autoprefixer')
const { assetsPath } = require('./bundle')
const isProd = process.env.NODE_ENV === 'production'

module.exports = function () {
  let loaders = [
    {
      test: /\.(le|c)ss$/,
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
              Autoprefixer()
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
          presets: ['@babel/preset-env'],
        }
      }
    },
    {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 1000,
        name: assetsPath('img/[name].[hash:7].[ext]')
      }
    },
    {
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac|swf)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 1000,
        name: assetsPath('media/[name].[hash:6].[ext]')
      }
    },
    {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 1000,
        name: assetsPath('fonts/[name].[hash:6].[ext]')
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
