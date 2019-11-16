import './editor.less';

import React, { Component } from 'react';
import { bindSelf, util } from '../../../utils';

import CropImage from '../../../../h5ds-components/crop-image';
import { message } from 'antd';
import { transaction } from 'mobx';

class Editor extends Component {
  constructor(props) {
    super(props);
    const { layer } = props;
    let crop = {};
    if (layer.data.crop) {
      crop = JSON.parse(layer.data.crop);
    }
    this.state = {
      src: layer.data.src,
      crop,
      cropKey: util.randomID()
    };
    this.eventId = util.randomID();
  }

  // 渲染layerdom
  @bindSelf
  renderLayer(url) {
    const { h5ds, layer } = this.props;
    // 替换了图片
    if (url) {
      util.imgLazy(url).then(_img => {
        transaction(() => {
          const crop = JSON.stringify({
            top: 0,
            left: 0,
            width: _img.naturalWidth,
            height: _img.naturalWidth,
            naturalWidth: _img.naturalWidth,
            naturalHeight: _img.naturalWidth
          });
          layer.data.src = url;
          layer.data.crop = crop;
          h5ds.edata.keys = util.randomID();
          window.pubSubEditor.publish('h5ds.setHistory');
          this.setState({
            src: url,
            crop,
            cropKey: util.randomID()
          });
        });
        // 重新选择一下，解决数据异步的BUG
        setTimeout(() => {
          $('#h5dsLayerList')
            .find('.h5ds-layerlist-active')
            .trigger('click');
        });
      }); // end  util.imgLazy
    } else {
      transaction(() => {
        layer.data.crop = JSON.stringify(this.state.crop);
        h5ds.edata.keys = util.randomID();
        window.pubSubEditor.publish('h5ds.setHistory');
      });
    }
  }

  // 替换图片方法
  @bindSelf
  changeImage() {
    window.pubSubEditor.publish('h5ds.img.modal.show', {
      callback: this.renderLayer
    });
  }

  // 缩放的时候，进行矫正
  @bindSelf
  scaleEvent() {
    const { h5ds } = this.props;
    this.$layer = h5ds.getLayerDom();
    this.$layer.on('controlStart.h5ds.img', () => {
      this.layerBox = this.$layer.find('.layer-h5ds_img-inner');
    });
    this.$layer.on('controlResizeTick.h5ds.img', (e, data) => {
      const { width = 1, height = 1 } = this.state.crop;
      this.layerBox.css({ transform: `scale(${data.width / width}, ${data.height / height})` });
    });
  }

  // 裁剪的回调函数
  @bindSelf
  cropCallback(data) {
    if (!data) {
      // 删除图层
      window.pubSubEditor.publish('h5ds.shortcuts_dellayer');
    } else {
      // 裁剪图层
      const { cropLeft, cropTop, cropWidth, cropHeight, naturalWidth, naturalHeight } = data;
      this.setState(
        {
          crop: {
            left: cropLeft,
            top: cropTop,
            width: cropWidth,
            height: cropHeight,
            naturalWidth,
            naturalHeight
          }
        },
        this.renderLayer
      );
    }
  }

  componentDidMount() {
    // 缩放同步
    this.scaleEvent();

    // 双击换图，可编辑
    $('#h5dsCanvas').on('dblclick.imgeditor', '.h5ds-control', () => {
      this.changeImage();
    });
  }

  componentWillUnmount() {
    if (this.$layer) {
      this.$layer.off('controlStart.h5ds.img');
      this.$layer.off('controlResizeTick.h5ds.img');
      this.$layer = null;
    }
    $('#h5dsCanvas').off('dblclick.imgeditor');
  }

  render() {
    const { src, crop, cropKey } = this.state;
    return (
      <div className="h5ds-edit-h5ds_img" key={cropKey}>
        <CropImage
          cropSet={crop}
          onClickNullImage={this.changeImage}
          onChangeImage={this.changeImage}
          onCropOk={this.cropCallback}
          src={src}
        />
      </div>
    );
  }
}

/**
 * 图层对于JSON数据
 */
class LayerJSON {
  id = null;
  className = null;
  animate = [];
  data = { src: 'http://cdn.h5ds.cn/lib/images/imgDom.jpg', naturalWidth: 200, naturalHeight: 150, crop: '' };
  style = { width: 200, height: 150, top: 10, left: 10 };
  estyle = {};
  events = []; // 事件
}

// 图标
const icon = <i className="h5ds-ico h5ds-ico-beijing" />;

// 添加图片的业务
function addImageLayer(url, props) {
  const { h5ds } = props;
  const { pluginsKey } = props.scope;
  const data = h5ds.getJsonByPid(pluginsKey, 'h5ds_img');
  util.imgLazy(url).then(_img => {
    if (_img) {
      transaction(() => {
        const crop = JSON.stringify({
          top: 0,
          left: 0,
          width: _img.naturalWidth,
          height: _img.naturalWidth,
          naturalWidth: _img.naturalWidth,
          naturalHeight: _img.naturalWidth
        });

        // 设置初始位置
        let { top, left } = $('.h5ds-canvas-realsize').position();
        top = -top / h5ds.edata.phoneScale;
        left = -left / h5ds.edata.phoneScale;
        if (top < 0) {
          top = 0;
        }
        if (left < 0) {
          left = 0;
        }
        data.data.crop = crop;
        data.style.top = top + 20;
        data.style.left = left + 20;
        data.style.width = _img.naturalWidth / 2 || 200;
        data.style.height = _img.naturalHeight / 2 || 200;
        data.data.src = url;
        h5ds.addLayer(data);
        h5ds.edata.keys = util.randomID();
        h5ds.setLayer(0);
        window.pubSubEditor.publish('h5ds.setHistory');
      });
    } else {
      message.error('图片加载失败！');
    }
  });
}

// 点击按钮，触发弹窗，传入一个callback函数，这个函数会在Modal内部触发
function selectIcon(props) {
  // 添加图片
  window.pubSubEditor.publish('h5ds.img.modal.show', {
    callback: url => {
      addImageLayer(url, props);
    }
  });
}

export { Editor, icon, LayerJSON, selectIcon };
