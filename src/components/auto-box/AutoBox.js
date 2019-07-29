import './auto-box.less';

import React, { Component } from 'react';

import classNames from 'classnames';

export default class AutoBox extends Component {
  render() {
    const { width, height, className, padding = 10, children, style, ...other } = this.props;
    return (
      <div
        {...other}
        style={Object.assign(
          {
            height,
            width,
            padding
          },
          style
        )}
        className={classNames(className, 'auto-box')}
      >
        {children}
      </div>
    );
  }
}
