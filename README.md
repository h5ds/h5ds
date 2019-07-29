# H5DS V5 插件开发版

该项目用于开发插件使用，`npm i`安装依赖，`npm start`启动项目，插件代码示例：`src/plugins/demo`

# 简介

> H5DS (HTML5 Design software) 这是一款基于 WEB 的 HTML5 制作工具的内核。让不会写代码的人也能轻松快速上手编写HTML5页面。H5DS同时也是一款基于react+mobx的在线HTML制作工具，灵活的内核可快速改造成各种
可视化制作工具（基于该内核，可以做BI工具，建站工具，图形设计工具，在线PPT工具等一系列工具），H5DS提供了丰富的插件扩展接口，让插件可自由快速扩展和动态加载，同时也支持API接入


## 该产品的特点：

 1. 【高维护性】采用react+mobx模块化开发，源码结构清晰，注释规范，高可维护，方便进行二次开发和迭代升级。
 2. 【高扩展性】编辑器内核独立存在，官方提供了插件开发教程以及CLI工具，可独立开发插件，动态加载插件。
 3. 【高性能】采用mobx统一管理数据，底层proxy数据监听，做了大量节流和防抖优化，插件按需加载，不占内存。
 4. 【多终端支持】支持手机页面、PC页面独立制作，设计界面可自由切换，采用缩放模式兼容各种屏幕分辨率，PC/Mobile一网打尽。

示范网站：www.h5ds.com

开源地址：https://github.com/h5ds/h5ds（部分开源）

软件截图：

![](http://cdn.h5ds.com/doc/images/pc.png)


# 产品介绍

H5DS编辑器用到的主要技术有ES6，react，mobx，koa2，gulp，webpack，mysql等打造的一款可视化的HTML5制作工具。项目对技术人员有一定的技术要求，请务必在掌握以上技术之后再阅读该技术文档，文档中并未列出每个方法和类的细节，如果有遇到相关的技术障碍，请联系我们的在线技术人员进行咨询。该文档主要用于帮助开发者进行二次开发入门使用，所以仅适合技术人员阅读。

相关技术参考文档：

React: https://react.docschina.org/

Mobx: https://cn.mobx.js.org/

Koa2: https://koa.bootcss.com/

Gulp: https://www.gulpjs.com.cn/

Webpack: https://www.webpackjs.com/

ES6: http://es6.ruanyifeng.com/
