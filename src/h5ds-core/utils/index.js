import { csstool, toRgba } from './cssTool';

import { LoadSource } from './load';
import { WinLoad } from './winLoad';
import { appUtil } from './appUtil';
import { bezier } from './bezier';
import { bindSelf } from './bindSelf';
import { getDragEventName } from './dragHelper';
import { matrixTool } from './matrix';
import { pubsubEvent } from './pubsub';
import { rectMath } from './rectMath';
import { shortcuts } from './shortcuts';
import { util } from './util';

export {
  WinLoad,
  appUtil, // 操作app data 的方法
  shortcuts, // 快捷键
  LoadSource, // 加载资源
  bindSelf, // bind this
  pubsubEvent, // 发布订阅
  util, // 常用小工具
  rectMath, // 旋转后的框计算
  matrixTool, // 矩阵计算
  getDragEventName, // 获取事件
  toRgba, // 颜色转化工具
  csstool, // css解析工具
  bezier // 贝塞尔曲线
};

// 以下是jquery插件，需要手动载入
/**

import './utils/contextmenu.js'; // 鼠标右键插件
import './utils/control.js'; // 控制器插件
import './utils/drag.js'; // 拖动插件
import './utils/dragsort.js'; // 拖动排序插件
import './utils/help.js'; // 帮助插件
import './utils/transform.js'; // transform css插件

 */
