import { Page, config, setConfig } from '../config';
import { action, observable, toJS, transaction } from 'mobx';
import { pubsubEvent, util } from '../utils';

import { cleanLayers } from '../h5ds-app-preview/tools/cleanData';
import { message } from 'antd';

const { appHeight, appWidth } = config;

export default class App {
  @observable
  data = null; // app数据

  @observable
  edata = null; // 编辑数据 edit data 缩写

  historyIndex = 0; // 历史数据，记录的下标，从0开始
  history = []; // 历史数据

  /**
   * @desc 重新渲染 pageList
   */
  @action
  renderPageList = util.debounce(() => {
    this.edata.pageListKeys = util.randomID();
  }, 500);

  getData = (data, appId) => {
    // 获取缓存数据
    const appStoreId = util.getStorage('H5DS_APP_ID');

    // 如果没有 owner 和 appid 模拟一个
    if (!appId) {
      appId = 'h5ds_demo_appid';
    }

    // 如果有缓存， 且当前打开的 appid
    if (appId && appStoreId === appId) {
      data = util.getStorage('H5DS_APP_DATA');
    } else {
      util.setStorage('H5DS_APP_ID', appId);
    }
    return Promise.resolve(data);
    // iniApp(data, appId);
  };

  // 初始化加载数据，设置数据
  @action
  initApp = (resdata, appid) => {
    // 设置历史记录
    pubsubEvent.subscribe('h5ds.setHistory', util.debounce(this.setHistory, 300));

    // 获取数据， 渲染app
    return this.getData(resdata, appid).then(data => {
      // 设置config参数
      setConfig(data.type);
      transaction(() => {
        this.edata = {
          appid,
          animateListShow: false, // 动画列表显示隐藏控制
          eventListShow: false, // 事件列表显示隐藏控制
          banAnimate: false, // 停止动画
          canvasAnimate: util.randomID(), // 用于控制动画用的
          gridAdsorb: false, // 网格吸附
          gridSize: 5, // 网格默认宽度
          headerHeight: 60, // header 高度
          timeLineHeight: 14, // 时间轴高度
          // canvasWidth: $(window).width() - 350 - 140, // 默认画布的尺寸
          // canvasHeight: $(window).height() - 60, // 减去顶部
          pageSize: {
            width: appWidth,
            height: appHeight
          }, // 当选中前页面大小
          phoneScale: config.canvasScale || 1,
          setType: 'page', // 设置区域显示的类型，默认选择图层， app, page, layer, group
          selectType: 'pages', // 当前选中的页面类型 pages, fixeds, popups
          selectFixed: 0, // 当前选中的fixeds页面
          selectPage: 0, // 当前选中的页面
          selectPopup: 0, // 选择popup的标号
          selectLayer: null, // 当前选中的layer
          selectGroup: false, // 选择组
          keys: util.randomID(), // 设置渲染的，用于通知组件执行 render 函数，这个不会重新渲染整个phone，只是执行render
          selectlayerKeys: util.randomID(), // 重新选择layer 使用
          layerListKeys: util.randomID(), //  重新执行layerlist 的 render
          pageListKeys: util.randomID() //  重新执行pagelist列表 的 render
        };

        const { canvasHeight, canvasWidth } = this.getCanvasSize();
        this.edata.canvasHeight = canvasHeight;
        this.edata.canvasWidth = canvasWidth;

        this.data = this.addSet(data);
        this.setHistory();
      });
    });
  };

  // 设置控制器的锁定功能
  @action
  setControlLockWideHigh = lock => {
    const $layer = this.getLayerDom();
    const $control = $layer.find('.h5ds-control');
    if ($control[0]) {
      $control.find('.h5ds-control-top').css('display', lock ? 'none' : 'block');
      $control.find('.h5ds-control-left').css('display', lock ? 'none' : 'block');
      $control.find('.h5ds-control-bottom').css('display', lock ? 'none' : 'block');
      $control.find('.h5ds-control-right').css('display', lock ? 'none' : 'block');
    }
  };

