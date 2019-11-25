import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import AdsorbSet from './adsorb-set';
import BasicSet from './basic-set';
import MoreSet from './more-set';
import { bindSelf } from '../../../../utils';
import { message } from 'antd';

@inject('h5ds', 'scope')
@observer
class StyleSet extends Component {
  @bindSelf
  doRender() {
    let dom = null;
    const layer = this.props.h5ds.getLayer();
    const plugin = this.props.scope.pluginsKey[layer.pid];
    if (plugin) {
      dom = plugin.Editor || null;
    } else {
      message.error(`无${layer.name}:${layer.pid}图层！`);
    }
    return dom;
  }

  render() {
    const layer = this.props.h5ds.getLayer();
    if (!layer) {
      return null;
    }
    const ReactEditor = this.doRender();
    return (
      <div key={layer.keyid}>
        <BasicSet />
        <AdsorbSet />
        {ReactEditor ? <ReactEditor scope={this.props.scope} h5ds={this.props.h5ds} layer={layer} /> : null}
        <MoreSet />
      </div>
    );
  }
}
export default StyleSet;
