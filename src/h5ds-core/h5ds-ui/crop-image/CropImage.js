import './cropImage.less';

import React, { Component } from 'react';
import { bindSelf, util } from '../../src/utils';

import CropControl from './CropControl';

/**
 * @desc 图片裁剪方法
 */
export default class CropImage extends Component {
  constructor(props) {
    super(props);
    // cropSet 传入的 参数为真实尺寸的参数， 也就是crop参数
    const { width = 0, height = 0, top = 0, left = 0 } = props.cropSet || {};
    this.state = {
      src: props.src,
      // 缩小后，裁剪的参数
      delbtn: props.delbtn === undefined ? true : props.delbtn,
      width,
      height,
      top: 0,
      left: 0,
      boxWidth: 0,
      boxHeight: 0,
      // 原始尺寸，裁剪的参数
      naturalWidth: 0,
      naturalHeight: 0,
      cropLeft: left,
      cropTop: top,
      cropWidth: width,
      cropHeight: height,
      imageInfo: null
    };
  }

  // static getDerivedStateFromProps(nextProps, state) {
  //   if (nextProps) {
  //     return Object.assign(state, { ...nextProps });
  //   } else {
  //     return state;
  //   }
  // }

  // props数据更新
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.src && nextProps.src !== this.props.src) {
      // 先设置了src，才能获取到真实尺寸
      console.log('设置了src，props数据更新');
      this.setState({ src: nextProps.src }, () => {
        // 换图片了，裁剪区域100%；
        util.imgLazy(nextProps.src).then(async img => {
          // const { left, top, width, height } = nextProps.cropSet || {};
          if (img) {
            await this.initImage(nextProps.src, {
              cropLeft: 0,
              cropTop: 0,
              cropWidth: img.naturalWidth,
              cropHeight: img.naturalHeight
            });
            this.onCropOk();
          }
        });
      });
    }
  }

  /**
   * 通过裁剪区域，计算显示区域
   */
  _countViewSet(state) {
    const { cropLeft, cropTop, cropWidth, cropHeight, naturalHeight, naturalWidth, boxWidth, boxHeight } = state;
    const scaleX = naturalWidth / (boxWidth || 1) || 1;
    const scaleY = naturalHeight / (boxHeight || 1) || 1;
    let top = cropTop / scaleY;
    let left = cropLeft / scaleX;
    let width = cropWidth / scaleX;
    let height = cropHeight / scaleY;
    return { top, left, width, height };
  }

  /**
   * 计算裁剪区域
   */
  _countCropData(state) {
    const { top, left, width, height, boxWidth, boxHeight, naturalHeight, naturalWidth } = state;
    const scaleX = naturalWidth / (boxWidth || 1);
    const scaleY = naturalHeight / (boxHeight || 1);
    let cropTop = top * scaleY;
    let cropLeft = left * scaleX;
    let cropWidth = width * scaleX;
    let cropHeight = height * scaleY;
    return Object.assign(state, { cropTop, cropLeft, cropWidth, cropHeight });
  }

  // 默认100%，前提是设置了src，再执行这个
  @bindSelf
  initImage(src, cropSet) {
    return new Promise((resolve, reject) => {
      if (src) {
        util.imgLazy(src).then(() => {
          let { cropTop, cropLeft, cropWidth, cropHeight } = cropSet;
          const $img = $(this.imgRef);

          // 可能执行这个在render之前
          if (!this.imgRef) {
            resolve();
            return;
          }

          // 初始化参数
          cropSet.boxWidth = $img.width();
          cropSet.boxHeight = $img.height();
          cropSet.naturalHeight = $img[0].naturalHeight;
          cropSet.naturalWidth = $img[0].naturalWidth;

          // 如果没有传入裁剪参数，设置默认值，100%裁剪
          cropTop ? null : (cropSet.cropTop = 0);
          cropLeft ? null : (cropSet.cropLeft = 0);
          cropWidth ? null : (cropSet.cropWidth = cropSet.naturalWidth);
          cropHeight ? null : (cropSet.cropHeight = cropSet.naturalHeight);

          console.log('当前', cropSet);

          // 通过裁剪区域，获取显示区域
          const { top, left, width, height } = this._countViewSet(cropSet);
          this.setState({ top, left, width, height, ...cropSet }, resolve);
        });
      } else {
        console.error('src 参数为null');
        reject();
      }
    });
  }

  // base64
  @bindSelf
  onCropBase64() {
    const { src, cropLeft, cropTop, cropWidth, cropHeight } = this.state;
    if (!src) {
      this.props.onCropBase64 && this.props.onCropBase64({ base64: '', ...this.state });
      return;
    }
    return util
      .getBase64(src, {
        width: cropWidth,
        height: cropHeight,
        x: cropLeft,
        y: cropTop
      })
      .then(base64 => {
        this.props.onCropBase64 && this.props.onCropBase64({ base64, ...this.state });
      });
  }

  // 裁剪end
  @bindSelf
  onCropEnd(data = {}) {
    // 计算裁剪区域大小，真实尺寸
    const dataEnd = this._countCropData(Object.assign(this.state, data));
    this.props.onCropEnd && this.props.onCropEnd(dataEnd);
  }

  // 裁剪 tick
  @bindSelf
  onCropTick(data) {
    this.props.onCropTick && this.props.onCropTick(data);
  }

  // 确认裁剪
  @bindSelf
  onCropOk() {
    // 如果没变化，不执行裁剪
    const { top, left, naturalWidth, naturalHeight, cropTop, cropLeft, cropHeight, cropWidth } = this.state;
    this.props.onCropOk && this.props.onCropOk({ ...this.state });
    if (top === cropTop && left === cropLeft && naturalWidth === cropWidth && naturalHeight === cropHeight) {
      return;
    }
    this.props.onCropBase64 && this.onCropBase64();
  }

  // 重置100%
  @bindSelf
  resetCrop() {
    this.initImage(this.state.src, {
      cropLeft: 0,
      cropTop: 0
    });
    this.onCropOk();
  }

  // delImage
  @bindSelf
  delImage() {
    this.setState({ src: '' }, () => {
      this.props.onCropOk && this.props.onCropOk();
      this.props.onCropBase64 && this.onCropBase64();
    });
  }

  @bindSelf
  getImageSize(src) {
    if (util.getUrlQuery('userType') !== 'admin') {
      return;
    }
    const img = new Image();
    img.onload = () => {
      let width = img.width;
      let height = img.height;
      let size = 0;
      $.ajax({
        url: src,
        cache: false,
        success: (a, b, xhr) => {
          size = xhr.getResponseHeader('Content-Length');
          this.setState({
            imageInfo: { width, height, size: parseInt(size / 1000, 10) }
          });
        }
      });
    };
    img.src = src;
  }

  componentDidMount() {
    const { left, top, width, height } = this.props.cropSet || {};
    if (this.props.src) {
      this.initImage(this.props.src, {
        cropLeft: left,
        cropTop: top,
        cropWidth: width,
        cropHeight: height
      });
    }

    this.getImageSize(this.props.src);
  }

  render() {
    const { src, width, height, boxWidth, boxHeight, top, left, delbtn, imageInfo } = this.state;
    if (!src) {
      return (
        <div className="h5ds-util-cropimage-nullimg" onClick={this.props.onClickNullImage}>
          选择图片
        </div>
      );
    }
    return (
      <div className="h5ds-util-cropimage">
        <div className="h5ds-util-cropimage-imgbox">
          {/* CropControl 传入缩小后的尺寸 */}
          <CropControl onCropEnd={this.onCropEnd} {...{ width, height, top, left, boxWidth, boxHeight }} />
          <img ref={c => (this.imgRef = c)} src={src} alt="" style={{ clipPath: 'none' }} />
        </div>
        <div className="h5ds-util-cropimage-btns">
          <a onClick={this.props.onChangeImage}>
            <i className="h5ds-ico h5ds-ico-icoreset" /> 换图
          </a>
          {delbtn ? (
            <a onClick={this.delImage}>
              <i className="h5ds-ico h5ds-ico-icodel" /> 删除
            </a>
          ) : null}
          <a onClick={this.resetCrop}>
            <i className="h5ds-ico h5ds-ico-icoinit" /> 重置
          </a>
          <a onClick={this.onCropOk}>
            <i className="h5ds-ico h5ds-ico-icocrop" /> 裁剪
          </a>
          <a className="h5ds-img-down" href={src} rel="noopener noreferrer" target="_blank">
            {imageInfo ? <span style={{ fontSize: 12, color: imageInfo.size > 200 ? '#ff3636' : '#a5b6c8' }}>{`${imageInfo.size}kb`}</span> : '...'}
            <i className="h5ds-ico h5ds-ico-xiazai"></i>
          </a>
        </div>
      </div>
    );
  }
}