  /**
   * @desc 重新更新canvas
   */
  @action
  updateCanvas = () => {
    this.edata.keys = util.randomID();
  };

  /**
   * @desc 异步更新canvas
   */
  @action
  updateCanvasAsync = util.debounce(() => {
    this.updateCanvas();
  });

  /**
   * @desc 通过pid获取数据, arg 是构造函数传入的参数
   */
  getJsonByPid(pluginsKey, pid, ...arg) {
    const { LayerJSON, config } = pluginsKey[pid];
    const data = { ...new LayerJSON(...arg), ...config };
    return this.originLayerSet(data);
  }

  /**
   * @desc 格式化page数据
   */
  @action
  formatPageData = data => {
    data.keyid = util.randomID();
    if (!data.style.width) {
      data.style.width = config.appWidth;
    }
    if (!data.style.height) {
      data.style.height = config.appHeight;
    }
    cleanLayers(data.layers);
    data.layers.forEach(d => {
      d.keyid = util.randomID();
    });
    return data;
  };

  /**
   * @desc 格式化 layer 数据
   */
  @action
  formatLayerData = data => {
    data.keyid = util.randomID();
    data = cleanLayers([data]);
    return data[0];
  };

  /**
   * @desc 复制页面数据
   */
  @action
  toJS = newObj => {
    let data = null;
    try {
      data = JSON.parse(JSON.stringify(newObj));
    } catch (e) {
      console.error('数据转化错误');
      return;
    }
    return data;
  };

  /**
   * @desc 添加设置数据
   */
  @action
  addSet = data => {
    const { pages, fixeds, popups } = data;
    [...pages, ...popups, ...fixeds].forEach(page => {
      if (!page.keyid) {
        page.keyid = util.randomID();
      }
      page.layers.forEach(layer => {
        this.originLayerSet(layer);
      });
    });
    return data;
  };

  /**
   * @desc 禁用动画
   */
  @action
  banAnimate = () => {
    pubsubEvent.publish('h5ds.destoryControl');
    this.edata.banAnimate = true;
    $('#h5dsCanvas')
      .find('audio')
      .each(function() {
        this.pause();
      });
  };

  /**
   * @desc 播放动画
   */
  @action
  playAnimate = () => {
    pubsubEvent.publish('h5ds.destoryControl');
    transaction(() => {
      this.edata.banAnimate = false;
      this.edata.canvasAnimate = util.randomID();
    });
  };

  @action
  setLayerId = layer => {
    if (layer.id) {
      layer.id = 'ID_' + util.randomID();
    }
    layer.keyid = util.randomID();
    return layer;
  };

  /**
   * @desc 原始数据过滤，强制更新数据
   */
  @action
  originLayerSet = (layer, clone = false) => {
    if (!layer.keyid) {
      layer.keyid = util.randomID();
    }

    if (layer.className === undefined) {
      layer.className = '';
    }
    // console.log('layer.keyid > ', layer.keyid);
    if (layer.set === undefined) {
      layer.set = {};
    }
    // 全部可见
    layer.set.hide = false;
    if (layer.set.lock === undefined) {
      layer.set.lock = false;
    }
    // 如果是clone的，eid，和 id 都会变
    if (clone) {
      this.setLayerId(layer);
    }
    return layer;
  };

  @action
  setCanvasSize = () => {
    // 计算canvas的高度
    const { canvasHeight, canvasWidth } = this.getCanvasSize();
    console.log('视图发生变化', { ...this.edata.pageSize });
    transaction(() => {
      this.edata.canvasWidth = canvasWidth;
      this.edata.canvasHeight = canvasHeight;
    });
  };

