import React, { Component } from 'react';
import { SetGrid, SetItem } from '../../../../../../h5ds-components/item';
import { bindSelf, util } from '../../../../../utils';
import { extendObservable, transaction } from 'mobx';
import { inject, observer } from 'mobx-react';

import { Switch } from 'antd';

@inject('h5ds')
@observer
class SetLayerHide extends Component {
  constructor(props) {
    super(props);
    this.layer = props.h5ds.getLayer();
    const display = this.layer.style.display || 'block';
    this.state = { hide: display === 'none' ? true : false };
  }

  @bindSelf
  setLayer() {
    const { hide } = this.state;
    const { style } = this.layer;
    let display = 'block';
    if (hide) {
      display = 'none';
    }
    transaction(() => {
      if (style.display === undefined) {
        extendObservable(style, { display });
      } else {
        style.display = display;
      }
      this.props.h5ds.edata.keys = util.randomID();
      window.pubSubEditor.publish('h5ds.setHistory');
    });
  }

  @bindSelf
  changeColor(hide) {
    this.setState({ hide }, this.setLayer);
  }

  render() {
    const { hide } = this.state;
    this.layer.style.display;
    return (
      <SetGrid span={1}>
        <SetItem name="隐藏元素">
          <Switch onChange={this.changeColor} checked={hide} />
        </SetItem>
      </SetGrid>
    );
  }
}
export default SetLayerHide;
