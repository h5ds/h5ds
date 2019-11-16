import './moreset.less';

import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import SetBorder from './SetBorder';
import SetBorderRadius from './SetBorderRadius';
import SetBoxShadow from './SetBoxShadow';
import SetLayerBackgroundColor from './SetLayerBackgroundColor';
import SetLayerHide from './SetLayerHide';
import SetOpacity from './SetOpacity';
import SetRotate from './SetRotate';

@inject('h5ds', 'scope')
@observer
class MoreSet extends Component {
  constructor(props) {
    super(props);
    this.layer = props.h5ds.getLayer();
  }

  render() {
    if (!this.layer) {
      return null;
    }
    const { editorConfig = {} } = this.props.scope.pluginsKey[this.layer.pid] || {};
    return (
      <div className="h5ds-layout-moreset">
        {editorConfig.rotate !== false && <SetRotate />}
        {editorConfig.borderRadius !== false && <SetBorderRadius />}
        {editorConfig.opacity !== false && <SetOpacity />}
        {editorConfig.backgroundColor !== false && <SetLayerBackgroundColor />}
        {editorConfig.hide !== false && <SetLayerHide />}
        {editorConfig.shadow !== false && <SetBoxShadow />}
        {editorConfig.border !== false && <SetBorder />}
      </div>
    );
  }
}

export default MoreSet;