  /**
   * 获取canvas区域的尺寸，包含滚动条内部的高度，此方法在初始化之前即可获取到
   */
  getCanvasSize = () => {
    const { headerHeight, timeLineHeight } = this.edata;
    let canvasHeight = $(window).height() - headerHeight - timeLineHeight; // 画布高度减去时间轴和顶部高度
    let canvasWidth = $(window).width() - 350 - 140;
    if (canvasWidth < 0) {
      canvasWidth = 0;
    }
    if (canvasHeight < 0) {
      canvasHeight = 0;
    }
    return {
      canvasWidth,
      canvasHeight
    };
  };

  @action
  setType = type => {
    this.edata.setType = type;
  };

  // 设置style
  @action
  setLayerStyle = style => {
    this.getLayer().style = style;
  };

  // 获取pageNum
  @action
  getPageNum = () => {
    let { selectPage, selectPopup, selectFixed, selectType } = this.edata;
    let pageNum = null;
    switch (selectType) {
      case 'pages':
        pageNum = selectPage;
        break;
      case 'fixeds':
        pageNum = selectFixed;
        break;
      case 'popups':
        pageNum = selectPopup;
        break;
    }
    return pageNum;
  };

  // 获取当前的page
  @action
  getPage = (type, index) => {
    // let { pages, fixeds, popups } = this.data;
    let { selectPage, selectPopup, selectFixed, selectType } = this.edata;
    let pageType = type ? type : selectType;
    let pageNum = null;
    switch (pageType) {
      case 'pages':
        pageNum = util.isEmpty(index) ? selectPage : index;
        break;
      case 'fixeds':
        pageNum = util.isEmpty(index) ? selectFixed : index;
        break;
      case 'popups':
        pageNum = util.isEmpty(index) ? selectPopup : index;
        break;
    }
    let page = this.data[pageType][pageNum] || null;
    // console.log('获取page => ', page, pageType, pageNum);
    return page;
  };

  // 获取当前的pages
  @action
  getPages = selectType => {
    if (!selectType) {
      selectType = this.edata.selectType;
    }
    let pages = this.data[selectType] || [];
    return pages;
  };

  // 获取当前page的layers
  @action
  getLayers = () => {
    let page = this.getPage();
    let layers = null;
    if (page) {
      layers = page.layers;
    } else {
      console.warn('page 不存在!');
    }
    return layers;
  };

  // 获取当前layer
  @action
  getLayer = () => {
    let layers = this.getLayers();
    let { selectLayer } = this.edata;
    let layer = null;
    if (selectLayer === null) {
      console.warn('还未选择任何图层');
      return;
    }
    if (layers) {
      layer = layers[selectLayer];
    }
    return layer;
  };

  // 添加layer, 如果index 存在，则插入制定位置，如果不存在，插入到最后
  @action
  addLayer = (data, index) => {
    let page = this.getPage();
    if (!page) {
      message.error('未选择任何页面！');
      return;
    }
    transaction(() => {
      this.originLayerSet(data);
      if (util.isEmpty(index)) {
        page.layers.unshift(data);
      } else {
        page.layers.splice(index, 0, data);
      }
      this.edata.layerListKeys = util.randomID();
    });
  };

  // 插入多个layer，拆分combin 的时候用。size是外框的尺寸。index 表示要插入的位置
  @action
  addLayers = (layers, index, size) => {
    let page = this.getPage();
    transaction(() => {
      layers.forEach(layer => {
        this.originLayerSet(layer);
        layer.style.left += size.left;
        layer.style.top += size.top;
        page.layers.splice(index, 0, layer);
      });
      this.delLayer(index + layers.length);
      this.edata.layerListKeys = util.randomID();
    });
  };

  // 获取page 的dom
  @action
  getPageDom = type => {
    let { selectType, selectFixed } = this.edata;
    let $page = null;
    if (type) {
      // 强行设置
      selectType = type;
    }
    switch (selectType) {
      case 'popups':
        $page = $('#h5dsPageViewPopup');
        break;
      case 'fixeds':
        {
          switch (selectFixed) {
            case 0:
              $page = $('#h5dsPageViewFixedUp');
              break;
            case 1:
              $page = $('#h5dsPageViewFixedDown');
              break;
          }
        }
        break;
      case 'pages':
        $page = $('#h5dsPageView');
        break;
    }
    return $page;
  };

