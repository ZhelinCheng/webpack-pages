/**
 * Created by ChengZheLin on 2019/5/6.
 * Features:
 */

'use strict'

const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const Autoprefixer = require('autoprefixer')

module.exports = function () {
  let loaders = [
    {
      test: /\.(le|c)ss$/,
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
          presets: ['@babel/preset-env']
        }
      }
    },
    {
      test: /\.(gif|jpg|png|bmp|eot|woff|woff2|ttf|svg)/,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 20,
            outputPath: 'images',
            name: process.env.NODE_ENV === 'production' ? '[name]_[hash:6].[ext]' : '[name].[ext]'
          }
        }
      ]
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
