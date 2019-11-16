import React, { Component } from 'react';
import { bindSelf, util } from '../../../utils';
import { inject, observer } from 'mobx-react';

import CropImage from '../../../../h5ds-components/crop-image';
import { transaction } from 'mobx';

@inject('h5ds', 'scope')
@observer
class AppMainImg extends Component {
  // 显示图片列表
  @bindSelf
  showSourceImgs() {
    window.pubSubEditor.publish('h5ds.img.modal.show', {
      callback: this.changeImage
    });
  }

  @bindSelf
  changeImage(url) {
    transaction(() => {
      this.props.h5ds.data.img = url;
      this.props.h5ds.edata.keys = util.randomID();
      window.pubSubEditor.publish('h5ds.setHistory');
    });
  }

  // 切片选择图片
  @bindSelf
  onCropOk(data) {
    console.log('data', data);
    const { uploadSet } = this.props;
    if (!data.src) {
      return;
    }
    if (uploadSet) {
      $.ajax({
        type: 'post',
        url: uploadSet.action,
        headers: { ...uploadSet.headers },
        data: {
          content: data.base64.split(',')[1]
        }
      }).done(d => {
        if (d.path) {
          this.changeImage(d.path);
        } else {
          console.error(`数据返回格式错误： {path: 'xxxx'}`);
        }
      });
    } else {
      console.error('图片裁剪需要配置 uploadBase64 接口参数！');
    }
  }

  render() {
    const { img } = this.props.h5ds.data;
    return (
      <div className="h5ds-util-background">
        <h1 className="h5ds-util-background-title">H5主图:</h1>
        <div className="h5ds-util-background-img">
          <CropImage
            cropSet={null}
            onClickNullImage={this.showSourceImgs}
            onChangeImage={this.showSourceImgs}
            onCropBase64={this.onCropOk}
            src={img}
          />
        </div>
      </div>
    );
  }
}

export default AppMainImg;
