import { config } from '../../config';

export function cleanLayers(layers) {
  layers.map(layer => {
    switch (layer.type) {
      case 'img':
        {
          layer.pid = 'h5ds_img';
          layer.name = '图片';
          layer.version = '1.0.0';
          const { crop, src } = layer.data;
          layer.data = {
            naturalWidth: 200,
            naturalHeight: 150,
            crop,
            src
          };
        }
        break;
      case 'etext':
        {
          layer.pid = 'h5ds_text';
          layer.name = '文本';
          layer.version = '1.0.0';
        }
        break;
      case 'map':
        {
          layer.pid = 'h5ds-map';
          layer.name = '地图';
          layer.version = '1.0.0';
          layer.data.title = layer.data.name;
          delete layer.data.infoshow;
          delete layer.data.info;
        }
        break;
      case 'shape':
        {
          layer.pid = 'h5ds_shape';
          layer.name = '形状';
        }
        break;
      case 'input':
      case 'submit':
        {
          let fill = layer.estyle.backgroundColor;
          layer.pid = 'h5ds_shape';
          layer.name = '形状';
          layer.estyle = {};
          layer.version = '1.0.0';
          layer.data = {
            shape: 'path4',
            style: { fill },
            transform: 'scale(1, 1)'
          };
        }
        break;
      case 'sound':
        {
          layer.pid = 'h5ds_sound';
          layer.name = '音频';
          layer.data.icon = '';
          layer.version = '1.0.0';
          layer.data.autoplay = true;
          layer.data.loop = false;
        }
        break;
      case 'effectcss':
        {
          layer.pid = 'h5ds-css-effect';
          layer.name = 'css特效';
          layer.version = '1.0.0';
          layer.data = {
            type: 'snow',
            set: {
              img: 'http://cdn.h5ds.com/static/images/snow.png'
            }
          };
        }
        break;
      case 'combin':
        {
          layer.pid = 'h5ds_combin';
          layer.name = '合并层';
          if (layer.layers) {
            layer.version = '1.0.0';
            layer.events = [];
            layer.data = layer.layers;
            delete layer.layers;
            delete layer.color;
            delete layer.eid;
            cleanLayers(layer.data);
          }
        }
        break;
    }

    // 特殊情况
    if (layer.name === '形状') {
      layer.pid = 'h5ds_shape';
    }

    layer.version = '1.0.0';
    layer.events = [];
    // delete layer.type;
    delete layer.color;
    delete layer.eid;
    return layer;
  });

  return layers;
}

/**
 * 清洗数据
 */
export function cleanData(data) {
  if (data === 'defaultData') {
    return data;
  }

  switch (`${data.version}>${config.version}`) {
    case 'undefined>5.0.0':
      // case '5.0.0>5.0.0':
      data = cleanDataUndefinedToV5(data);
      break;
  }
  return data;
}

function cleanDataUndefinedToV5(data) {
  data.version = config.version;
  data.slider = {
    // 翻页设置
    speed: 0.5, // 翻页动画速度
    effect: 'slide', // 翻页动画
    autoplay: false, // 是否自动翻页
    time: 5 // 自动翻页时间
  };

  delete data.mp3;

  const setSize = target => {
    if (!target.style) {
      target.style = {};
    }
    if (data.type === 'phone') {
      if (!target.style.width) {
        target.style.width = 320;
      }
      if (!target.style.height) {
        target.style.height = 514;
      }
    } else {
      if (!target.style.width) {
        target.style.width = 600;
      }
      if (!target.style.height) {
        target.style.height = 800;
      }
    }
  };

  // 全局样式
  setSize(data);

  [...data.fixeds, ...data.popups, ...data.pages].forEach(page => {
    setSize(page);
    cleanLayers(page.layers);
  });

  return JSON.parse(JSON.stringify(data));
}
