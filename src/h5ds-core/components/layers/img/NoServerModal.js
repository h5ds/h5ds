import './noserver-modal.less';

import { Button, Icon, Input, Modal } from 'antd';
import React, { Component } from 'react';

import { util } from '../../../utils';

/**
 * 如果未设置options.imageSourceModal参数，会显示默认的图片框
 * props: select({url: ''})
 */
export default class NoServerModal extends Component {
  constructor(props) {
    super(props);
    let imgList = util.getStorage('H5DS_NO_SERVER_IMAGES');
    if (imgList) {
      imgList = imgList.split(',');
    } else {
      imgList = [];
    }
    this.state = {
      imgList,
      value: ''
    };
  }

  // 加入缓存
  storeAdd = (urls = '') => {
    let imgList = util.getStorage('H5DS_NO_SERVER_IMAGES');
    if (imgList) {
      imgList = imgList.split(',');
    } else {
      imgList = [];
    }
    imgList = [...imgList, ...urls.split(',')];
    this.setState({ imgList });
    util.setStorage('H5DS_NO_SERVER_IMAGES', imgList.join(','));
  };

  // 从缓存中删除
  storeDel = index => {
    let imgList = util.getStorage('H5DS_NO_SERVER_IMAGES');
    if (imgList) {
      imgList = imgList.split(',');
    } else {
      imgList = [];
    }
    imgList.splice(index, 1);
    this.setState({ imgList });
    util.setStorage('H5DS_NO_SERVER_IMAGES', imgList.join(','));
  };

  addImg = url => {
    this.props.select({ url });
  };

  delImg = (e, index) => {
    e.stopPropagation();
    this.storeDel(index);
  };

  addSource = () => {
    this.setState({ value: '' });
    if (this.state.value) {
      this.storeAdd(this.state.value);
    } else {
      Modal.error({
        title: '错误提示',
        content: `请先添加图片资源，多个图片链接使用','分割`
      });
    }
  };

  onChangeText = e => {
    this.setState({ value: e.target.value });
  };

  render() {
    const { TextArea } = Input;
    return (
      <div className="h5ds-noserver-modal">
        <div className="h5ds-noserver-tips">未设置options.imageSourceModal参数，这里显示系统自带的图片管理器</div>
        <div>
          <TextArea value={this.state.value} onChange={this.onChangeText} rows={3} placeholder="添加图片资源，多个图片链接使用','分割" />
          <br />
          <br />
          <Button type="primary" onClick={this.addSource}>
            添加图片资源
          </Button>
        </div>
        <div className="h5ds-noserver-imgs">
          {this.state.imgList.map((d, i) => {
            return (
              <div key={i} className="h5ds-noserver-item" onClick={() => this.addImg(d)}>
                <Icon
                  onClick={e => {
                    this.delImg(e, i);
                  }}
                  type="close"
                />
                <img src={d} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
