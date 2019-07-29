import './loading.less';

import React, { Component } from 'react';

import { Spin } from 'antd';

export default class Loading extends Component {
  render() {
    const { tip = 'Loading...' } = this.props;
    return (
      <div className="cmp-loading">
        <Spin tip={tip} />
      </div>
    );
  }
}
