import './layer.less';

import React, { Component } from 'react';

import { renderIn } from '../../config';

/**
 * @desc layer DOM 公用
 * adsorbTopBottom, adsorbLeftRight 吸附的参数说明
 * 因为视图默认是居中的，如果视图比较小，居中显示，有元素要吸附到最外层框上，就需设置吸附参数，默认吸附参数是0
 *  ┌──────────────┐
 *  │      x       │  x = adsorbTopBottom
 *  │    ┌────┐    │
 *  │ y  │    ┃ y  │  y = adsorbLeftRight
 *  │    │    │    │
 *  │    └━━━━┘    │
 *  │      x       │
 *  └━━━━━━━━━━━━━━┘
 */
class Layer extends Component {
  /**
   * 吸附参数layer.adsorb: bottom-center, top-center, left-center, right-center, top-left, top-right, bottom-left, bottom-right 8个吸附定位，默认是画布的左上角定位
   * 如果设置了吸附参数，那么top, left 就是相对吸附点的位置。
   * adsorbSet: scale 当前画布缩放比例, adsorbTopBottom，adsorbLeftRight 都是0的时候，吸附定位相对画布定位的。吸附定位会随着body的尺寸而动态发生变化
   */
  setAdsorb(adsorb, top, left, adsorbSet) {
    // 如果不是预览和发布，直接跳过
    if (![renderIn.RENDER_IN_PREVIEW, renderIn.RENDER_IN_PUBLISH].includes(this.props.renderIn)) {
      return { top, left };
    }
    if (!adsorbSet) {
      return { top, left };
    }
    let { adsorbTopBottom = 0, adsorbLeftRight = 0, scale = 1 } = adsorbSet;
    adsorbTopBottom /= scale;
    adsorbLeftRight /= scale;
    switch (adsorb) {
      case 'top-left':
        top -= adsorbTopBottom;
        left -= adsorbLeftRight;
        break;
      case 'top-center':
        top -= adsorbTopBottom;
        break;
      case 'top-right':
        top -= adsorbTopBottom;
        left += adsorbLeftRight;
        break;
      case 'left-center':
        left += adsorbLeftRight;
        break;
      case 'right-center':
        left -= adsorbLeftRight;
        break;
      case 'bottom-left':
        top += adsorbTopBottom;
        left -= adsorbLeftRight;
        break;
      case 'bottom-center':
        top += adsorbTopBottom;
        break;
      case 'bottom-right':
        top += adsorbTopBottom;
        left += adsorbLeftRight;
        break;
    }
    return { top, left };
  }

  // 离开动画, 确保在render之后执行
  outAnimateDo = () => {
    if (this.layerBoxRef) {
      this.settime = setTimeout(() => {
        this.layerBoxRef.style.display = 'none';
        setTimeout(() => {
          this.layerBoxRef.style.display = 'block';
        });
      }, 200);
    }
  };

