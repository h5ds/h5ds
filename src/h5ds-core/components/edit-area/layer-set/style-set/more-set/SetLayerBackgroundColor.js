import React, { Component } from 'react';
import { bindSelf, util } from '../../../../../utils';
import { extendObservable, transaction } from 'mobx';
import { inject, observer } from 'mobx-react';

import { SetColor } from '../../../../../../h5ds-components/color';
import { SetGrid } from '../../../../../../h5ds-components/item';

@inject('h5ds')
@observer
class SetLayerBackgroundColor extends Component {
  constructor(props) {
    super(props);
    this.layer = props.h5ds.getLayer();
    const { backgroundColor = 'rgba(0,0,0,1)' } = this.layer.estyle;
    this.state = { backgroundColor };
  }

  setLayer = util.debounce(() => {
    const { backgroundColor } = this.state;
    const { estyle } = this.layer;
    transaction(() => {
      if (estyle.backgroundColor === undefined) {
        extendObservable(estyle, { backgroundColor });
      } else {
        estyle.backgroundColor = backgroundColor;
      }
      this.props.h5ds.edata.keys = util.randomID();
      window.pubSubEditor.publish('h5ds.setHistory');
    });
  }, 200);

  @bindSelf
  changeColor(color) {
    const { r, g, b, a } = color.rgb;
    this.setState({ backgroundColor: `rgba(${r},${g},${b},${a})` }, this.setLayer);
  }

  render() {
    const { backgroundColor } = this.state;
    this.layer.estyle.backgroundColor;
    return (
      <SetGrid span={1}>
        <SetColor title="背景颜色" color={backgroundColor} onChange={this.changeColor} />
      </SetGrid>
    );
  }
}
export default SetLayerBackgroundColor;
