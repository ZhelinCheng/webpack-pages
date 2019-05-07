/**
 * Created by ChengZheLin on 2019/5/6.
 * Features:
 */

'use strict'
import '@less/page/index.less'

const urlParams = () => import('@rely/urlParams')

let arr = [1, 2, 3]


console.log(...arr)

function timeout () {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('哈哈哈')
    }, 3000)
  })
}


/*

require([
  '@rely/urlParams'
], async function (urlParams) {
  const input = document.getElementById('index')
  let data = await timeout()
  input.value = data + urlParams.get('_ijt')
  console.log(1111111111)
})
*/
