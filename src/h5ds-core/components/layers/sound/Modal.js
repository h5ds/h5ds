// import './modal.less';

import React, { Component } from 'react';
import { bindSelf } from '../../../utils';

import { Button } from 'antd';
import H5dsModal from '../../../../h5ds-components/h5ds-modal';
import NoServerModal from './NoServerModal';

/**
 * @desc 声音资源弹窗，该图库资源在多个地方使用
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
  selectSound(elem = {}) {
    if (this.selectSoundCallback) {
      this.selectSoundCallback(elem);
    }
    this.hideModal();
  }

  componentDidMount() {
    /**
     * @desc 该订阅事件为了让图片选框进行公用，
     * @param {function} callback 选择图片的回调函数
     */
    window.pubSubEditor.subscribe('h5ds.sound.modal.show', data => {
      const { callback = null } = data;
      this.selectSoundCallback = callback;
      this.setState({ visible: true });
    });
  }

  componentWillUnmount() {
    window.pubSubEditor.unsubscribe('h5ds.sound.modal.show');
  }

  render() {
    const { options = {} } = this.props.scope;
    return (
      <H5dsModal
        className="h5ds-modal-source"
        close={this.hideModal}
        title={
          <div>
            音乐库{' '}
            <Button onClick={this.hideModal} className="h5ds-modal-close-button">
              关闭窗口
            </Button>
          </div>
        }
        show={this.state.visible}
      >
        {options.soundSourceModal ? <options.soundSourceModal select={this.selectSound} /> : <NoServerModal select={this.selectSound} />}
      </H5dsModal>
    );
  }
}
