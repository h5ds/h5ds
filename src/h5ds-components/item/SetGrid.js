import './setgrid.less';

import React, { Component } from 'react';

export default class SetGrid extends Component {
    render() {
        const { children, span = 1 } = this.props;
        const cName = ['h5ds-layout-setgrid', `h5ds-layout-setgrid-${span}`];
        return <div className={cName.join(' ')}>{children}</div>;
    }
}
