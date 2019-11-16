import { config } from './config';
import { util } from '../utils';
/**
 * 新建页面的时候初始化类
 */
class Page {
  id = null;
  className = null;
  keyid = util.randomID();
  name = '未命名';
  desc = '页面描述';
  style = { height: config.appHeight, width: config.appWidth };
  layers = [];
  animate = [];
  slider = {
    autoplay: false,
    lock: false,
    time: 5
  };
}

export { Page };
