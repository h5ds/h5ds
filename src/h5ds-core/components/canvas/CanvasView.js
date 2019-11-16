import { Fixed, Page, Popup } from '../../h5ds-app-preview/pages';
import React, { Component } from 'react';
import { bindSelf, util } from '../../utils';
import { dragGroupEvent, initDragSelectGroupEvent, setGroupControl } from '../layer-group';
import { inject, observer } from 'mobx-react';

import { renderIn } from '../../config';
import { transaction } from 'mobx';

@inject('h5ds', 'scope')
@observer
class CanvasView extends Component {
  constructor(props) {
    super(props);
    this.layer = props.h5ds.getLayer();
  }

  /**
   * 选择图层的时候，初始化控制器之后，一些列事件触发的回调函数
   */
  @bindSelf
  initControlCallback() {
    const h5ds = this.props.h5ds;
    this.$nowlayer = h5ds.getLayerDom();

    // 先注销之前的控制器
    let $control = h5ds.getPageDom().find('.h5ds-control');
    if ($control[0]) {
      $control.remove();
      $control = null;
    }

    if (!this.$nowlayer) {
      console.warn('未选择layer');
      return;
    } else if (!this.$nowlayer[0]) {
      console.warn('未选择layer');
      return;
    }

    // 获取对应的插件
    this.layer = h5ds.getLayer();
    const editor = this.props.scope.pluginsKey[this.layer.pid];
    if (!editor) {
      console.error('插件异常', this.layer.pid);
      return;
    }
    const editorConfig = editor.editorConfig || {};

    // 初始化当前的控制器
    this.$nowlayer.control({
      lockWideHigh: this.layer.set.lockWideHigh,
      setHeight: editorConfig.height === false ? false : true,
      setWidth: editorConfig.width === false ? false : true,
      movex: editorConfig.x === false ? false : true,
      movey: editorConfig.y === false ? false : true,
      rotate: editorConfig.rotate === false ? false : true,
      autosize: true,
      fixedsize: true
    });

    // 自动缩放整体
    this.$nowlayer.off('controlStart.h5ds.canvas').on('controlStart.h5ds.canvas', (e, data) => {
      if (!data) {
        return false;
      }
      if (!this.$elementInner) {
        this.$elementInner = this.$nowlayer
          .children('.element')
          .children('.element-flip')
          .children();
      }
      const width = this.$elementInner.width();
      const height = this.$elementInner.height();
      this.startWidth = this.$nowlayer.width();
      this.startHeight = this.$nowlayer.height();
      this.startScale = [this.startWidth / width, this.startHeight / height];
    });

    // tick，处理裁剪后的图片和合并图层的缩放问题
    this.$nowlayer.off('controlResizeTick.h5ds.canvas').on('controlResizeTick.h5ds.canvas', (e, data) => {
      // 如果data没值，说明是点击事件，直接跳过
      if (!data) {
        return false;
      }

      // 后续如果有需要连带缩放的，加到这里
      if (['h5ds_img', 'h5ds_combin'].includes(this.layer.pid)) {
        this.$elementInner.css({
          transform: `scale(${(data.width / this.startWidth) * this.startScale[0]}, ${(data.height / this.startHeight) * this.startScale[1]})`
        });
      }
    });

    // 控制器事件绑定
    this.$nowlayer.off('change.h5ds.canvas').on('change.h5ds.canvas', (e, data) => {
      if (this.tickData) {
        this.tickData = null;
      }
      if (this.$elementInner) {
        this.$elementInner = null;
      }

      // 如果data没值，说明是点击事件，直接跳过
      if (!data) {
        return false;
      }
      transaction(() => {
        if (!this.layer) {
          return null;
        }
        for (let key in data) {
          switch (key) {
            case 'left':
              this.layer.style.left = data[key];
              break;
            case 'top':
              this.layer.style.top = data[key];
              break;
            case 'width':
              this.layer.style.width = data[key];
              break;
            case 'height':
              this.layer.style.height = data[key];
              break;
            case 'transform':
              this.layer.style.transform = data['transform'];
              break;
          }
        }
        // 更新canvas
        this.props.h5ds.edata.keys = util.randomID();
      });
      // 保存记录
      window.pubSubEditor.publish('h5ds.setHistory');
    });
  }

