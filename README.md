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

## IE8兼容

配置wp.config.js的ie8属性：
```
{
    ie8: true
}
```


安装相关依赖：
```
npm i @babel/plugin-transform-modules-commonjs @babel/plugin-transform-runtime core-js -D
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
