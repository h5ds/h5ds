# 开源说明

目前我们只开源了编辑器(v4.x版本)页面的代码（大概整个完整项目的20%代码，完整项目包括：web应用端，web管理端，web编辑器，后台系统，数据库），开源版本商业使用请保留版权信息，开源不等于免费，如需去掉版权信息和获取最新版本的（v6.x）全部源码请购买商业授权[授权协议](http://www.h5ds.com/authorization)

# 简介

> H5DS (HTML5 Design software) 这是一款基于 WEB 的 HTML5 制作工具的内核。让不会写代码的人也能轻松快速上手编写HTML5页面。H5DS同时也是一款基于react+mobx的在线HTML制作工具，灵活的内核可快速改造成各种
可视化制作工具（基于该内核，可以做BI工具，建站工具，图形设计工具，在线PPT工具等一系列工具），H5DS提供了丰富的插件扩展接口，让插件可自由快速扩展和动态加载，同时也支持API接入


### 该产品的特点：

 1. 【高维护性】采用react+mobx模块化开发，源码结构清晰，注释规范，高可维护，方便进行二次开发和迭代升级。
 2. 【高扩展性】编辑器内核独立存在，官方提供了插件开发教程以及CLI工具，可独立开发插件，动态加载插件。
 3. 【高性能】采用mobx统一管理数据，底层proxy数据监听，做了大量节流和防抖优化，插件按需加载，不占内存。
 4. 【多终端支持】支持手机页面、PC页面独立制作，设计界面可自由切换，采用缩放模式兼容各种屏幕分辨率，PC/Mobile一网打尽。

官方网站：[www.h5ds.com](https://www.h5ds.com)

github地址：[https://github.com/h5ds/h5ds](https://github.com/h5ds/h5ds)

软件截图：

![](http://cdn.h5ds.com/doc/images/h5ds.png)

# 加入我们

QQ群：549856478

![image](https://cdn.h5ds.com/doc/images/qq.jpg)


# 如何使用

### 1. 引入必须的资源包。

```html
<link rel="stylesheet" href="https://at.alicdn.com/t/font_157397_ujac0trx9i.css">
  <link href="https://cdn.h5ds.com/lib/plugins/swiper.min.css" rel="stylesheet">
  <link href="https://cdn.bootcss.com/antd/3.23.0-beta.0/antd.min.css" rel="stylesheet">
  <!-- 编辑器所需第三方资源库 -->
  <script src="https://cdn.h5ds.com/lib/plugins/swiper.min.js"></script>
  <script src="https://cdn.h5ds.com/lib/plugins/jquery.min.js"></script>
  <script src="https://cdn.h5ds.com/lib/plugins/h5ds.vendor.min.js"></script>
  <!-- 外部引入antd -->
  <script src="https://cdn.bootcss.com/moment.js/2.24.0/moment.min.js"></script>
  <script src="https://cdn.bootcss.com/antd/3.23.0-beta.0/antd.min.js"></script>
```

### 2. 安装使用H5DS

> webpack必须配置

```javascript

externals: ['React', 'ReactDOM', 'ReactRouter', 'ReactRouterDOM', 'mobx', '_', 'antd', 'PubSub', 'moment']

```

> npm install h5ds --save

```javascript

import 'h5ds/editor/style.css';

import React, { Component } from 'react';
import H5dsEditor from 'h5ds/editor';

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }

  /**
   * 保存APP
   */
  saveApp = async data => {
    console.log('saveApp ->', data);
  };

  /**
   * 发布 app
   */
  publishApp = async data => {
    console.log('publishApp ->', data);
  };

  componentDidMount() {
    // 模拟异步加载数，设置 defaultData 会默认加载一个初始化数据
    setTimeout(() => {
      this.setState({ data: 'defaultData' });
    }, 100);
  }

  /**
   * 使用编辑器部分
   */
  render() {
    const { data } = this.state;
    return (
      <H5dsEditor
        plugins={[]} // 第三方插件包
        data={data}
        options={{
          publishApp: this.publishApp,
          saveApp: this.saveApp, // 保存应用
          appId: 'test_app_id' // 当前appId
        }}
      />
    );
  }
}
export default Editor;

```

# 直接使用H5DS JS-SDK

> 执行 npm run build:libs 会生成一个libs包。可以直接通过 new H5DSCore() 的方式去使用libs包

### 下面的 index.html 双击打开即可

```html
<!DOCTYPE html>
<html>

<head lang="zh-cn">
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="description" content="">
  <meta name="keywords" content="">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>H5DS</title>
  <meta name="renderer" content="webkit">
  <!-- No Baidu Siteapp-->
  <meta http-equiv="Cache-Control" content="no-siteapp" />
  <meta name="apple-mobile-web-app-title" content="yes" />
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">
  <meta http-equiv="Cache-Control" content="no-siteapp" />
  <link rel="shortcut icon" href="/assets/images/favicon.ico">
  <link rel="stylesheet" href="https://at.alicdn.com/t/font_157397_ujac0trx9i.css">
  <link href="https://cdn.h5ds.com/lib/plugins/swiper.min.css" rel="stylesheet">
  <link href="https://cdn.bootcss.com/antd/3.23.0-beta.0/antd.min.css" rel="stylesheet">
  <!-- 编辑器所需第三方资源库 -->
  <script src="https://cdn.h5ds.com/lib/plugins/swiper.min.js"></script>
  <script src="https://cdn.h5ds.com/lib/plugins/jquery.min.js"></script>
  <script src="https://cdn.h5ds.com/lib/plugins/h5ds.vendor.min.js"></script>
  <!-- 外部引入antd -->
  <script src="https://cdn.bootcss.com/moment.js/2.24.0/moment.min.js"></script>
  <script src="https://cdn.bootcss.com/antd/3.23.0-beta.0/antd.min.js"></script>
  <!-- 引入打包后的libs包 -->
  <link href="https://cdn.h5ds.com/lib/editor/style.css" rel="stylesheet">
  <script src="https://cdn.h5ds.com/lib/editor/index.js" type="text/javascript"></script>
</head>

<body>
  <div id="App"></div>
</body>

<script>
$(function() {
  /**
   * 参数说明：
    callBack, // 渲染完成后的回调函数 Function
    data, // 默认加载的数据 Object
    plugins = [], // 加载的插件名称 eg: ['demo']
    imageSourceModal, // 图片资源弹窗 ReactDOM
    soundSourceModal, // 音乐资源弹窗 ReactDOM
    template, // 单页模板列表 ReactDOM
    publishHost = '', // 发布应用的HOST地址：eg: http://localhost:8888
    pluginsHost = '.', // 插件加载地址，默认： '.'，自动会加上 '/plugins'
    publishApp, // 发布APP。Function return Promise
    saveApp, // 保存APP 。 Function return Promise
    headerNav, // 右上角的链接。右上角可以自定义菜单 ReactDOM
    savePage, // 收藏页面调用 Function return Promise
    saveLayer, // 收藏图层调用 Function reutrn Promise
    appId = 'test_app_id', // appId
    target = document.querySelector('body') // 默认渲染的区域，默认是document.querySelector('body')
   */
  new H5DSCore({
    target: document.getElementById('App')
  });
})
</script>
</html>
```