  /**
   * 组的相关事件
   */
  @bindSelf
  initGroupEvent() {
    // 框选择组的事件
    initDragSelectGroupEvent(this.props.h5ds, arr => {
      transaction(() => {
        edata.selectGroup = arr;
        edata.setType = 'group';
      });
    });

    let { edata, getPageLayerDom, getLayers } = this.props.h5ds;
    // 拖动组的事件
    dragGroupEvent(getLayers, getPageLayerDom, edata);
  }

  /**
   * 控制器相关方法
   */
  @bindSelf
  initControlEvent() {
    // 点击空白，销毁layer控制器
    $(document).on('mousedown.h5ds.destoryControl', e => {
      if (!$(e.target).closest('.layer')[0] && $(e.target).closest('#h5dsCanvas')[0]) {
        // 销毁后，取消layer 的选择
        window.pubSubEditor.publish('h5ds.destoryControl');
      }
    });

    // 销毁控制器的事件 data: { pageNum, selectType }
    window.pubSubEditor.subscribe('h5ds.destoryControl', data => {
      console.log('销毁控制器的事件', data);
      let { edata } = this.props.h5ds;
      let { selectType, pageNum } = edata;
      let $control = $('#h5dsCanvasApp').find('.h5ds-control');
      if ($control[0]) {
        $control.remove();
        $control = null;
      }

      transaction(() => {
        edata.setType = 'page';
        edata.selectGroup = false;
        edata.selectLayer = null;
        if (data) {
          pageNum = data.pageNum;
          selectType = data.selectType;
        }
        // 如果pageNum 存在，才重新设置页面
        if (!util.isEmpty(pageNum)) {
          this.props.h5ds.setPage(pageNum, selectType);
        }
      });
    });

    // 初始化控制器方法
    window.pubSubEditor.subscribe('h5ds.initControl', () => {
      this.initControlCallback();
    });
  }

  // canvas 里面的 layer 点击后 初始化控制器
  @bindSelf
  initLayerControl(index, e) {
    // 如果不是在绘图页面渲染，不初始化控制器
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    const h5dsStore = this.props.h5ds; // { edata, getPageDom, getPageLayerDom, getLayers }

    // 如果是点住ctrl 不放开。进入组的选择模式
    if (e && e.ctrlKey) {
      transaction(() => {
        // 如果不是组模式，开始组模式
        if (!h5dsStore.edata.selectGroup) {
          h5dsStore.edata.selectGroup = [];
          const $control = h5dsStore.getPageDom().find('.h5ds-control');
          // 判断之前是否有选中一个
          if ($control[0]) {
            h5dsStore.edata.selectGroup.push(h5dsStore.edata.selectLayer);
          }
        }

        // 如果二次点击，取消选中
        if (h5dsStore.edata.selectGroup.indexOf(index) === -1) {
          h5dsStore.edata.selectGroup.push(index);
        } else {
          h5dsStore.edata.selectGroup.splice(h5dsStore.edata.selectGroup.findIndex(v => v === index), 1);
        }

        // 如果是选择组，先去重
        h5dsStore.edata.selectGroup = [...new Set(h5dsStore.edata.selectGroup)];
        if (h5dsStore.edata.selectGroup.length > 1) {
          h5dsStore.edata.selectLayer = null;
          h5dsStore.edata.setType = 'group';
        }
        // 设置 control
        setGroupControl(h5dsStore.getPageDom, h5dsStore.edata.selectGroup);
        dragGroupEvent(h5dsStore.getLayers, h5dsStore.getPageLayerDom, h5dsStore.edata);
      });
      return;
    }

    // 如果拖动是组，且，点击的有选择框 就不往后面走了
    if (h5dsStore.edata.selectGroup && util.isEmpty(h5dsStore.edata.selectLayer) && $(e.currentTarget).find('.h5ds-control')[0]) {
      return;
    }

    // 如果点击一个
    if (index !== h5dsStore.edata.selectLayer) {
      h5dsStore.edata.selectGroup = null;
      h5dsStore.setLayer(index);
    }
  }

