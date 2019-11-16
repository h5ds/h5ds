import React, { Component } from 'react';
import { SetGrid, SetItem } from '../../../../../../h5ds-components/item';
import { bindSelf, csstool, util } from '../../../../../utils';
import { extendObservable, transaction } from 'mobx';
import { inject, observer } from 'mobx-react';

import { ReactColor } from '../../../../../../h5ds-components/color';
import SliderGroup from '../../../../../../h5ds-components/slider-group';
import { Switch } from 'antd';

/**
 * @desc 设置边框的样式， border 在 estyle 里面。
 */
@inject('h5ds')
@observer
class SetBoxShadow extends Component {
  constructor(props) {
    super(props);
    this.layer = props.h5ds.getLayer();
    const { estyle } = this.layer;
    const { size = null, color } = csstool.getBoxshadow(estyle.boxShadow);
    this.state = {
      bsize: size, // 阴影尺寸
      bcolor: color // 颜色
    };
  }

  setLayer = util.debounce(() => {
    const { bsize, bcolor = 'rgba(0,0,0,1)' } = this.state;
    const { estyle } = this.layer;
    const { edata } = this.props.h5ds;
    transaction(() => {
      // if border is undefined，add
      if (util.isEmpty(estyle.boxShadow)) {
        extendObservable(estyle, {
          boxShadow: `0 0 ${bsize}px ${bcolor}`
        });
      } else {
        estyle.boxShadow = csstool.setBoxshadow(estyle.border, { size: bsize, color: bcolor });
      }
      if (bsize === null) {
        estyle.boxShadow = 'none';
      }
      edata.keys = util.randomID();
      window.pubSubEditor.publish('h5ds.setHistory');
    });
  }, 500);

  @bindSelf
  sliderChange(bsize) {
    const { bcolor = 'rgba(0,0,0,1)' } = this.state;
    const { estyle } = this.layer;
    const boxShadow = csstool.setBoxshadow(estyle.border, { size: bsize, color: bcolor });
    this.props.h5ds
      .getLayerDom()
      .find('.element')
      .css('box-shadow', boxShadow);

    this.setState({ bsize }, this.setLayer);
  }

  @bindSelf
  switchDo(val) {
    if (val) {
      this.setState({ bsize: 2, bcolor: 'rgba(0,0,0,1)' }, this.setLayer);
    } else {
      this.setState({ bsize: null }, this.setLayer);
    }
  }

  @bindSelf
  setColor(val) {
    const { r, g, b, a = 1 } = val.rgb;
    this.setState({ bcolor: `rgba(${r},${g},${b},${a})` }, this.setLayer);
  }

  componentDidMount() {
    $('.h5ds-scroll-SetBoxShadow').on('mousewheel.h5ds.SetBoxShadow', e => {
      e.preventDefault();
      let bsize = e.originalEvent.deltaY < 0 ? -1 : 1;
      bsize = this.state.bsize + bsize;
      if (bsize < 0) {
        bsize = 0;
      } else if (bsize > 100) {
        bsize = 100;
      }
      this.setState({ bsize }, this.setLayer);
    });
  }

  componentWillUnmount() {
    $('.h5ds-scroll-SetBoxShadow').off('mousewheel.h5ds.SetBoxShadow');
  }

  render() {
    const { bsize, bcolor } = this.state;
    return (
      <div>
        <SetGrid>
          <SetItem name="开启阴影">
            <Switch onChange={this.switchDo} checked={bsize ? true : false} />
          </SetItem>
        </SetGrid>
        {bsize !== null ? (
          <React.Fragment>
            <SetItem name="阴影设置">
              <SliderGroup
                mouseWheelClassName="h5ds-scroll-SetBoxShadow"
                onChange={this.sliderChange}
                value={bsize}
                min={0}
                max={100}
              />
            </SetItem>
            <SetItem name="阴影颜色">
              <ReactColor onChange={this.setColor} color={bcolor} />
            </SetItem>
          </React.Fragment>
        ) : null}
      </div>
    );
  }
}
export default SetBoxShadow;
