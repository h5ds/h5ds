import './gridset.less';

import { Popover, Radio, Switch } from 'antd';
import React, { Component } from 'react';
import { bindSelf } from '../../../utils';
import { inject, observer } from 'mobx-react';

@inject('h5ds')
@observer
class GridSet extends Component {
  // 显示网格
  @bindSelf
  showGrid() {
    window.pubSubEditor.publish('h5ds.show.grid');
  }

  // 变化网格
  @bindSelf
  changeGridSize(e) {
    let val = e.target.value;
    this.props.h5ds.edata.gridSize = val;
  }

  // 开启吸附
  @bindSelf
  adsorbGrid() {
    let { gridAdsorb } = this.props.h5ds.edata;
    this.props.h5ds.edata.gridAdsorb = !gridAdsorb;
  }

  render() {
    const RadioButton = Radio.Button;
    const RadioGroup = Radio.Group;
    const { edata } = this.props.h5ds;
    return (
      <Popover
        placement="left"
        title="网格设置"
        content={
          <div className="h5ds-gridset">
            <div className="h5ds-gridset-item">
              <span>网格开关：</span>
              <Switch defaultChecked={false} onChange={this.showGrid} />
            </div>
            <div className="h5ds-gridset-item">
              <span>网格密度：</span>
              <RadioGroup value={edata.gridSize} onChange={this.changeGridSize} size="small">
                <RadioButton value={5}>5</RadioButton>
                {/* 64格 */}
                <RadioButton value={8}>8</RadioButton>
                {/* 40格 */}
                <RadioButton value={10}>10</RadioButton>
                {/* 32格 */}
                <RadioButton value={16}>16</RadioButton>
                {/* 20格 */}
                <RadioButton value={20}>20</RadioButton>
                {/* 16格 */}
                <RadioButton value={32}>32</RadioButton>
                {/* 10格 */}
                <RadioButton value={40}>40</RadioButton>
                {/* 8格 */}
                <RadioButton value={80}>80</RadioButton>
                {/* 4格 */}
              </RadioGroup>
            </div>
            <div className="h5ds-gridset-item">
              <span>网格吸附：</span>
              <Switch defaultChecked={edata.gridAdsorb} onChange={this.adsorbGrid} />
            </div>
          </div>
        }
        trigger="click"
      >
        <span>
          <a>
            <i className="h5ds-ico h5ds-ico-wangge" />
          </a>
          <span>显示网格</span>
        </span>
      </Popover>
    );
  }
}

export default GridSet;