  /**
   * 设置 page 的样式
   */
  @bindSelf
  setPageStyle(type) {
    const { selectType, selectFixed } = this.props.h5ds.edata;
    const style = {};
    const page = this.props.h5ds.getPage();
    if (!page) {
      console.warn('未找到page');
      return;
    }
    switch (selectType) {
      case 'popups':
        {
          if (type === 'popups') {
            style.display = 'block';
          } else {
            style.pointerEvents = 'none';
          }
        }
        break;
      case 'fixeds':
        {
          if (type === 'popups') {
            style.display = 'none';
          }
          if (type + selectFixed === 'fixedUp0' || type + selectFixed === 'fixedDown1') {
            style.width = '100%';
            style.height = '100%';
          } else {
            style.pointerEvents = 'none';
          }
        }
        break;
      case 'pages':
        {
          if (type === 'popups') {
            style.display = 'none';
          } else if (type === 'pages') {
            // ...
          } else {
            style.pointerEvents = 'none';
          }
        }
        break;
    }
    return Object.assign(style, page.style || {});
  }

  componentDidMount() {
    this.initControlEvent();
    this.initGroupEvent();
  }

  componentWillUnmount() {
    window.pubSubEditor.unsubscribe('h5ds.initControl');
    window.pubSubEditor.unsubscribe('h5ds.destoryControl');
    $(document).off('mousedown.h5ds.destoryControl');
    $('#h5dsCanvas').off('mousedown.h5ds.group');
    $('#h5dsCanvas').off('mousedown.h5ds.layerGroup');
    this.$nowlayer && this.$nowlayer.off('change.h5ds.canvas controlResizeTick.h5ds.canvas controlStart.h5ds.canvas');
  }

  render() {
    console.log('render canvas viewwwwwwwww>>>>>>>>>>>');
    const { edata, getPage, renderPageList } = this.props.h5ds;
    const { plugins, pageData } = this.props;
    // 延迟更新pageList
    renderPageList();
    edata.keys;
    return (
      <div className="h5ds-pages-app" key={edata.canvasAnimate}>
        {/* 弹窗页面 */}
        {edata.selectType === 'popups' && (
          <div className="h5ds-fixed-view h5ds-js-setsize" id="h5dsPageViewPopup" style={{ ...this.setPageStyle('popups') }}>
            <Popup initControl={this.initLayerControl} plugins={plugins} isRenderThis={true} data={getPage('popups')} renderIn={renderIn.RENDER_IN_CANVAS} />
          </div>
        )}
        {/* 上层浮动页面 */}
        <div className="h5ds-fixed-view h5ds-js-setsize" id="h5dsPageViewFixedUp" style={{ ...this.setPageStyle('fixedUp') }}>
          <Fixed initControl={this.initLayerControl} plugins={plugins} isRenderThis={true} data={getPage('fixeds', 0)} renderIn={renderIn.RENDER_IN_CANVAS} />
        </div>
        {/* 下层浮动页面 */}
        <div className="h5ds-fixed-view h5ds-js-setsize" id="h5dsPageViewFixedDown" style={{ ...this.setPageStyle('fixedDown') }}>
          <Fixed initControl={this.initLayerControl} plugins={plugins} isRenderThis={true} data={getPage('fixeds', 1)} renderIn={renderIn.RENDER_IN_CANVAS} />
        </div>
        <div className="h5ds-page-view h5ds-js-setsize" id="h5dsPageView" style={{ ...this.setPageStyle('pages') }}>
          {pageData && edata.selectType !== 'popups' && (
            <Page isRenderThis={true} initControl={this.initLayerControl} plugins={plugins} data={pageData} renderIn={renderIn.RENDER_IN_CANVAS} />
          )}
        </div>
      </div>
    );
  }
}

export default CanvasView;
