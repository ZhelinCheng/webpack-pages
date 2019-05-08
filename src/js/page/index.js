/**
 * Created by ChengZheLin on 2019/5/6.
 * Features:
 */

// 当前页面样式引用
import '@less/page/index.less'

// 当前页面JS库引用
import '@babel/polyfill'
import urlParams from '../rely/urlParams'

$(function () {
  console.log(urlParams)
})
