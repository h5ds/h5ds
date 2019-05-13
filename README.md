# 重要通知：h5ds.com正在备案暂时无法访问，请使用 h5ds.cn 访问

# **简介**

- H5DS (HTML5 Design software) 这是一款基于WEB的 H5制作工具。让不会写代码的人也能轻松快速上手制作H5页面。
- H5DS 官方 Git (https://github.com/h5ds/h5ds) ，简体中文 UTF8 版本，其他版本请自行转码
- h5ds 官方站：http://www.h5ds.com

![img](http://cdn.h5ds.com/doc/images/h5ds.gif)

# **版权声明**

您可以下载本站代码，但未经许可 **禁止** 在本产品的整体或任何部分基础上以发展任何派生版本、修改版本或第三方版本用于 **重新分发** ,您可以下载源码进行学习或者商业使用而无需支付任何费用，任何企业或者个人在未获得四川爱趣五科技有限公司的书面授权之前，不可去掉编辑器的LOGO和官方链接地址已经相关的版权信息，您若有违反规定，四川爱趣五科技有限公司有权随时中止或终止您对H5DS产品的使用资格并保留追究相关法律责任的权利

# **相关网站**

- h5ds 官方站：http://www.h5ds.com

- h5ds 技术文档：http://doc.h5ds.com

# **技术交流群**

[QQ群1 549856478](https://jq.qq.com/?_wv=1027&k=5I0kPBX)

# **友情提示**

若有BUG，请及时issues我们，会第一时间做修改！

# **其他react项目中安装使用说明**

运行环境 node v6.x npm 5.x

### 1. 加载第三方资源库

> HTML(index.html)必须载入图标库的CSS和第三方插件
```html
<link rel="stylesheet" type="text/css" href="http://at.alicdn.com/t/font_157397_gh8aos5s98.css">
<script src="http://cdn.h5ds.com/lib/plugins/jquery.min.js"></script>
<script src="http://cdn.h5ds.com/lib/plugins/qrcode.min.js"></script>
<script src="http://cdn.h5ds.com/lib/plugins/hammer.min.js"></script>
```

### 2. 安装主程序
> npm install h5ds --save

### 3. 安装第三方依赖库
> npm install antd dayjs preload-js localforage lodash mobx mobx-react moment react react-color react-contenteditable react-dom tinycolor2 url-parse --save

### 4. 使用H5DS组件

```javascript
import 'h5ds/css/h5ds.4.5.0.css';
import H5DS from 'h5ds';

const setting = {
  // 保存单个页面
  savePage: (data) => {
    console.log(data);
    alert('操作成功，请F12查看Console');
    return Promise.resolve();
  },
  // 保存整个应用
  saveApp: (appid, data) => {
    console.log(appid, data);
    alert('操作成功，请F12查看Console');
    return Promise.resolve();
  },
  // 发布应用
  publishApp: (appid, data, shtml) => {
    console.log(appid, data, shtml);
    alert('操作成功，请F12查看Console');
    return Promise.resolve();
  },
  plugins: []
}
<H5DS {...setting}/>

```
> setting的具体参数请阅读文档 http://doc.h5ds.com

# **更新说明**

请查看 CHANGELOG.md 文件
