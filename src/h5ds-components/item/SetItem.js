import './setitem.less';

import React, { Component } from 'react';

export default class SetItem extends Component {
  render() {
    // compose : subsection or combin
    const { name, children, className = '', compose = 'combin' } = this.props;
    return (
      <div className={`h5ds-layout-setitem h5ds-layout-setitem-${compose} ${className}`}>
        <div className="h5ds-layout-setitem-name">{name}</div>
        <div className="h5ds-layout-setitem-content">{children}</div>
      </div>
    );
  }
}
