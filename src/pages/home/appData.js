const config = {
    appWidth: 320,
    appHeight: 514
};
// 模拟数据
export const appData = {
    img: 'http://cdn.h5ds.com/static/images/img-null.png', // 主图
    desc: '点石H5，官方网站h5ds.com', // 描述
    name: '点石H5', // 标题名称
    loading: '1', // 加载动画
    set: {}, // 配置参数
    type: 'phone', // h5类型
    mp3: {
        // mp3
        name: '挺有感觉的BGM素材.mp3',
        url: 'http://cdn.h5ds.com/upload/a55f582e-73d0-4bcd-98a9-cd41d8dcf94f.mp3'
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
        width: config.appWidth,
        height: config.appHeight
    },
    fixeds: [
        // 浮动层
        {
            id: null,
            name: '浮动层上',
            style: {
                height: config.appHeight
            },
            layers: [],
            index: 0
        },
        {
            id: null,
            name: '浮动层下',
            style: {
                height: config.appHeight
            },
            layers: [],
            index: 1
        }
    ],
    popups: [],
    pages: [
        {
            id: null,
            name: '空白页面',
            desc: '页面描述',
            style: { height: config.appHeight },
            layers: [],
            animate: [],
            slider: {
                animate: 1,
                autoplay: false,
                lock: false,
                time: 5
            }
        }
    ]
};
