// 挂载layers
import * as basicLayersEditor from '../layers';

import React, { Component } from 'react';
import { bindSelf } from '../../utils';
import { config, getInitData, setConfig } from '../../config';
import { inject, observer } from 'mobx-react';
import { loadExtensionScripts, mountBasicLayerPlugins, mountExtensionPlugins } from '../../h5ds-app-preview/tools';

import FrameInner from './FrameInner';
import LoadingBox from '../loading';
import { mountPlugin } from 'h5ds-mount-plugin';
import { transaction } from 'mobx';

// import { installPlugins, loadScript } from '../../h5ds-app-preview/tools';

/**
 * @desc 接收外部全部的props参数
 * 参数：data, config, plugins
 * 方法：savePage, saveApp, publishApp
 * react组件：music, template
 */
@inject('h5ds', 'scope')
@observer
class Frame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoad: false,
      loadEnd: false, // 全部加载ok
      data: null
    };
    this.scripts = [];
  }

  static getDerivedStateFromProps(props, state) {
    if (props.data) {
      return Object.assign(state, { data: props.data, dataLoad: true });
    } else {
      return state;
    }
  }

  /**
   * dev环境已经挂载了插件，但是在pro环境，需要提供name去加载插件，加载后会自动挂载
   * 插件存放到 window.H5DS_GLOBAL = { plugins: {...} } 里面了
   */
  @bindSelf
  async mountExtendsPlugins(plus = []) {
    // 挂载基础插件，秒挂
    mountBasicLayerPlugins(basicLayersEditor);

    if (this.props.debugger) {
      // 挂载plus，因为是直接加载的，所以在 debugger中秒挂
      plus.forEach(data => {
        mountPlugin(data);
      });
      // 进度条
      if (window.pubSubEditor) {
        window.pubSubEditor.publish('h5ds.load.plugins', {
          count: plus.length,
          index: plus.length,
          progress: 1,
          name: 'all plugins load end',
          type: 'plugin'
        });
      }
    } else {
      const { pluginsHost = '' } = this.props.options;
      await mountExtensionPlugins(plus, pluginsHost, 'editor');
    }

    // 挂载成功，加载scripts
    this.mountPluginsEnd();
  }

  @bindSelf
  async mountPluginsEnd() {
    // 挂载后加载scripts
    await loadExtensionScripts();

    const { scripts = [], plugins = {} } = window.H5DS_GLOBAL || {};
    // 加载成功
    setTimeout(() => {
      transaction(() => {
        this.props.scope.plugins = Object.values(plugins);
        this.props.scope.scripts = [...scripts];
        this.props.scope.pluginsKey = plugins;
        this.props.scope.resetCanvasSize = this.resetCanvasSize.bind(this);
        this.props.scope.options = { ...this.props.options };

        // 全部资源准备好了
        this.setState({ loadEnd: true });
      });
    });
  }

  /**
   * @desc 重置画布大小,切换的时候才会调用这个方法，重置 canvas的尺寸
   */
  @bindSelf
  resetCanvasSize() {
    const { data, edata } = this.props.h5ds;
    setConfig(data.type);
    transaction(() => {
      const { appWidth, appHeight } = config;
      let { width, height } = data.style;

      switch (data.type) {
        case 'pc':
          {
            width = width < appWidth ? appWidth : width;
            height = appHeight;
          }
          break;
        case 'phone':
          {
            width = width > appWidth ? appWidth : width;
            height = appHeight;
          }
          break;
        case 'horizontal-phone':
        case 'ppt':
          {
            height = appHeight;
            width = appWidth;
          }
          break;
      }
      data.style.width = width; // 子页面的宽度都会变化
      data.style.height = height; // 子页面的宽度都会变化
      [...data.pages, ...data.popups, ...data.fixeds].map(d => {
        d.style.height = height;
        d.style.width = width;
      });
      data.fixeds[0].style.height = 0;

      // 全局
      edata.pageSize.width = width;
      edata.pageSize.height = height;
    });
  }

  /**
   * @desc 初始化 app参数，只执行一次
   */
  @bindSelf
  initAppData() {
    if (this.initAppDataMark) {
      return;
    }
    this.initAppDataMark = true;

    let { h5ds } = this.props;
    let appData = this.state.data;
    // 如果参数是init_data，就是默认的数据
    if (appData === 'defaultData') {
      appData = getInitData();
    }

    console.log('appData'.appData);

    // 初始化app数据
    h5ds.initApp(appData, this.props.options.appId).then(() => {
      // 挂载plugins插件
      this.mountExtendsPlugins(this.props.plugins);
    });
  }

  componentWillUnmount() {
    $(document).off('h5ds');
    window.pubSubEditor.unsubscribeAll();
  }

  // 加载顺序。先加载数据：data，再init app, 再加载插件：plugins，在加载scripts

  render() {
    const { dataLoad, loadEnd, data } = this.state;
    let jsxdom = null;

    console.log({ dataLoad, loadEnd });

    if (dataLoad && loadEnd) {
      // 成功载入数据后
      this.initAppDataMark = false;
      jsxdom = (
        <div className="h5ds-layout-frame">
          <FrameInner {...this.props} appData={data} />
        </div>
      );
    } else if (dataLoad && !loadEnd) {
      // 数据加载OK后，初始化app数据
      this.initAppData();
      jsxdom = (
        <div className="h5ds-layout-frame">
          <LoadingBox appData={data} />
        </div>
      );
    } else {
      console.log('数据载入中...');
    }
    return jsxdom;
  }
}

export default Frame;
