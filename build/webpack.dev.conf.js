/**
 * Created by ChengZheLin on 2019/5/6.
 * Features:
 */

'use strict'
const path = require('path')

const { merge } = require('webpack-merge')
const baseConfFunc = require('./webpack.base.conf')
const portfinder = require('portfinder')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const { wpConfig } = require('./bundle')

process.env.NODE_ENV = 'development'

module.exports = new Promise((resolve, reject) => {
  const { devServer } = wpConfig
  const baseConf = baseConfFunc()
  const devWebpackConfig = merge(baseConf, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer,
    /* devServer: {
      contentBase: path.resolve(__dirname, '../dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Development',
      }),
    ], */
    /* output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, '../dist'),
      clean: true,
    }, */
  })

  portfinder.basePort = devServer.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(
        new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [
              `Your application is running here: http://localhost:${port}`,
            ],
          },
          onErrors: undefined,
        })
      )
     
      resolve(devWebpackConfig)
    }
  })
})
