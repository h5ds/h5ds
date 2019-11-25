import './publish.less';
import './preview.less';

import { Icon, Modal, message } from 'antd';
import React, { Component } from 'react';
import { appUtil, bindSelf, util } from '../../utils';
import { inject, observer } from 'mobx-react';

import H5dsModal from '../../../h5ds-components/h5ds-modal';
import PcPreview from './PcPreview';
import PhonePreview from './PhonePreview';
import { previewHtml } from './previewHtml';
import { toJS } from 'mobx';

@inject('h5ds', 'scope')
@observer
class Publish extends Component {
  state = {
    loading: false,
    show: false
  };

  @bindSelf
  modalShow() {
    this.setState({ show: true });
  }

  @bindSelf
  onClose() {
    this.setState({ show: false });
  }

  @bindSelf
  saveApp() {
    this.setState({ loading: true });
    const { saveApp, appId } = this.props.scope.options;
    const data = this.props.h5ds.data;
    data.plugins = appUtil.getPidByData(data);
    return new Promise((resolve, reject) => {
      try {
        saveApp({
          plugins: [...data.plugins],
          updateTime: +new Date(),
          appId,
          data: toJS(data)
        }).then(() => {
          this.setState({ loading: false });
          resolve();
        });
      } catch (e) {
        console.error(e);
        message.error('请传入props.saveApp 方法，且必须是一个Promise对象');
        reject();
      }
    });
  }

  // 下载源码
  @bindSelf
  downCode() {
    const data = this.props.h5ds.data;
    data.plugins = appUtil.getPidByData(data);
    util.saveShareContent(previewHtml.replace('{{__html}}', `${JSON.stringify(data)};`), 'preivew.html');
  }

  // 确认发布
  @bindSelf
  publishApp() {
    const data = this.props.h5ds.data;
    data.plugins = appUtil.getPidByData(data);
    const { publishApp, appId, noServer } = this.props.scope.options;
    try {
      return publishApp({
        plugins: [...data.plugins],
        updateTime: +new Date(),
        appId,
        data: toJS(data)
      }).then(() => {
        if (noServer) {
          Modal.error({
            title: '错误提示',
            content: '该版本没有服务端代码，因此不可以生成二维码和链接！您可以下载源码！'
          });
          // util.saveShareContent(previewHtml.replace('{{__html}}', `var h5dsAppData = ${JSON.stringify(data)};`), 'preivew.html');
          return false;
        }

        // 更新二维码
        return appId;
      });
    } catch (e) {
      console.error(e);
      message.error('请配置发布props.publishApp，且必须是一个Promise对象');
    }
  }

  render() {
    const { loading, show } = this.state;
    const { data } = this.props.h5ds;
    return (
      <div className="h5ds-publish">
        <a className="h5ds-btn-min" onClick={this.saveApp}>
          {loading ? (
            <span>
              <Icon type="loading" /> 保存中
            </span>
          ) : (
            <span>
              <i className="h5ds-ico h5ds-ico-baocun" /> 保存
            </span>
          )}
        </a>
        &nbsp;&nbsp;
        <a onClick={this.modalShow} className="h5ds-btn-min h5ds-js-publish">
          <i className="h5ds-ico h5ds-ico-fabu" /> 预览/发布
        </a>
        <H5dsModal className="h5ds-modal-source" forceRender={true} show={show} close={this.onClose}>
          {['pc', 'ppt'].includes(data.type) ? (
            <PcPreview
              downCode={this.downCode}
              appId={this.props.scope.options.appId}
              publishApp={this.publishApp}
              close={this.onClose}
              scope={this.props.scope}
              saveApp={this.saveApp}
              data={data}
            />
          ) : (
            <PhonePreview
              downCode={this.downCode}
              appId={this.props.scope.options.appId}
              publishApp={this.publishApp}
              close={this.onClose}
              scope={this.props.scope}
              saveApp={this.saveApp}
              data={data}
            />
          )}
        </H5dsModal>
      </div>
    );
  }
}

export default Publish;
