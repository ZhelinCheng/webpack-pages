# webpack-pages

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)

仅用于普通多页面网页开发，如若使用前端框架，请使用相应的cli工具。

## 起步

开发：
```
npm run dev
```

构建：
```
npm run build
```

## 暴露全局变量
你可能需要将某些变量暴露到全局，比如jQuery，那么你需要在`src/js/vendor/index.js`里这样写：
```
require('expose-loader?$!expose-loader?jQuery!jquery')
```
这样，你就将$、jQuery暴露到了全局。其他配置你可以参考 [expose-loader](https://www.npmjs.com/package/expose-loader)
## IE8兼容

### 基本配置

如果你使用jQuery，请执行下面操作：
```
npm install jquery@1.12.4
```

配置wp.config.js的ie8属性：
```
{
    ie8: true
}
```

安装相关依赖：
```
npm i @babel/plugin-transform-modules-commonjs @babel/plugin-transform-runtime -D
```

.babelrc配置：
```
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "debug": true,
        "useBuiltIns": "usage"
      }
    ]
  ],
  "plugins": [
    [
      "@babel/plugin-syntax-dynamic-import"
    ],
    [
      "@babel/plugin-transform-runtime"
    ],
    [
      "@babel/plugin-transform-modules-commonjs"
    ]
  ]
}

```


### ES3运行环境

webpack在打包时并不会主动去支持ES3，上面的配置基本完成了语法层面的兼容，下面时完成api层面的兼容。

首先我们遇到的是bind方法的不支持，也是webpack打包后我遇到的第一个不支持的api，我们可以使用 [es5-shim](https://www.npmjs.com/package/es5-shim)完成兼容操作。

```
<script src="https://cdnjs.cloudflare.com/ajax/libs/es5-shim/4.5.7/es5-shim.min.js"></script>
```

这是本脚手架默认支持的，在你开启ie8兼容时，生产环境默认会导入该JS。也许在ie8上你并用不到es5-shim这么大的包，你可能只需要解决bind方法的兼容。那么你可以在`wp.config.js`中这样配置你的兼容代码：

```
{
    shim: 'https://xxxxx.com/my/es5-shim.js'
}
```

这会替换掉默认的兼容代码，这个路径随你怎么写，脚手架会自动在html底部产生script标签，并指向你配置的路径。如果你未开启ie8支持，也配置了该属性，那么页面也会置入。

### 其他方案

除了es5-shim以外，兼容IE8你还可以使用core-js

并在入口引入缺失的API，并不需要全部引入，根据你自己写的代码判断需要引入哪些。
```
require('core-js/features/object/define-property')
require('core-js/features/object/create')
require('core-js/features/object/assign')
require('core-js/features/array/for-each')
require('core-js/features/array/index-of')
require('core-js/features/function/bind')
require('core-js/features/promise')
```