  // 点击事件采用 发布订阅模式去触发事件
  onClick = e => {
    e.stopPropagation();
    // 如果不是预览和发布，直接跳过
    if (![renderIn.RENDER_IN_PREVIEW, renderIn.RENDER_IN_PUBLISH].includes(this.props.renderIn)) {
      return;
    }
    const { events = [] } = this.props.layer;

    // 显示隐藏切换
    const showHide = (d, eventParam) => {
      let { value } = eventParam;
      value = value.split(',').filter(d => d);
      value.forEach(id => {
        if (d.keyid === id) {
          let layerTarget = null;
          if (this.props.renderIn === renderIn.RENDER_IN_PREVIEW) {
            layerTarget = document.querySelector(`.h5ds-preview [data-keyid="${id}"]`);
          } else {
            layerTarget = document.querySelector(`[data-keyid="${id}"]`);
          }
          let display = window.getComputedStyle(layerTarget).display;
          if (display === 'none') {
            layerTarget.style.display = 'block';
          } else {
            layerTarget.style.display = 'none';
          }
        }
      });
    };
    events.forEach(event => {
      const { eventId, eventParam } = event;
      switch (eventId) {
        case 'h5ds_event_topage':
            window.pubSubLayer.publish('h5ds.layerEvent.topage', eventParam);
          break;
        case 'h5ds_event_click':
          {
            // show_modal, show_hide_layer, custom_event_name
            switch (eventParam.eventName) {
              case 'h5ds_show_modal':
                if (this.props.appData) {
                  this.props.appData.popups.forEach(d => {
                    showHide(d, eventParam);
                  });
                } else {
                  alert('单独使用Layer或者Page无需传入appData，弹窗事件无效！');
                }
                break;
              case 'h5ds_show_hide_layer':
                if (this.props.appData) {
                  this.props.pageData.layers.forEach(d => {
                    showHide(d, eventParam);
                  });
                } else {
                  alert('单独使用Layer无需传入pageData，隐藏页面中的其他元素事件无效！');
                }
                break;
              case 'h5ds_custom_event_name':
                console.log('触发自定义事件', eventParam);
                window.pubSubLayer.publish(eventParam.value, eventParam);
                break;
            }
          }
          break;
        case 'h5ds_event_link':
          location.href = eventParam.value;
          break;
      }
    });
  };

  componentWillUnmount() {
    this.settime && clearTimeout(this.settime);
  }

  render() {
    const { layer, zIndex, children, adsorbSet, initControl } = this.props;
    const cName = ['layer'];
    const { top, left, ...other } = layer.style;
    const layerSize = this.setAdsorb(layer.adsorb, top, left, adsorbSet);
    const style = {
      zIndex,
      top: layerSize.top,
      left: layerSize.left,
      ...other
    };
    cName.push(`layer-${layer.pid}`);

    // 添加class
    if (layer.className) {
      cName.push(layer.className);
    }

    if (layer.set && layer.set.hide) {
      cName.push('layer-temporary-hide');
    }

    if (layer.set && layer.set.lock) {
      cName.push('layer-temporary-lock');
    }

    if (layer.set && layer.set.noEvent) {
      cName.push('layer-temporary-noevent');
    }

    // 设置其他 element 上面的样式
    let estyle = { ...layer.estyle } || {};

    // 设置动画
    const animateArr = [];
    let firstAnimate = null;
    if (layer.animate && layer.animate.length > 0) {
      layer.animate.forEach((elem, index) => {
        if (index === 0) {
          firstAnimate = elem.type;
        }
        animateArr.push(elem.style);
      });
    }
    // 如果字体添加了动画效果，也要反复触发动画，如果是合并图层，把 isRenderThis 传递下去
    if (layer.pid === 'h5ds_text' && layer.data.animate) {
      Object.assign(style, { ...this.props.style });
    }
    switch (firstAnimate) {
      case 'in':
        // 如果首个动画是进入动画，需要加上动画触发， this.props.style 设置了 display: block 或者 none, 如果第一个动画是进入动画，默认opacity是0
        Object.assign(style, { ...this.props.style });
        Object.assign(estyle, { opacity: 0 });
        break;
      case 'out':
        // 如果是离开动画执行
        this.outAnimateDo();
        break;
    }

    // 如果在编辑器页面，事件无效
    let onClick = this.onClick;
    if (initControl) {
      onClick = e => {
        initControl(9999 - zIndex, e);
      };
    }

    // console.log('style', layer, this.props.style);

    return (
      <div id={layer.id} ref={c => (this.layerBoxRef = c)} key={layer.keyid} data-keyid={layer.keyid} onClick={onClick} className={cName.join(' ')} style={style}>
        <div
          ref={c => (this.layerRef = c)}
          className="element"
          style={{
            WebkitAnimation: animateArr.join(','),
            animation: animateArr.join(','),
            ...estyle
          }}
        >
          <div style={{ transform: style.flip ? `scale(${style.flip.join(',')})` : 'scale(1,1)' }} className="element-flip">
            {children}
          </div>
        </div>
      </div>
    );
  }
}
export default Layer;