  // 获取page 所有的 layers dom
  @action
  getPageLayerDom = index => {
    const $page = this.getPageDom();
    const $layers = $page
      .children('.h5ds-swiper-layers-box')
      .children('.h5ds-swiper-layers')
      .children('.layer'); // ('.h5ds-swiper-layers > .layer');
    return util.isEmpty(index) ? $layers : $layers.eq(index);
  };

  // 获取 layer 的 dom
  @action
  getLayerDom = index => {
    let { selectLayer } = this.edata;
    if (!util.isEmpty(index)) {
      selectLayer = index;
    }
    if (!util.isEmpty(selectLayer)) {
      return this.getPageLayerDom().eq(selectLayer);
    } else {
      return null;
    }
  };

  // 获取 layer 组数组
  @action
  getGroups = () => {
    const arr = [];
    const layers = this.getLayers();
    if (this.edata.selectGroup) {
      this.edata.selectGroup.forEach(num => {
        arr.push({
          key: num,
          layer: layers[num]
        });
      });
    }
    return arr.sort((a, b) => {
      return a.key - b.key;
    });
  };

  // 删除layer
  @action
  delLayer = index => {
    let { selectLayer } = this.edata;
    let layers = this.getLayers();
    transaction(() => {
      layers.splice(util.isEmpty(index) ? selectLayer : index, 1);
      this.edata.selectLayer = null;
      this.edata.keys = util.randomID();
      this.setPage();
      pubsubEvent.publish('h5ds.destoryControl');
    });
  };

  // 获取 layer
  getLayerData = index => {
    let { selectLayer } = this.edata;
    let layers = this.getLayers();
    index = util.isEmpty(index) ? selectLayer : index;
    let data = toJS(layers[index]);
    return this.originLayerSet(data, true);
  };

  // 删除一组layer
  @action
  delGroupLayer = callback => {
    let { selectGroup } = this.edata;
    if (selectGroup) {
      transaction(() => {
        let page = this.getPage();
        page.layers = page.layers.filter((d, index) => {
          return selectGroup.indexOf(index) === -1;
        });
        callback && callback(page.layers.length);
        this.edata.selectGroup = false;
        this.edata.keys = util.randomID();
        this.edata.layerListKeys = util.randomID();
        pubsubEvent.publish('h5ds.destoryControl');
      });
    } else {
      message.error('请选择多个图层！');
    }
  };

  // 设置选中页面, 切换page 的时候，layer选中0
  @action
  setPage = (index, type) => {
    console.log('setPage', index, type);
    if (util.isEmpty(index)) {
      index = this.getPageNum();
    }
    console.log('setPage', index, type);
    if (!type) {
      type = this.edata.selectType;
    }

    transaction(() => {
      this.edata.selectType = type;
      switch (type) {
        case 'popups':
          {
            if (this.data.popups.length === 0) {
              this.edata.selectPopup = null;
            } else {
              this.edata.selectPopup = index;
            }
          }
          break;
        case 'pages':
          {
            if (this.data.pages.length === 0) {
              this.edata.selectPage = null;
            } else {
              this.edata.selectPage = index;
            }
          }
          break;
        case 'fixeds':
          this.edata.selectFixed = index;
          break;
      }
      this.edata.selectLayer = null;
      this.edata.pageListKeys = util.randomID();
      this.setType('page');
    });
  };

  // 选中第一个
  @action
  clickLayer = (index = 0) => {
    $('#h5dsLayerList')
      .find('li')
      .eq(index)
      .trigger('click');
  };

