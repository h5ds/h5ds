import React, { Component } from 'react';
import { bindSelf, csstool, util } from '../../../../../utils';
import { inject, observer } from 'mobx-react';

import { SetItem } from '../../../../../../h5ds-components/item';
import SliderGroup from '../../../../../../h5ds-components/slider-group';
import { transaction } from 'mobx';

@inject('h5ds')
@observer
class SetRotate extends Component {
  constructor(props) {
    super(props);
    this.layer = props.h5ds.getLayer();
    this.layerdom = props.h5ds.getLayerDom();
    const transform = csstool.getTransform(this.layer.style.transform);
    this.state = {
      rotate: transform.rotate
    };
  }

  setLayer = util.debounce(() => {
    const { rotate } = this.state;
    const { style } = this.layer;
    const transform = csstool.setTransform(style.transform, { rotate });
    transaction(() => {
      style.transform = transform;
      this.props.h5ds.edata.keys = util.randomID();
      window.pubSubEditor.publish('h5ds.setHistory');
    });
    this.isInnerChange = false;
  }, 500);

  componentWillReact() {
    if (this.isInnerChange) {
      return;
    }
    // console.log('外部变化引起的');
    const transform = csstool.getTransform(this.layer.style.transform);
    this.setState({ rotate: transform.rotate });
  }

  @bindSelf
  sliderChange(rotate) {
    this.isInnerChange = true;
    const transform = csstool.setTransform(this.layer.style.transform, { rotate });
    this.layerdom.css('transform', transform);
    this.setState({ rotate }, this.setLayer);
  }

  componentDidMount() {
    $('.h5ds-scroll-SetRotate').on('mousewheel.h5ds.SetRotate', e => {
      e.preventDefault();
      this.isInnerChange = true;
      let rotate = e.originalEvent.deltaY < 0 ? -1 : 1;
      rotate = this.state.rotate + rotate;
      if (rotate < 0) {
        rotate = 0;
      } else if (rotate > 360) {
        rotate = 360;
      }
      this.setState({ rotate }, this.setLayer);
    });
  }

  componentWillUnmount() {
    $('.h5ds-scroll-SetRotate').off('mousewheel.h5ds.SetRotate');
  }

  render() {
    const { rotate } = this.state;
    this.layer.style.transform;
    return (
      <SetItem name="旋转角度">
        <SliderGroup
          mouseWheelClassName="h5ds-scroll-SetRotate"
          onChange={this.sliderChange}
          value={rotate}
          min={0}
          max={360}
        />
      </SetItem>
    );
  }
}
export default SetRotate;
