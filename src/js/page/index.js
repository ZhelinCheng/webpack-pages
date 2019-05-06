/**
 * Created by ChengZheLin on 2019/5/6.
 * Features:
 */

'use strict'
import '@less/index.less'
// import '@babel/polyfill'

let test = 10
function f () {
  console.log(test)
  console.log(2311)

  let up = require('../rely/urlParams')

  test = up.get('_ijt')
  console.log(test)
}

f()

/*
function timeout () {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(100000)
    }, 1000)
  })
}


;(async function () {
  let data = await timeout()
  console.log(data)
}())
*/
