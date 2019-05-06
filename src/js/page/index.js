/**
 * Created by ChengZheLin on 2019/5/6.
 * Features:
 */

'use strict'
import '@less/index.less'
import '@babel/polyfill'

require([
  '../rely/urlParams'
], function (urlParams) {
  const input = document.getElementById('index')
  input.value = urlParams.get('test')
})


/*
let test = 10
function f () {
  const input = document.getElementById('index')
  console.log(test)
  console.log(input.value)

  const up = require('../rely/urlParams')
  input.value = up.get('test')
}

f()
*/

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
