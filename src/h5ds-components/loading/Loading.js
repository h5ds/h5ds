import './loading.less';

import React, { Component } from 'react';

/**
 * @desc 全屏的loading插件
 */
export default class Loading extends Component {
  render() {
    const { tips, body = null } = this.props;
    return (
      <div className="h5ds-loading-window">
        {body ? (
          body
        ) : (
          <div className="h5ds-loading-center">
            <div className="h5ds-loadbox">{tips ? tips : 'loading...'}</div>
          </div>
        )}
      </div>
    );
  }
}