  // 设置选中页面, 切换page 的时候，layer选中0
  @action
  setLayer = index => {
    console.log('setLayer', index);

    setTimeout(() => {
      transaction(() => {
        this.edata.selectlayerKeys = util.randomID();
        this.edata.setType = 'layer';
        this.edata.selectLayer = index;
        this.setType('layer');
      });
      pubsubEvent.publish('h5ds.initControl');
      pubsubEvent.publish('h5ds.setHistory');
    }, 0);
  };

  // 交换page数组位置
  @action
  exChangePage = (i, j) => {
    let pages = this.getPages();
    transaction(() => {
      new Array(Math.abs(i - j)).fill(1).forEach(() => {
        // 从上往下
        if (i < j) {
          [pages[i], pages[i + 1]] = [pages[i + 1], pages[i]];
          i++;
        } else {
          [pages[i - 1], pages[i]] = [pages[i], pages[i - 1]];
          i--;
        }
      });
      let { selectType } = this.edata;
      switch (selectType) {
        case 'popups':
          this.edata.selectPopup = j;
          break;
        case 'fixeds':
          this.edata.selectFixed = j;
          break;
        case 'pages':
          this.edata.selectPage = j;
          break;
      }
      this.edata.pageListKeys = util.randomID();
    });
  };

  // layer数组重新排序 从 i -> j
  @action
  exChangeLayer = (i, j) => {
    // 检查合法性
    if (i < 0 || j < 0) {
      console.error('交换数据错误 i -> j', i, j);
      return false;
    }

    let layers = this.getLayers();
    transaction(() => {
      // 往下， 比如从 0 -> 2 ( 1 -> 0, 2 -> 1, 0 -> 2)  (0,1,2 -> 1,2,0)
      new Array(Math.abs(i - j)).fill(1).forEach(() => {
        console.log('交换 i -> j', i, j);
        // 从上往下
        if (i < j) {
          [layers[i], layers[i + 1]] = [layers[i + 1], layers[i]];
          i++;
        } else {
          [layers[i - 1], layers[i]] = [layers[i], layers[i - 1]];
          i--;
        }
      });
      this.edata.selectLayer = j;
      this.edata.keys = util.randomID();
      this.edata.layerListKeys = util.randomID();
    });
  };

  // 删除page
  @action
  delPage = index => {
    let { selectType, selectPage, selectPopup, selectFixed } = this.edata;
    transaction(() => {
      let pages = this.data[selectType];
      switch (selectType) {
        case 'popups':
          {
            index = util.isEmpty(index) ? selectPopup : index;
            pages.splice(index, 1);
            this.edata.selectPopup = null;
          }
          break;
        case 'pages':
          {
            index = util.isEmpty(index) ? selectPage : index;
            pages.splice(index, 1);
            this.edata.selectPage = null;
          }
          break;
        case 'fixeds':
          {
            index = util.isEmpty(index) ? selectFixed : index;
            pages.splice(index, 1);
            this.edata.selectFixed = null;
          }
          break;
      }
      this.edata.pageListKeys = util.randomID();
    });
  };

  @action
  getNullPage = () => {
    return new Page();
  };

  // 添加page
  @action
  addPage = (obj, index) => {
    // 不能添加浮动层
    if (this.edata.selectType === 'fixeds') {
      message.warn('不能添加浮动层');
      return false;
    }

    // 如果obj不存在
    if (!obj) {
      console.error('此方法必须传入参数！');
      return false;
    }
    let pages = this.getPages();
    transaction(() => {
      let key = null;
      switch (this.edata.selectType) {
        case 'pages':
          key = 'selectPage';
          break;
        case 'fixeds':
          key = 'selectFixed';
          break;
        case 'popups':
          key = 'selectPopup';
          break;
      }
      obj.keyid = util.randomID();
      let selectNum = this.edata[key]; // 当前选中的pageNum
      if (index) {
        selectNum = index;
      }
      pages.splice(selectNum + 1, 0, { ...obj }); // 在其后插入数据
      this.edata[key] = selectNum + 1; // 切换到插入的页面
      this.edata.selectLayer = null;
      this.edata.keys = util.randomID();
      this.edata.pageListKeys = util.randomID();
    });
  };

