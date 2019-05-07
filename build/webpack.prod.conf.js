/**
 * Created by ChengZheLin on 2019/5/6.
 * Features:
 */
'use strict'
const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const webpackBaseFn = require('./webpack.base.conf')
const webpackMerge = require('webpack-merge')
const glob = require('glob');
const PurifyCSSPlugin = require("purifycss-webpack");

function f () {
  const baseConfig = webpackBaseFn()

  return webpackMerge(baseConfig, {
    mode: 'production',
    output: {
      publicPath: './'
    },
    optimization: {
      splitChunks: {
        chunks: 'async',
        minSize: 30000,
        maxSize: 0,
        minChunks: 2,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: '~',
        name: true,
        cacheGroups: {
          /*common: {
            chunks: 'initial',
            name: 'common',
            minSize: 1,
            priority: -10
          },*/
          vendors: {
            chunks: 'all',
            // test: /[\\/]node_modules[\\/]/,
            minChunks: 2,
            priority: -10,
            minSize: 2000,
            name: 'vendor',
            reuseExistingChunk: true
          },
          /*base: {
            name: 'base',
            test: /\.(le|c)ss$/,
            chunks: 'all',
            // enforce: true,
            minSize: 2000,
            priority: -20,
          },*/
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          }
        }
      },
      minimizer: [
        new UglifyJsPlugin({
          sourceMap: true,
          cache: true,
          parallel: true,

          uglifyOptions: {
            compress: {
              // ie8: true,
              warnings: false,
              drop_debugger: false,
              drop_console: true
            }
          }
        }),
        new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: {
            safe: true
          }
        })
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        sourceMap: true,
        filename: 'css/[name].bundle.[hash:6].css'
      }),
      new PurifyCSSPlugin({
        paths: glob.sync(path.join(__dirname, '../src/*.html')),
      })
    ]
  })
}

module.exports = f()
