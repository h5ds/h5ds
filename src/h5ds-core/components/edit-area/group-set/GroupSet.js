import './groupset.less';

import { InputNumber, Tabs } from 'antd'; //
import React, { Component } from 'react';
import { SetGrid, SetItem } from '../../../../h5ds-components/item';
import { bindSelf, csstool, rectMath, util } from '../../../utils'; // 获取外框
import { inject, observer } from 'mobx-react';

import LayersAlign from './LayersAlign';
import { transaction } from 'mobx';

@inject('h5ds')
@observer
class GroupSet extends Component {
  // 给对应的dom排序， 根据 dire 排序。 优化：这里要通过 外框boxWidth进行排序 rectParam
  @bindSelf
  getSortGroups(sortfun) {
    const { getGroups } = this.props.h5ds;
    const groups = getGroups();
    const uniqs = [...groups];
    uniqs.forEach(elem => {
      elem.box = rectMath.rectParamObj(elem.layer);
    });
    if (sortfun) {
      uniqs.sort(sortfun);
    }
    return uniqs;
  }

  // 设置动画间隔时间
  onChangeDelayTime = util.debounce(val => {
    const uniqs = this.getSortGroups();
    transaction(() => {
      let delay0 = null;
      uniqs.forEach(item => {
        const { animate } = item.layer;
        if (animate[0]) {
          // get first animate delay
          if (delay0 === null) {
            delay0 = csstool.getAnimation(animate[0].style).delay;
          } else {
            delay0 += val;
            let d = animate[0];
            d.style = csstool.setAnimation(d.style, { delay: delay0 });
          }
        }
      });
      this.props.h5ds.edata.keys = util.randomID();
    });
  }, 200);

  render() {
    const TabPane = Tabs.TabPane;
    return (
      <div className="h5ds-layerset-tabsbox h5ds-setlayer-group">
        <Tabs defaultActiveKey="1" className="h5ds-tabs">
          <TabPane key="1" tab="组合设置">
            <div className="h5ds-setlayer-group-box">
              <LayersAlign getSortGroups={this.getSortGroups} />
              <SetGrid>
                <SetItem name="动画间隔">
                  <InputNumber
                    size="small"
                    step={0.1}
                    min={0}
                    style={{ width: 80 }}
                    max={Infinity}
                    defaultValue={0}
                    onChange={this.onChangeDelayTime}
                  />
                </SetItem>
              </SetGrid>
            </div>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default GroupSet;
