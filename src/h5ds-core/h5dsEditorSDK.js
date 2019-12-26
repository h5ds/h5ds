/**
 * 设计JSSDK是为了更好的使用编辑器，而不依赖react环境
 * h5dsEditor.init(params); // 初始化一个编辑器，一个页面，一个模块只可以初始化一个编辑器
 *
 * params:
 * {
 *   callback: () => {},
 *   before: () => {},
 *
 * }
 *
 * h5ds.getInitData(); // 机票钱初始化数据
 * h5ds.enums; //  eum 数据
 * h5ds.version; // 当前版本号
 *
 */
import React from 'react';
import H5dsEditor from './H5dsEditor';
import { render } from 'react-dom';

class H5DSCore {
  constructor(params) {
    this.params = params || {};
    this.init();
  }

  init() {
    const {
      callBack, // 渲染完成后的回调函数 Function
      data = 'defaultData', // 默认加载的数据 Object， 默认是 defaultData
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
    } = this.params;
    if (!data) {
      console.error('data不能为空');
      return;
    }
    // 路由
    render(
      <H5dsEditor
        plugins={plugins} //插件包
        data={data}
        debugger={false} // debugger=true用于调试插件
        options={{
          headerNav,
          soundSourceModal,
          imageSourceModal,
          template,
          publishHost,
          pluginsHost,
          savePage,
          saveLayer,
          publishApp, // 发布应用
          saveApp, // 保存应用
          appId // 当前appId
        }}
      />,
      target,
      () => {
        callBack && callBack(this.params);
      }
    );
  }
}

window.H5DSCore = H5DSCore;
