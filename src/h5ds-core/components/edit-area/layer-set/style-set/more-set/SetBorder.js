import { InputNumber, Select, Switch } from 'antd';
import React, { Component } from 'react';
import { SetGrid, SetItem } from '../../../../../../h5ds-components/item';
import { bindSelf, csstool, util } from '../../../../../utils';
import { extendObservable, transaction } from 'mobx';
import { inject, observer } from 'mobx-react';

import { ReactColor } from '../../../../../../h5ds-components/color';

/**
 * @desc 设置边框的样式， border 在 estyle 里面。
 */
@inject('h5ds')
@observer
class SetBorder extends Component {
  constructor(props) {
    super(props);
    this.layer = props.h5ds.getLayer();
    const { estyle } = this.layer;
    const { size = 0, type, color } = csstool.getBorder(estyle.border);
    this.state = {
      bsize: size, // 边框尺寸
      btype: type, // 边框类型
      bcolor: color // 边框颜色
    };
  }

  // render，set layer
  setLayer = util.debounce(() => {
    const { bsize = 2, btype = 'solid', bcolor = 'rgba(0,0,0,1)' } = this.state;
    const { estyle } = this.layer;
    const { edata } = this.props.h5ds;
    transaction(() => {
      // if border is undefined，add
      if (util.isEmpty(estyle.border)) {
        extendObservable(estyle, {
          border: `${bsize}px ${btype} ${bcolor}`
        });
      } else {
        estyle.border = csstool.setBorder(estyle.border, { size: bsize, type: btype, color: bcolor });
      }
      edata.keys = util.randomID();
      window.pubSubEditor.publish('h5ds.setHistory');
    });
  }, 300);

  @bindSelf
  switchBorder(val) {
    if (val) {
      this.setState({ bsize: 2, btype: 'solid', bcolor: 'rgba(0,0,0,1)' }, this.setLayer);
    } else {
      this.setState({ bsize: 0, btype: 'solid', bcolor: 'rgba(0,0,0,1)' }, this.setLayer);
    }
  }

  @bindSelf
  changeBorderType(value) {
    this.setState({ btype: value }, this.setLayer);
  }

  @bindSelf
  changeBorderSize(val) {
    this.setState({ bsize: val }, this.setLayer);
  }

  @bindSelf
  setBorderColor(val) {
    const { r, g, b, a = 1 } = val.rgb;
    this.setState({ bcolor: `rgba(${r},${g},${b},${a})` }, this.setLayer);
  }

  componentDidMount() {
    $('.h5ds-scroll-SetBorder').on('mousewheel.h5ds.SetBorder', e => {
      e.preventDefault();
      let bsize = e.originalEvent.deltaY < 0 ? -1 : 1;
      bsize = this.state.bsize + bsize;
      if (bsize < 0) {
        bsize = 0;
      }
      this.setState({ bsize }, this.setLayer);
    });
  }

  componentWillUnmount() {
    $('.h5ds-scroll-SetBorder').off('mousewheel.h5ds.SetBorder');
  }

  render() {
    const Option = Select.Option;
    const { bsize = 0, btype, bcolor } = this.state;
    return (
      <div>
        <SetGrid span={1}>
          <SetItem name="开启边框">
            <Switch onChange={this.switchBorder} checked={bsize ? true : false} />
          </SetItem>
        </SetGrid>
        {bsize ? (
          <div>
            <SetGrid span={1}>
              <SetItem name="边框类型">
                <Select
                  size="small"
                  onChange={this.changeBorderType}
                  value={btype || ''}
                  style={{ width: 100 }}
                  placeholder="下拉选择"
                >
                  <Option value="solid">实线</Option>
                  <Option value="double">双线</Option>
                  <Option value="dashed">虚线</Option>
                  <Option value="dotted">点线</Option>
                </Select>
              </SetItem>
            </SetGrid>
            <SetGrid span={2}>
              <SetItem name="边框大小">
                <InputNumber
                  className="h5ds-scroll-SetBorder"
                  size="small"
                  min={1}
                  max={10000}
                  value={bsize}
                  onChange={this.changeBorderSize}
                />
              </SetItem>
            </SetGrid>
            <SetGrid span={2}>
              <SetItem name="边框颜色">
                <ReactColor onChange={this.setBorderColor} color={bcolor} />
              </SetItem>
            </SetGrid>
          </div>
        ) : null}
      </div>
    );
  }
}
export default SetBorder;
