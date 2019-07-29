import '../../../lib/editor/style.css';

import * as demo from '../../plugins/demo';

import React, { Component } from 'react';

import H5dsEditor from '../../../lib/editor';
import ImageModal from './image-modal';
import SoundModal from './sound-modal';
import { cleanData } from '../../../lib/swiper';
import { config } from '../../config';

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
    this.appId = 'test_app_id';
  }

  /**
   * 获取APP详情信息
   */
  getAppDetail = async () => {
    this.setState({ data: 'defaultData' });
  };

  /**
   * 保存APP
   */
  saveApp = async data => {
    console.log('saveApp ->', data);
  };

  /**
   * 保存Page
   */
  savePage = async data => {
    console.log('savePage ->', data);
    return Promise.resolve();
  };

  /**
   * 保存Layer
   */
  saveLayer = async data => {
    console.log('saveLayer ->', data);
  };

  /**
   * 发布 app
   */
  publishApp = async data => {
    console.log('publishApp ->', data);
  };

  componentDidMount() {
    setTimeout(() => {
      this.getAppDetail();
    }, 100);
  }

  /**
   * 在dev模式下，调用Editor.dev， 在 pro模式下，调用 Editor.pro
   * 因为在npm run build:editor 的时候会抽离公共资源，但是这个公共资源core部分也在调用，
   * 所以不能单独引用，但是在dev模式下，直接调用editor（umd）包的时候需要公共资源的支持，
   * 但是如果调用公共资源会导致页面包重复而出错，所以开发模式下面，只能调用Editor.dev.js
   */
  render() {
    const { data } = this.state;
    if (data) {
      cleanData(data);
    }
    return (
      <H5dsEditor
        plugins={[demo]}
        data={data}
        debugger={true}
        options={{
          imageSourceModal: ImageModal, // 弹窗
          soundSourceModal: SoundModal,
          publishHost: config.publishHost,
          pluginsHost: config.pluginsHost, // 会自动在 pluginsHost/plugins 下面去找插件
          getPrivewToken: async appId => '', // 获取临时auth，配置临时预览的二维码
          publishApp: this.publishApp,
          headerNav: null,
          saveApp: this.saveApp,
          savePage: this.savePage,
          saveLayer: this.saveLayer,
          appId: this.appId
        }}
      />
    );
  }
}
export default Editor;
