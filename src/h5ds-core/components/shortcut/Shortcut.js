import './shortcut.less';

import React, { Component } from 'react';
import { appUtil, bindSelf, csstool, rectMath, util } from '../../utils';
import { dragGroupEvent, setGroupControl } from '../layer-group';
import { inject, observer } from 'mobx-react';
import { toJS, transaction } from 'mobx';

import ContextMenu from './contextmenu';
import GridSet from './grid-set';
import { Page } from '../../config';
import ShortcutInfo from './shortcut-info';
import { combin } from '../layers';
import domtoimage from 'dom-to-image';
import { message } from 'antd';

@inject('h5ds', 'scope')
@observer
class Shortcut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true
    };
  }

  /**
   * 放大，缩小 控制
   * @param {string} type add/del
   */
  @bindSelf
  setScale(type) {
    let style = $('.h5ds-canvas-box').attr('style');
    let scale = csstool.getTransformVal(style, 'scale');
    if (type === 'add') {
      scale += 0.1;
    } else {
      scale -= 0.1;
    }
    if (scale > 3) {
      scale = 3;
    }
    if (scale < 0.4) {
      scale = 0.4;
    }
    this.props.h5ds.edata.phoneScale = scale.toFixed(1);
  }

  /**
   * 保存当前页面
   */
  @bindSelf
  async savePage() {
    let page = this.props.h5ds.getPage();
    const { savePage } = this.props.scope.options;
    const plugins = appUtil.getPidByPageData(page);
    try {
      const url = await this.getPageImage();
      savePage({
        plugins,
        createTime: +new Date(),
        name: page.name,
        data: toJS(page),
        url
      });
    } catch (e) {
      console.error(e);
      message.error('保存页面失败！请配置props.savePage，且必须返回一个Promise对象');
    }
  }

  /**
   * 撤销
   */
  @bindSelf
  undo() {
    this.props.h5ds.doHistory('undo');
  }

  /**
   * 回退
   */
  @bindSelf
  redo() {
    this.props.h5ds.doHistory('redo');
  }

  /**
   * 粘贴图层
   */
  @bindSelf
  pasteLayer() {
    const { getLayers, setLayer, edata, getPageDom, getPageLayerDom, originLayerSet } = this.props.h5ds;
    let layers = getLayers();
    if (window.H5DS_COPY_DATA) {
      try {
        window.pubSubEditor.publish('h5ds.destoryControl');
        const { type, data } = JSON.parse(window.H5DS_COPY_DATA);
        if (type === 'layer') {
          // 粘贴单独的图层
          // data.style.top += 10;
          // data.style.left += 10;
          transaction(() => {
            originLayerSet(data, true);
            layers.unshift(data);
            setLayer(0);
            edata.keys = util.randomID();
            setTimeout(() => {
              window.pubSubEditor.publish('h5ds.initControl');
            });
          });
        } else if (type === 'group') {
          // 粘贴组
          transaction(() => {
            let arr = [];
            for (let i = data.length - 1; i >= 0; i--) {
              arr.push(data.length - 1 - i);
              let layer = JSON.parse(unescape(data[i]));
              // layer.style.top += 10;
              // layer.style.left += 10;
              originLayerSet(layer, true);
              layers.unshift(layer);
            }
            edata.setType = 'group';
            edata.selectGroup = arr;
            edata.keys = util.randomID();

            // 重新执行拖动方法
            dragGroupEvent(getLayers, getPageLayerDom, edata);
            if (!edata.selectGroup) {
              message.error('组的选择已经取消！');
              return;
            }
            setGroupControl(getPageDom, edata.selectGroup);
          });
        } else {
          message.error('复制出现未知错误！');
        }
        window.pubSubEditor.publish('h5ds.setHistory');
      } catch (e) {
        message.error('复制数据错误');
      }
    } else {
      message.error('请先复制图层');
    }
  }

  /**
   * 复制图层
   */
  @bindSelf
  copyLayer() {
    const { getLayers, getLayer, edata } = this.props.h5ds;
    if (util.isEmpty(edata.selectLayer)) {
      // 如果选中的是组合
      if (edata.selectGroup) {
        // 复制组
        transaction(async () => {
          let layers = getLayers();
          let groups = [];
          edata.selectGroup.forEach(num => {
            groups.push(escape(JSON.stringify(layers[num])));
          });
          window.H5DS_COPY_DATA = JSON.stringify({
            type: 'group',
            data: groups
          });
          message.success('已复制多个图层');
          window.pubSubEditor.publish('h5ds.setHistory');
        });
      } else {
        message.error('请先选择图层！');
      }
    } else {
      // 如果是复制的图层
      const layer = getLayer();
      window.H5DS_COPY_DATA = JSON.stringify({
        type: 'layer',
        data: layer
      });
      message.success('已复制一个图层');
    }
  }

  /**
   * 删除图层
   */
  @bindSelf
  delLayer() {
    const { delLayer, edata, delGroupLayer } = this.props.h5ds;
    if (util.isEmpty(edata.selectLayer)) {
      // 如果选中的是组合
      if (edata.selectGroup) {
        // 删除组
        transaction(() => {
          delGroupLayer();
          window.pubSubEditor.publish('h5ds.setHistory');
        });
      } else {
        message.error('请先选择图层！');
      }
    } else {
      transaction(() => {
        delLayer(edata.selectLayer);
        window.pubSubEditor.publish('h5ds.setHistory');
      });
    }
  }

  /**
   * 合并图层
   */
  @bindSelf
  combinLayers() {
    const { edata, getGroups, addLayer, delGroupLayer, setLayerId } = this.props.h5ds;
    if (!edata.selectGroup) {
      message.warn('请先选择一组图层！');
      return;
    }
    let arr = [];
    let tops = [],
      lefts = [],
      indexs = [];
    getGroups().forEach(elem => {
      let size = rectMath.rectParamObj(toJS(elem.layer));
      console.log('?????', size);
      indexs.push(elem.key);
      tops.push(size.top);
      tops.push(size.top + size.boxHeight);
      lefts.push(size.left);
      lefts.push(size.left + size.boxWidth);
      arr.push(setLayerId(toJS(elem.layer))); // 重新设置keyid， 和 id
    });
    let top = Math.min(...tops);
    let left = Math.min(...lefts);
    let width = Math.max(...lefts) - left,
      height = Math.max(...tops) - top;

    // 重新设置下子layer 的left 和 top
    arr.forEach(elem => {
      elem.style.left -= left;
      elem.style.top -= top;
    });

    const combinData = { ...combin.config, ...new combin.LayerJSON() };
    combinData.keyid = util.randomID();
    combinData.style.top = top;
    combinData.style.left = left;
    combinData.originstyle.width = width;
    combinData.originstyle.height = height;
    combinData.style.width = width;
    combinData.style.height = height;
    combinData.data = arr;
    transaction(() => {
      let mIndex = Math.min(...indexs);
      // 删除合并前的 layer
      delGroupLayer();
      addLayer(combinData, mIndex);
      edata.keys = util.randomID();
      window.pubSubEditor.publish('h5ds.destoryControl');
      window.pubSubEditor.publish('h5ds.setHistory');
      setTimeout(() => {
        $('.h5ds-js-layerlist')
          .find('.h5ds-js-layerlist-item')
          .eq(mIndex)
          .trigger('click');
      });
    });
  }

  /**
   * 取消合并
   */
  @bindSelf
  uncombin() {
    const { getLayer, addLayers, edata } = this.props.h5ds;
    const layer = getLayer();
    let index = edata.selectLayer;
    addLayers(layer.data.reverse(), index, rectMath.rectParamObj(layer));
    window.pubSubEditor.publish('h5ds.destoryControl');
    window.pubSubEditor.publish('h5ds.setHistory');
  }

  /**
   * 添加页面操作，如果有模版，弹出模版列表，否则添加一个空白页面
   */
  @bindSelf
  addPage() {
    const { template } = this.props.scope.options;
    if (template) {
      window.pubSubEditor.publish('h5ds.showPageTpls');
    } else {
      window.pubSubEditor.publish('h5ds.destoryControl');
      const page = new Page();
      this.props.h5ds.addPage(page);
      window.pubSubEditor.publish('h5ds.setHistory');
    }
  }

  @bindSelf
  async getPageImage() {
    const page = this.props.h5ds.getPage();
    const { type } = this.props.h5ds.data;
    let width, height, scale;
    if (type === 'phone') {
      width = page.style.width * 2 || 640;
      height = page.style.height * 2 || 1028;
      scale = 2;
    } else {
      width = page.style.width || 1000;
      height = page.style.height || 600;
      scale = 1;
    }
    return domtoimage.toPng(document.getElementById('h5dsCanvasApp'), {
      width,
      height,
      cacheBust: true,
      style: {
        'transform-origin': '0 0',
        transform: `scale(${scale})`,
        background: '#fff'
      },
      filter: node => {
        const exclass = ['h5ds-grid-box h5ds-js-grid', 'h5ds-setpage-height', 'h5ds-setpage-width', 'h5ds-control'];
        return exclass.indexOf(node.className) === -1;
      }
    });
  }

  /**
   * 把页面存为图片，保存页面的时候进行的操作
   */
  @bindSelf
  async saveToImage() {
    const dataUrl = await this.getPageImage();
    console.log('dataUrl', dataUrl)
    const link = document.createElement('a');
    link.download = `h5ds_${util.randomID()}.png`; // ...
    link.href = dataUrl;
    link.click();
  }

  /**
   * 折叠面板
   */
  @bindSelf
  showList() {
    let { show } = this.state;
    show = !show;
    this.setState({ show });
  }

  componentDidMount() {
    // ctrl+z 撤销
    window.pubSubEditor.subscribe('h5ds.shortcuts_undo', () => {
      this.undo();
    });

    // ctrl+g 合并图层
    window.pubSubEditor.subscribe('h5ds.shortcuts_combin', () => {
      this.combinLayers();
    });

    // ctrl+y 恢复
    window.pubSubEditor.subscribe('h5ds.shortcuts_redo', () => {
      this.redo();
    });

    // ctrl+ - 缩小画布
    window.pubSubEditor.subscribe('h5ds.shortcuts_tomin', () => {
      this.setScale('del');
    });

    // ctrl+ + 放大画布
    window.pubSubEditor.subscribe('h5ds.shortcuts_tomax', () => {
      this.setScale('add');
    });

    // // ctrl+ h 显示网格
    // window.pubSubEditor.subscribe('h5ds.shortcuts_grid', () => {
    //   this.showGrid();
    // });

    // 复制图层 ctrl + c
    window.pubSubEditor.subscribe('h5ds.shortcuts_copylayer', () => {
      this.copyLayer();
    });

    // ctrl+ v 粘贴
    window.pubSubEditor.subscribe('h5ds.shortcuts_pastelayer', () => {
      this.pasteLayer();
    });

    // 删除选中的图层
    window.pubSubEditor.subscribe('h5ds.shortcuts_dellayer', () => {
      this.delLayer();
    });

    // 取消合并 ctrl + u
    window.pubSubEditor.subscribe('h5ds.shortcuts_uncombin', () => {
      this.uncombin();
    });
  }

  componentWillUnmount() {
    window.pubSubEditor.unsubscribe('h5ds.shortcuts_redo');
    window.pubSubEditor.unsubscribe('h5ds.shortcuts_copylayer');
    window.pubSubEditor.unsubscribe('h5ds.shortcuts_pastelayer');
    window.pubSubEditor.unsubscribe('h5ds.shortcuts_undo');
    window.pubSubEditor.unsubscribe('h5ds.shortcuts_tomin');
    window.pubSubEditor.unsubscribe('h5ds.shortcuts_combin');
    window.pubSubEditor.unsubscribe('h5ds.shortcuts_uncombin');
    window.pubSubEditor.unsubscribe('h5ds.shortcuts_tomax');
    window.pubSubEditor.unsubscribe('h5ds.shortcuts_grid');
    window.pubSubEditor.unsubscribe('h5ds.shortcuts_dellayer');
  }

  render() {
    return (
      <div className="h5ds-shortcut h5ds-js-shortcut h5ds-drag" data-dragset='{"limit":true}'>
        <ContextMenu combinLayers={this.combinLayers} uncombin={this.uncombin} pasteLayer={this.pasteLayer} copyLayer={this.copyLayer} />
        <h5>
          <i className="h5ds-ico h5ds-ico-caidan" /> 快捷按钮
          <a onClick={this.showList}>
            <i className="h5ds-ico h5ds-ico-a1down" />
          </a>
        </h5>
        <div style={{ display: this.state.show ? 'block' : 'none' }}>
          <div>
            <ul>
              <li
                onClick={() => {
                  window.pubSubEditor.publish('h5ds.playAnimate');
                }}
              >
                <a>
                  <i className="h5ds-ico h5ds-ico-bofang" />
                </a>
                <span>播放动画</span>
              </li>
              <li onClick={this.props.h5ds.banAnimate}>
                <a>
                  <i className="h5ds-ico h5ds-ico-zanting1" />
                </a>
                <span>禁用动画</span>
              </li>
              <li onClick={this.saveToImage}>
                <a>
                  <i className="h5ds-ico h5ds-ico-beijing" />
                </a>
                <span>存为图片</span>
              </li>
              <li>
                <GridSet />
              </li>
              <li className="h5ds-js-savepage" onClick={this.savePage}>
                <a>
                  <i className="h5ds-ico h5ds-ico-shoucang" />
                </a>
                <span>收藏页面</span>
              </li>
            </ul>
          </div>
          <div className="h5ds-shortcut-bottom-btns">
            <ul>
              <li onClick={this.undo}>
                <a>
                  <i className="h5ds-ico h5ds-ico-chexiao2" />
                </a>
                <span>撤销</span>
              </li>
              <li onClick={this.redo}>
                <a>
                  <i className="h5ds-ico h5ds-ico-chexiao1" />
                </a>
                <span>前进</span>
              </li>
              <li onClick={() => this.setScale('add')}>
                <a>
                  <i className="h5ds-ico h5ds-ico-fangda" />
                </a>
                <span>放大画布</span>
              </li>
              <li onClick={() => this.setScale('del')}>
                <a>
                  <i className="h5ds-ico h5ds-ico-suoxiao" />
                </a>
                <span>缩小画布</span>
              </li>
              <li>
                <ShortcutInfo />
              </li>
              <li onClick={this.addPage}>
                <a className="h5ds-shortcut-add">
                  <i className="h5ds-ico h5ds-ico-jia1" />
                </a>
                <span>添加页面</span>
              </li>
              <li>
                <span>缩放比：{this.props.h5ds.edata.phoneScale}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Shortcut;
