import './header.less';

import { Popconfirm, Radio } from 'antd';
import React, { Component } from 'react';
import { bindSelf, util } from '../../utils';
import { inject, observer } from 'mobx-react';

import LayerMenu from '../layer-menu';
import Publish from '../publish';
import { transaction } from 'mobx';

@inject('h5ds', 'scope')
@observer
class Header extends Component {
  // 清除缓存
  @bindSelf
  clears() {
    util.clearStorage('H5DS_APP_DATA');
    util.clearStorage('H5DS_APP_EDATA');
    util.clearStorage('H5DS_APP_ID');
    window.location.reload();
  }

  /**
   * @desc 设置当前编辑的type，比如app, layer, page 等
   * @param {event} e 事件对象
   */
  @bindSelf
  setApp(e) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    window.pubSubEditor.publish('h5ds.destoryControl');
    this.props.h5ds.setType('app');
  }

  // 帮助提示框
  @bindSelf
  help() {
    $.helps({
      show: true,
      data: [
        {
          dom: '.h5ds-js-h5set',
          content: '【整体设置】点击此处设置H5页面的整体内容：背景，主图，介绍, 背景音乐，加载效果等',
          pos: 'bottom'
        },
        { dom: '.h5ds-js-clearlocal', content: '【清除缓存】这里清除本地缓存', pos: 'bottom' },
        {
          dom: '.h5ds-js-publish',
          content: '【预览/发布】做好之后，发布应用点击这里发布应用或者预览应用，全部OK后生成二维码',
          pos: 'bottom'
        },
        {
          dom: '.h5ds-js-pagelist',
          content: '【页面列表】此处主要展示页面的列表，也可以在【模板中心】中选择模板进行页面添加',
          pos: 'right'
        },
        {
          dom: '.h5ds-js-temps',
          content: '【模板中心】所有页面模板都在这里了，你可以选择系统提供的模板，也可以选择自己保存的模板',
          pos: 'right'
        },
        {
          dom: '.h5ds-js-layermenu',
          content: '【图层】页面里面所有的元素叫做图层，你可以在这里选择需要创建的图层，也可以点击“。。。”展开图层，选择更多图层',
          pos: 'bottom'
        },
        {
          dom: '.h5ds-js-setting',
          content: '【设置区域】只需要记住，页面，图层，动画，交互等任何设置相关的操作都在这里进行就可以了。顶部会显示：当前选中的对象',
          pos: 'left'
        },
        { dom: '.h5ds-js-canvas', content: '【可视化区域】页面的可视化界面，所见即所得', pos: 'left' },
        {
          dom: '.h5ds-js-layerlist',
          content: '【图层列表】可以展开图层列表，这里有图层相关的一些操作！',
          pos: 'bottom'
        },
        {
          dom: '.h5ds-js-shortcut',
          content:
            '【快捷操作】这里有一些快捷操作的方法 <br/>【ctrl+s 保存预览APP】<br/>【ctrl+z 撤销】<br/>【ctrl+y 恢复】<br/>【ctrl+ - 缩小画布】<br/>【ctrl+ + 放大画布】<br/>【ctrl+ p 播放动画】<br/>【ctrl+g 合并图层】<br/>【ctrl+u 取消合并】<br/>【ctrl+ h 显示网格】<br/>【ctrl + d 删除】<br/>【上，下，左，右 微调距离】<br/>【shift + 上，下，左，右 大幅度调距离】',
          pos: 'left'
        }
      ]
    });
  }

  /**
   * @desc 手机和PC编辑器切换的时候，需要设置配置参数，然后更新页面
   * @param {string} type phone, pc
   */
  @bindSelf
  changeAppType(type) {
    transaction(() => {
      this.props.h5ds.data.type = type;
      this.props.scope.resetCanvasSize();
      window.pubSubEditor.publish('h5ds.setHistory');
    });
  }

  componentDidMount() {
    const pageData = this.props.h5ds.getPage();
    if (pageData) {
      this.props.h5ds.edata.pageSize = {
        width: pageData.style.width,
        height: pageData.style.height
      };
    }
  }

  @bindSelf
  onChangeTheme(val) {
    document.querySelector('body').classList.toggle('h5ds-theme-simple');
  }

  render() {
    const { data } = this.props.h5ds;
    const { headerNav } = this.props.scope.options;

    const ReactHeaderNav = headerNav;

    return (
      <div className="h5ds-header">
        <div className="h5ds-logo">
          <a rel="noopener noreferrer" href="http://www.h5ds.com">
            H5
            <span>DS</span>
            <em>power by h5ds</em>
          </a>
        </div>

        <div className="h5ds-h5type">
          <a onClick={() => this.changeAppType('phone')} className={data.type === 'phone' ? ' active' : ''}>
            Phone
          </a>
          <a onClick={() => this.changeAppType('pc')} className={data.type === 'pc' ? ' active' : ''}>
            PC
          </a>
          <a onClick={() => this.changeAppType('horizontal-phone')} className={data.type === 'horizontal-phone' ? ' active' : ''}>
            <i className="h5ds-ico h5ds-ico-hengping" />
          </a>
          <a onClick={() => this.changeAppType('ppt')} className={data.type === 'ppt' ? ' active' : ''}>
            PPT
          </a>
        </div>

        <div className="h5ds-layermenu">
          <LayerMenu />
        </div>

        <div className="h5ds-publish-box">
          {/* <Radio.Group size="small" onChange={this.onChangeTheme} defaultValue="dark">
            <Radio.Button value="dark">黑色</Radio.Button>
            <Radio.Button value="light">白色</Radio.Button>
          </Radio.Group> */}
          <div className="h5ds-h5set">
            <a className="h5ds-basic-btn-min" onClick={this.help}>
              <i className="h5ds-ico h5ds-ico-bangzhu" /> 帮助
            </a>
            &nbsp;
            <a className="h5ds-btn-yellow h5ds-js-h5set" onClick={this.setApp}>
              全局设置
            </a>
          </div>
          &nbsp;
          <Popconfirm
            onConfirm={this.clears}
            title={<div style={{ width: 300 }}>清除缓存后，当前数据将被清空，然后从服务器重新加载数据！是否要清除？</div>}
            okText="确定"
            cancelText="取消"
          >
            <a className="h5ds-basic-btn-min h5ds-js-clearlocal">
              <i className="h5ds-ico h5ds-ico-Icon_huancun" /> 清缓存
            </a>
          </Popconfirm>
          &nbsp;
          <Publish />
          &nbsp;
          {ReactHeaderNav ? <ReactHeaderNav /> : null}
          {/* <a href={config.backUrl} className="h5ds-logout">
            <i className="h5ds-ico h5ds-ico-wangge" /> 返回
          </a> */}
        </div>
      </div>
    );
  }
}

export default Header;
