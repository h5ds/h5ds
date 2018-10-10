export const data2 = {
  img: '/assets/images/app.png', // 主图
  desc: '点石H5，官方网站h5ds.com', // 描述
  name: '点石H5', // 标题名称
  loading: '1', // 加载动画
  set: {}, // 配置参数
  type: 'phone', // h5类型，还有一个参数是 pc，表示pc页面
  mp3: {
    // 音乐设置
    name: ' 10000电音冲刺游戏', // 音乐名称
    url: 'http://pic.ibaotu.com/00/23/30/17E888piCgGs.mp3' // 音乐链接
  },
  slider: {
    // 翻页设置
    animate: 1, // 翻页动画
    lock: false, // 是否取消翻页
    autoplay: false, // 是否自动翻页
    time: 5 // 自动翻页时间
  },
  style: {
    // body的样式
    width: 320,
    height: 514
  },
  popups: [], // 存放弹窗图层
  fixeds: [
    // 存放浮动层
    {
      id: null,
      name: '浮动层上',
      style: {
        height: 514
      },
      layers: []
    },
    {
      id: null,
      name: '浮动层下',
      style: {
        height: 514
      },
      layers: []
    }
  ],
  pages: [
    // 存放页面
    {
      id: null,
      eid: null,
      name: '空白页面',
      style: { height: 514 },
      layers: [], // 页面中的图层
      slider: { animate: 1, autoplay: false, lock: false, time: 5 }
    }
  ]
};
