import './layermenu.less';

import React, { Component } from 'react';
import { bindSelf, util } from '../../utils';
import { inject, observer } from 'mobx-react';

import H5dsModal from '../../../h5ds-components/h5ds-modal';
import PluginItem from './PluginItem';
import { message } from 'antd';

// import { transaction } from 'mobx';

@inject('h5ds', 'scope')
@observer
class LayerMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      width: window.innerWidth,
      layerMenus: [] // 菜单
    };
    this.eventId = util.randomID();
  }

  /**
   * 添加模块
   */
  @bindSelf
  addLayer(pid, ...arg) {
    // 先销毁控制器
    window.pubSubEditor.publish('h5ds.destoryControl');
    this.setState({
      visible: false
    });
    const h5ds = this.props.h5ds;
    const { pluginsKey } = this.props.scope;
    const data = h5ds.getJsonByPid(pluginsKey, pid, ...arg);

    // 点击icon触发的事件
    const selectIcon = pluginsKey[pid] ? pluginsKey[pid].selectIcon : false;

    // 设置初始位置
    if (data.pid !== 'h5ds_shape') {
      const { left, top } = h5ds.addLayerGetCenterPosition(data);
      data.style.left = left;
      data.style.top = top;
    }

    // 添加图层
    const addLayerFun = () => {
      h5ds.addLayer(data);
      h5ds.edata.keys = util.randomID();
      h5ds.setLayer(0);
    };
    // 如果 selectIcon 没传的情况
    if (selectIcon === undefined) {
      addLayerFun();
    } else if (selectIcon instanceof Promise) {
      selectIcon({ pid, ...this.props })
        .then(() => {
          addLayerFun();
        })
        .fail(err => {
          console.warn('layer添加错误', err);
          message.error('添加layer错误！');
        });
    } else {
      // 外部传入的函数
      selectIcon({ pid, ...this.props });
    }
  }

  /**
   * 初始化菜单数据
   */
  @bindSelf
  initLayerMenusData() {
    const layerMenus = [];
    const { plugins } = this.props.scope;
    plugins.forEach(d => {
      const { name, icon, pid } = d;

      // 如果是合并图层，不放到初始化菜单
      if (pid !== 'h5ds_combin') {
        layerMenus.push({ name, icon, pid });
      }
    });
    this.setState({ layerMenus });
  }

  @bindSelf
  showModal() {
    this.setState({ visible: true });
  }

  @bindSelf
  closeModal() {
    this.setState({ visible: false });
  }

  componentDidMount() {
    // 初始化菜单列表
    this.initLayerMenusData();

    $(window).on('resize.h5ds.layermenu', () => {
      this.setState({ width: window.innerWidth });
    });
  }

  componentWillUnmount() {
    $(window).off('resize.h5ds.layermenu');
  }

  render() {
    const { visible, layerMenus, width } = this.state;

    return (
      <div className="h5ds-layermenu-inner h5ds-js-layermenu">
        <ul className="h5ds-layermenu-moreuse">
          {width > 1340
            ? layerMenus.map((elem, index) => {
                if (index > 5) {
                  return null;
                }
                return (
                  <li key={index} className="fun" onClick={() => this.addLayer(elem.pid)}>
                    <a>
                      {elem.icon || <i className="h5ds-ico h5ds-ico-domnode" />}
                      <span>{elem.name}</span>
                    </a>
                  </li>
                );
              })
            : null}
          <li className="fun">
            <a onClick={this.showModal}>
              <i className="h5ds-ico h5ds-ico-icon3" />
              <span>扩展</span>
            </a>
          </li>
        </ul>
        <H5dsModal className="h5ds-modal-plus" show={visible} title="插件扩展" close={this.closeModal}>
          <div className="h5ds-plugins">
            {layerMenus.map((elem, index) => {
              return <PluginItem set="禁用" onClick={() => this.addLayer(elem.pid)} data={elem} key={index} />;
            })}
          </div>
        </H5dsModal>
      </div>
    );
  }
}

export default LayerMenu;
