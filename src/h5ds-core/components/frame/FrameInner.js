import React, { Component } from 'react';

import AdsorbLine from '../adsorb-line'; // 磁力线
import AnimateList from '../animate-list';
import Canvas from '../canvas'; // 画布
import EditArea from '../edit-area'; // 编辑区域
import EventList from '../event-list';
import Header from '../header'; // 顶部
import LayerList from '../layer-list'; // 浮动的图层列表
import LayerMenu from '../layer-menu'; // 图层插件菜单
import PageList from '../page-list'; // 页面列表
import Shortcut from '../shortcut'; // 快捷键方法
import Template from '../template'; // 模版素材
import TimeLine from '../timeline'; // 时间轴
import { shortcuts } from '../../utils'; // 快捷键方法

// import { transaction, toJS } from 'mobx';

/**
 * @desc 此时，data，参数已经就绪了 props 参数如下
 * 参数：data, config, plugins
 * 方法：savePage, saveApp, publishApp
 * react组件：music, template
 */
class FrameInner extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    $('body').addClass('h5ds-edit');
    // 只初始化一次
    if (!this.shortcuts) {
      this.shortcuts = true;
      shortcuts();
    }
  }

  componentWillUnmount() {
    $('body').removeClass('h5ds-edit');
  }

  render() {
    console.log('pluginsKey > ', this.props.scope.pluginsKey);
    const modals = [];
    for (let key in this.props.scope.pluginsKey) {
      const modalComponent = this.props.scope.pluginsKey[key].Modal;
      if (modalComponent) {
        modals.push(modalComponent);
      }
    }

    return [
      <Header key="1" />,
      <Canvas key="2" />,
      <AdsorbLine key="3" />,
      <LayerList key="4" />,
      <LayerMenu key="5" />,
      <PageList key="6" />,
      <Shortcut key="7" />,
      <Template key="8" />,
      <TimeLine key="9" />,
      <AnimateList key="10" />,
      <EventList key="11" />,
      <EditArea key="12" />,
      ...modals.map((Modal, i) => <Modal {...this.props} key={`modal_${i}`} />)
    ];
  }
}

export default FrameInner;
