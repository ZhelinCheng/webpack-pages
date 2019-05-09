/**
 * Created by ChengZheLin on 2019/5/6.
 * Features:
 */
// 当前页面样式引用
import '@less/page/index.less'

$(function () {
  document.getElementById('ua').innerText = navigator.userAgent
  layer.msg('webpack-pages')
})
