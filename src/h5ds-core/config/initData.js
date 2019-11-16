import { config } from './config';
import { util } from '../utils/util';
/**
 * @desc 获取初始化数据
 */
export function getInitData() {
  let type = config.appType;
  let width = config.appWidth;
  let height = config.appHeight;
  let version = config.version;
  return {
    version,
    img: 'http://cdn.h5ds.cn/static/images/img-null.png', // 主图
    desc: '点石H5，官方网站h5ds.cn', // 描述
    name: '点石H5', // 标题名称
    type, // h5类型
    slider: {
      // 翻页设置
      speed: 0.5, // 翻页动画速度
      effect: 'slide', // 翻页动画
      autoplay: false, // 是否自动翻页
      time: 5 // 自动翻页时间
    },
    style: {
      // body的样式
      width,
      height
    },
    fixeds: [
      // 浮动层
      {
        id: null,
        className: null,
        keyid: util.randomID(),
        name: '浮动层上',
        style: {
          height,
          width
        },
        layers: []
      },
      {
        id: null,
        className: null,
        keyid: util.randomID(),
        name: '浮动层下',
        style: {
          height,
          width
        },
        layers: []
      }
    ],
    popups: [],
    pages: [
      {
        id: null,
        className: null,
        keyid: util.randomID(),
        name: '空白页面',
        desc: '页面描述',
        style: {
          width,
          height
        },
        layers: [],
        slider: {
          animate: 1,
          autoplay: false,
          lock: false,
          time: 5
        }
      }
    ]
  };
}
