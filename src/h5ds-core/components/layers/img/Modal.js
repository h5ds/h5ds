import './modal.less';

import React, { Component } from 'react';
import { bindSelf } from '../../../utils';

import { Button } from 'antd';
import H5dsModal from '../../../../h5ds-components/h5ds-modal';
import NoServerModal from './NoServerModal';

/**
 * @desc 图片资源弹窗，该图库资源在多个地方使用
 */
export default class SourceModal extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }

  @bindSelf
  hideModal() {
    this.setState({
      visible: false
    });
  }

  @bindSelf
  selectPicture(elem = {}) {
    if (this.selectImgCallback) {
      this.selectImgCallback(elem.url);
    }
    this.hideModal();
  }

  componentDidMount() {
    /**
     * @desc 该订阅事件为了让图片选框进行公用，
     * @param {function} callback 选择图片的回调函数
     */
    window.pubSubEditor.subscribe('h5ds.img.modal.show', data => {
      const { callback = null } = data;
      this.selectImgCallback = callback;
      this.setState({ visible: true });
    });
  }

  componentWillUnmount() {
    window.pubSubEditor.unsubscribe('h5ds.img.modal.show');
  }

  render() {
    const { options = {} } = this.props.scope;
    return (
      <H5dsModal
        className="h5ds-modal-source"
        close={this.hideModal}
        title={
          <div>
            图片库{' '}
            <Button onClick={this.hideModal} className="h5ds-modal-close-button">
              关闭窗口
            </Button>
          </div>
        }
        show={this.state.visible}
      >
        {options.imageSourceModal ? <options.imageSourceModal select={this.selectPicture} /> : <NoServerModal notRender={true} select={this.selectPicture} />}
      </H5dsModal>
    );
  }
}
