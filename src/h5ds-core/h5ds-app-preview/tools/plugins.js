import * as basicLayerComp from '../../components/layers/layer';

import { LoadSource } from './load';
import { mountPlugin } from 'h5ds-mount-plugin';

// 挂载基础插件
export async function mountBasicLayerPlugins(basicLayer = basicLayerComp) {
  [...Object.values(basicLayer)].forEach(data => {
    if (!data.config) {
      console.error('插件必须包括config文件，具体配置查看官方文档doc.h5ds.com', data);
    } else {
      // 附加属性
      for (let key in data.config) {
        data[key] = data.config[key];
      }
    }
    mountPlugin(data);
  });
}

/**
 * 挂载拓展插件，自动挂载，此方法是用于手机端的
 * @param {*} plus
 * @param {*} pluginsHost
 * @param {*} scope
 */
export async function mountExtensionPlugins(plus = [], pluginsHost = '', scope = 'layer') {
  // load插件，自动挂载，css可以忽略加载
  const loadSource = new LoadSource();
  for (let i = 0; i < plus.length; i++) {
    const pid = plus[i];
    if (pid) {
      loadSource.cssLazy(`${pluginsHost}/plugins/${pid}/${scope}/style.css`, `css_${pid}`);
    }
  }
  for (let i = 0; i < plus.length; i++) {
    const pid = plus[i];
    if (pid) {
      const src = `${pluginsHost}/plugins/${pid}/${scope}/index.js`;
      await loadSource.jsLazy(src, `js_${pid}`);
      // 进度条
      if (window.pubSubLayer) {
        window.pubSubLayer.publish('h5ds.load.plugins', {
          count: plus.length,
          index: i + 1,
          progress: (i + 1) / plus.length,
          name: src,
          type: 'plugin'
        });
      }
    }
  }
}

/**
 * 插件都挂载的前提下，加载插件
 */
export async function loadExtensionScripts() {
  // 加载第三方js
  let scripts = [];
  // 插件已经挂载了，所以可以直接使用，但是scripts资源还没加载
  const { plugins = {} } = window.H5DS_GLOBAL;
  console.log('plugins 加载完成！准备加载script >>>>>>>>>>', Object.keys(window.H5DS_GLOBAL.plugins));
  [...Object.values(plugins)].forEach(data => {
    if (!data.config) {
      console.error('插件必须包括config文件，具体配置查看官方文档doc.h5ds.com', data);
    } else {
      // 附加属性
      for (let key in data.config) {
        data[key] = data.config[key];
      }
      scripts = [...scripts, ...(data.scripts || [])];
    }
  });

  // 加载第三方插件
  scripts = Array.from(new Set(scripts)).filter(d => d);

  console.log('will load scripts:', scripts);

  const loadSource = new LoadSource();
  for (let i = 0; i < scripts.length; i++) {
    const src = scripts[i];
    await loadSource.jsLazy(src, src);
    // 进度条
    const data = {
      count: scripts.length,
      index: i + 1,
      progress: (i + 1) / scripts.length,
      name: src,
      type: 'script'
    };
    window.pubSubLayer && window.pubSubLayer.publish('h5ds.load.scripts', data);
    window.pubSubEditor && window.pubSubEditor.publish('h5ds.load.scripts', data);
  }

  // 赋值
  window.H5DS_GLOBAL.plugins = plugins;
  window.H5DS_GLOBAL.scripts = scripts;

  // load完成事件通知
  const dataEnd = {
    count: scripts.length,
    index: scripts.length,
    progress: 1,
    name: '',
    type: 'script'
  };
  window.pubSubLayer && window.pubSubLayer.publish('h5ds.load.plugins', dataEnd);
  window.pubSubEditor && window.pubSubEditor.publish('h5ds.load.plugins', dataEnd);
}

// jssdk挂载插件
export async function installPlugins(plus = [], pluginsHost = '', scope = 'layer') {
  // 基础插件
  await mountBasicLayerPlugins();

  // 扩展插件
  await mountExtensionPlugins(plus, pluginsHost, scope);

  // 挂载插件OK后，直接加载script
  await loadExtensionScripts();

  return {
    pluginsKey: window.H5DS_GLOBAL.plugins,
    scripts: window.H5DS_GLOBAL.scripts
  };
}
