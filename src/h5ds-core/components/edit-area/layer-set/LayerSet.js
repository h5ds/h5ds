import './layerset.less';

import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import AnimateSet from './animate-set'; // 动画设置
import LayerEvent from './layer-event'; // 交互
import StyleSet from './style-set'; // 样式设置
import { Tabs } from 'antd'; ///
import { bindSelf } from '../../../utils';
import { transaction } from 'mobx';

@inject('h5ds', 'scope')
@observer
class LayerSet extends Component {
  @bindSelf
  changeTabs() {
    transaction(() => {
      this.props.h5ds.edata.eventListShow = false;
      this.props.h5ds.edata.animateListShow = false;
    });
  }

  render() {
    const h5ds = this.props.h5ds;
    const selectlayerKeys = h5ds.edata.selectlayerKeys;
    const layer = h5ds.getLayer();
    if (!layer) {
      // 当么有选择layer的时候，销毁DOM，释放内存
      return null;
    }
    const { editorConfig = {} } = this.props.scope.pluginsKey[layer.pid] || {};
    const TabPane = Tabs.TabPane;
    return (
      <div className="h5ds-layerset">
        <div className="h5ds-layerset-tabsbox">
          <Tabs className="h5ds-layerset-tabs" onChange={this.changeTabs} defaultActiveKey="1">
            <TabPane key="1" tab="图层样式">
              <div className="h5ds-tabs-edit-box">
                <StyleSet key={selectlayerKeys + '1'} />
              </div>
            </TabPane>
            {editorConfig.animate !== false && (
              <TabPane key="2" tab="图层动画">
                <div className="h5ds-tabs-edit-box">
                  <AnimateSet key={selectlayerKeys + '2'} />
                </div>
              </TabPane>
            )}
            {editorConfig.layerEvent !== false && (
              <TabPane key="3" tab="图层交互">
                <div className="h5ds-tabs-edit-box">
                  <LayerEvent key={selectlayerKeys + '3'} />
                </div>
              </TabPane>
            )}
          </Tabs>
        </div>
      </div>
    );
  }
}

export default LayerSet;
