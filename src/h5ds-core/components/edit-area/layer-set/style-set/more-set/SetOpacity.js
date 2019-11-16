import React, { Component } from 'react';
import { extendObservable, transaction } from 'mobx';
import { inject, observer } from 'mobx-react';
import { util } from '../../../../../utils';

import { SetItem } from '../../../../../../h5ds-components/item';
import SliderGroup from '../../../../../../h5ds-components/slider-group';

@inject('h5ds')
@observer
class SetOpacity extends Component {
  constructor(props) {
    super(props);
    this.layer = props.h5ds.getLayer();
    this.layerdom = props.h5ds.getLayerDom();
    const opacity = this.layer.style.opacity || 1;
    this.state = { opacity };
  }

  setLayer = util.debounce(() => {
    const { opacity } = this.state;
    const { style } = this.layer;
    transaction(() => {
      if (style.opacity === undefined) {
        extendObservable(style, { opacity });
      } else {
        style.opacity = opacity;
      }
      this.props.h5ds.edata.keys = util.randomID();
      window.pubSubEditor.publish('h5ds.setHistory');
    });
  }, 500);

  sliderChange = opacity => {
    this.layerdom.css('opacity', opacity);
    this.setState({ opacity }, this.setLayer);
  };

  componentDidMount() {
    $('.h5ds-scroll-SetOpacity').on('mousewheel.h5ds.SetOpacity', e => {
      e.preventDefault();
      let opacity = e.originalEvent.deltaY < 0 ? -0.1 : 0.1;
      opacity = this.state.opacity + opacity;
      if (opacity < 0) {
        opacity = 0;
      } else if (opacity > 1) {
        opacity = 1;
      }
      this.setState({ opacity }, this.setLayer);
    });
  }

  componentWillUnmount() {
    $('.h5ds-scroll-SetOpacity').off('mousewheel.h5ds.SetOpacity');
  }

  render() {
    const { opacity } = this.state;
    this.layer.style.opacity;
    return (
      <SetItem name="透明度">
        <SliderGroup
          mouseWheelClassName="h5ds-scroll-SetOpacity"
          onChange={this.sliderChange}
          value={opacity}
          step={0.1}
          min={0}
          max={1}
        />
      </SetItem>
    );
  }
}
export default SetOpacity;