  // 复制page
  @action
  copyPage = index => {
    let { selectType, selectPage } = this.edata;
    let selectNum = this.getPageNum();
    let data = this.data[selectType][index || selectNum];
    data = this.toJS(data);
    transaction(() => {
      data.keyid = util.randomID();
      data.id = null;
      data.layers.map(d => {
        return this.originLayerSet(d, true);
      });
      this.data[selectType].splice(index || selectPage, 0, data);
    });
  };

  // 复制layer
  @action
  copyLayer = index => {
    let { selectType, selectLayer } = this.edata;
    let selectNum = this.getPageNum();
    if (selectLayer === null && index === undefined) {
      message.error('请先选择一个图层进行复制！');
      return;
    }
    index === undefined ? (index = selectLayer) : null;
    let data = this.data[selectType][selectNum].layers[index];
    transaction(() => {
      let layers = this.data[selectType][selectNum].layers;
      let d = this.toJS(data);
      d.keyid = util.randomID();
      // 格式化copy的数据
      this.originLayerSet(d, true);
      layers.splice(index, 0, d);
    });
  };

  // 复制动画
  @action
  copyAnimate = () => {
    const layer = this.getLayer();
    if (layer) {
      message.success('复制动画成功！');
      this.copyAnimateData = this.toJS(layer.animate);
    } else {
      console.error('没有选择任何layer');
    }
  };

  // 粘贴动画
  @action
  pasteAnimate = () => {
    const layer = this.getLayer();
    transaction(() => {
      if (this.copyAnimateData[0] && this.copyAnimateData[0].type === 'in') {
        layer.estyle.opacity = 0;
      }
      layer.animate = this.toJS(this.copyAnimateData);
      message.success('粘贴动画成功！');
    });
  };

  // 还原历史记录
  @action
  doHistory = type => {
    console.log('还原历史记录 > 游标', this.historyIndex, this.history.length);
    if (this.historyIndex >= 0) {
      if (type === 'undo') {
        this.historyIndex--;
        if (this.historyIndex < 0) {
          this.historyIndex = 0;
        }
      } else {
        this.historyIndex++;
        if (this.historyIndex > this.history.length) {
          this.historyIndex = this.history.length - 1;
        }
      }
      let { data, edata } = this.history[this.historyIndex] || {};
      if (data) {
        transaction(() => {
          this.data = JSON.parse(data);
          edata = JSON.parse(edata);
          for (let key in edata) {
            this.edata[key] = edata[key];
          }
        });
      }
    }
  };

  // 异步，防抖设置历史数据
  @action
  setHistoryAsync = util.debounce(info => {
    this.setHistory(info);
  }, 300);

  // 设置历史数据
  @action
  setHistory = (info = '') => {
    console.log('history 记录， 游标', this.historyIndex, this.history.length);
    transaction(() => {
      // 下标如果不是最后一个，删除后面的，重新记录
      if (this.history.length !== this.historyIndex + 1) {
        this.history.splice(this.history.length - 1 - this.historyIndex, this.history.length - 1);
      }
      let all = {
        data: JSON.stringify(this.data),
        edata: JSON.stringify(this.edata),
        info
      };
      // 记录操作
      this.history.push(all);

      // 最多记录20次，太多会内存溢出
      if (this.history.length > 20) {
        this.history.shift();
      }

      // 重置游标
      this.historyIndex = this.history.length - 1;
    });

    // 每次操作后，间隔5秒做一次本地缓存
    this.saveToStore();
  };

  /**
   * @desc 每隔3秒，数据缓存到store
   */
  saveToStore = util.debounce(() => {
    // 设置本地缓存
    console.log('本地缓存');
    const { data, edata } = this.history[this.history.length - 1];
    util.setStorage('H5DS_APP_DATA', data);
    util.setStorage('H5DS_APP_EDATA', edata);
  }, 3000);
}
