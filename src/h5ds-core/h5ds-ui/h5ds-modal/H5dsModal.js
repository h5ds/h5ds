import './h5dsmodal.less';

import React, { Component } from 'react';

import ReactDOM from 'react-dom';
import { bindSelf } from '../../src/utils';

export default class H5dsModal extends Component {
  constructor(props) {
    super(props);
    this.container = document.createElement('div');
    document.body.appendChild(this.container);
  }

  @bindSelf
  onClose() {
    this.props.close && this.props.close();
  }

  componentWillUnmount() {
    document.body.removeChild(this.container);
  }
  render() {
    const { show, title, className, forceRender = false } = this.props;
    const cls = ['h5ds-modal'];
    if (show) {
      cls.push('h5ds-modal-show');
    }
    if (title) {
      cls.push('h5ds-modal-hastitle');
    }
    if (className) {
      cls.push(className);
    }
    return ReactDOM.createPortal(
      <div className={cls.join(' ')}>
        <a className="h5ds-modal-close" onClick={this.onClose}>
          &times;
        </a>
        {title ? (
          <div className="h5ds-modal-title">
            <span className="h5ds-modal-title-icon" />
            <h3>{title}</h3>
          </div>
        ) : null}
        {!forceRender ? <div className="h5ds-modal-content">{this.props.children}</div> : <div className="h5ds-modal-content">{show ? this.props.children : null}</div>}
      </div>,
      this.container
    );
  }
}
