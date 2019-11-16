import './modal.less';

import React, { Component } from 'react';
import { bindSelf, util } from '../../../utils';

import H5dsDrawer from '../../../../h5ds-components/h5ds-drawer';
import { renderToStaticMarkup } from 'react-dom/server';
import { shapes } from './data';
import { transaction } from 'mobx';

/**
 * @desc 图片资源弹窗，该图库资源在多个地方使用
 */
export default class ShapeModal extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
    this.willDrawShape = '';
  }

  @bindSelf
  hideModal() {
    this.setState({
      visible: false
    });
  }

  @bindSelf
  drawShape(type) {
    // 选择形状
    this.willDrawShape = type;
    $('.h5ds-center').append(`<div class="h5ds-shape-shapepanel"></div>`);
    this.hideModal();
  }

  // 添加数据
  @bindSelf
  addLayerData({ left, top, width, height, quadrant }) {
    const { pluginsKey } = this.props.scope;
    const layerData = this.props.h5ds.getJsonByPid(pluginsKey, 'h5ds_shape', this.willDrawShape);
    let scale = '';
    switch (quadrant) {
      case 1:
        scale = '1, -1';
        break;
      case 2:
        scale = '-1, -1';
        break;
      case 3:
        scale = '-1, 1';
        break;
      case 4:
        scale = '1, 1';
        break;
    }
    if (this.willDrawShape === 'line') {
      layerData.data.style.strokeWidth = 1;
    }
    const phoneScale = parseFloat($('.h5ds-canvas-box').transform('scale')) || 1;
    layerData.style.width = width / phoneScale;
    layerData.style.height = height / phoneScale;
    layerData.style.left = left / phoneScale;
    layerData.style.top = top / phoneScale;
    layerData.data.transform = `scale(${scale})`;
    transaction(() => {
      this.props.h5ds.addLayer(layerData);
      this.props.h5ds.edata.keys = util.randomID();
    });
    // 选中当前形状
    this.props.h5ds.clickLayer();
  }

  // 绘制一个临时的shape
  @bindSelf
  drawTemporaryShape({ top, left, width, height, quadrant }) {
    if (!this.$temporary) {
      const id = `id_${util.randomID()}`;
      let shtml = '';
      // 线条特殊处理
      let shape = shapes.find(d => d.type === this.willDrawShape);
      shtml = renderToStaticMarkup(shape.dom());
      $('.h5ds-shape-shapepanel').html(`<div class="h5ds-shape-shapepanel-inner" style="width:0; height: 0;" id="${id}">${shtml}</div>`);
      this.$temporary = $(`#${id}`);
    } else {
      if (this.willDrawShape === 'line') {
        this.$temporary.find('svg').attr({ viewBox: `0 0 ${width} ${height}` });
        this.$temporary.find('line').attr({ x1: 0, y1: 0, x2: width, y2: height });
      }
      let scale = '';
      switch (quadrant) {
        case 1:
          scale = '1, -1';
          break;
        case 2:
          scale = '-1, -1';
          break;
        case 3:
          scale = '-1, 1';
          break;
        case 4:
          scale = '1, 1';
          break;
      }
      this.$temporary.css({ top, left, width, height, transform: `scale(${scale})` });
    }
  }

  @bindSelf
  drawShapeEvent() {
    $(document).on('mousedown.h5ds.shapepanel', '.h5ds-shape-shapepanel', ed => {
      const { left, top } = $('.h5ds-center').offset();
      const size = {
        width: 0,
        height: 0,
        left: ed.pageX - left,
        top: ed.pageY - top
      };

      // 落点相对象限
      let quadrant = 4; // 1,2,3,4

      $(document)
        .on('mousemove.h5ds.shapepanel', em => {
          size.width = Math.abs(em.pageX - ed.pageX);
          size.height = Math.abs(em.pageY - ed.pageY);

          // 是否点击了shifte按键
          em.shiftKey && (size.height = size.width);

          // 拉动鼠标
          if (em.pageX > ed.pageX) {
            size.left = ed.pageX;
            em.pageY > ed.pageY ? (quadrant = 4) : (quadrant = 1);
          } else {
            size.left = em.pageX;
            em.pageY > ed.pageY ? (quadrant = 3) : (quadrant = 2);
          }
          if (em.pageY > ed.pageY) {
            size.top = ed.pageY;
          } else {
            // 往上绘制
            if (em.shiftKey) {
              em.pageX = em.pageY;
              size.top = ed.pageY - size.height;
            } else {
              size.top = em.pageY;
            }
          }
          size.left -= left;
          size.top -= top;

          // 绘制形状
          this.drawTemporaryShape({ ...size, quadrant });
        })
        .on('mouseup.h5ds.shapepanel', () => {
          this.$temporary = null;
          const offset = $('.h5ds-js-canvas').offset();
          // 计算偏移值
          size.left = size.left - offset.left + left;
          size.top = size.top - offset.top + top;

          this.addLayerData({ ...size, quadrant });
          $('.h5ds-shape-shapepanel')[0] && $('.h5ds-shape-shapepanel').remove();
          $(document).off('mousemove.h5ds.shapepanel');
          $(document).off('mouseup.h5ds.shapepanel');
        });
    });
  }

  componentDidMount() {
    /**
     * @desc 该订阅事件为了让图片选框进行公用，
     * @param {function} callback 选择图片的回调函数
     */
    window.pubSubEditor.subscribe('h5ds.shape.modal.show', data => {
      const { callback = null } = data;
      this.selectCallback = callback;
      this.setState({ visible: true });
    });

    /**
     * 绘制形状的方法
     */
    this.drawShapeEvent();
  }

  componentWillUnmount() {
    $('.h5ds-shape-shapepanel')[0] && $('.h5ds-shape-shapepanel').remove();
    $(document).off('mousedown.h5ds.shapepanel');
    window.pubSubEditor.unsubscribe('h5ds.shape.modal.show');
  }

  render() {
    return (
      <H5dsDrawer className="h5ds-shape-source" close={this.hideModal} title={null} show={this.state.visible}>
        <div className="h5ds-shape-list">
          {shapes.map((d, i) => {
            return (
              <div className="h5ds-shape-item" key={i} onClick={() => this.drawShape(d.type)}>
                {d.img ? <img src={d.img} /> : d.dom({ fill: 'rgba(255,255,255,1)' })}
              </div>
            );
          })}
        </div>
      </H5dsDrawer>
    );
  }
}
