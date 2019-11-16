import './layerlist.less';

import React, { Component } from 'react';
import { bindSelf, util } from '../../utils';
import { dragGroupEvent, setGroupControl } from '../layer-group';
import { inject, observer } from 'mobx-react';

import { message } from 'antd';
import { transaction } from 'mobx';

@inject('h5ds', 'scope')
@observer
class LayerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
      editLayerName: '', // 编辑名称用
      editLayerIndex: null // 记录修改名字的layer下标
    };
  }

  /**
   * @desc 复制图层操作
   * @param {event} e 事件event
   * @param {number} index 拷贝页面下标，从0开始
   */
  @bindSelf
  copyLayer(e, index) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    this.props.h5ds.copyLayer(index);
    window.pubSubEditor.publish('h5ds.setHistory');
  }

  /**
   * @desc 选中layer的时候，需要设置图层编辑
   * @param {number} index 选中的下标
   * @param {event} e 事件
   */
  @bindSelf
  setLayer(index, e) {
    if (!e) {
      return;
    }

    if ($(e.currentTarget).find('.h5ds-layerlist-locklayer-active')[0]) {
      message.warn('请先解锁图层');
      return;
    }

    // 如果是点住ctrl 不放开。进入组的选择模式
    if (e && e.ctrlKey) {
      const { edata, getPageDom, getPageLayerDom, getLayers } = this.props.h5ds;
      transaction(() => {
        // 如果不是组模式，开始组模式
        if (!edata.selectGroup) {
          edata.selectGroup = [];
          const $control = getPageDom().find('.h5ds-control');
          // 判断之前是否有选中一个
          if ($control[0]) {
            edata.selectGroup.push(edata.selectLayer);
          }
        }

        // 如果二次点击，取消选中
        if (edata.selectGroup.indexOf(index) === -1) {
          edata.selectGroup.push(index);
        } else {
          edata.selectGroup.splice(edata.selectGroup.findIndex(v => v === index), 1);
        }

        // 如果是选择组，先去重
        edata.selectGroup = [...new Set(edata.selectGroup)];
        if (edata.selectGroup.length > 1) {
          edata.selectLayer = null;
          edata.setType = 'group';
        }
        // 设置 control
        setGroupControl(getPageDom, edata.selectGroup);
        dragGroupEvent(getLayers, getPageLayerDom, edata);
      });
    } else {
      transaction(() => {
        this.props.h5ds.edata.selectGroup = false;
        this.props.h5ds.setLayer(index);
        window.pubSubEditor.publish('h5ds.initControl'); // 实例化控制器
      });
    }
  }

  /**
   * 删除layer
   * @param {event} e 事件event对象
   * @param {number} index 要删除的layer的下标
   */
  @bindSelf
  delLayer(e, index) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    transaction(() => {
      this.props.h5ds.delLayer(index);
      window.pubSubEditor.publish('h5ds.setHistory');
    });
  }

  /**
   * 隐藏，显示layer
   * @param {event} e 事件event对象
   * @param {object} elem layer对象
   */
  @bindSelf
  viewLayer(e, elem) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    transaction(() => {
      elem.set.hide = !elem.set.hide;
      this.props.h5ds.edata.layerListKeys = util.randomID();
      this.props.h5ds.updateCanvas();
    });
  }

  /**
   * 锁定layer
   * @param {event} e 事件event对象
   * @param {object} elem layer对象
   */
  @bindSelf
  locklayer(e, elem) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    transaction(() => {
      elem.set.lock = !elem.set.lock;
      this.props.h5ds.edata.layerListKeys = util.randomID();
      this.props.h5ds.edata.keys = util.randomID();
      window.pubSubEditor.publish('h5ds.destoryControl');
    });
  }

  /**
   * 显示或者隐藏列表
   */
  @bindSelf
  showList() {
    let { show } = this.state;
    show = !show;
    this.setState({ show });
  }

  /**
   * 修改名字的时候，失去光标焦点之后，去掉input框
   */
  @bindSelf
  onBlurName(e, elem) {
    elem.name = e.target.value;
    this.setState({ editLayerIndex: null, editLayerName: '' });
  }

  /**
   * input框
   * @param {event} e 事件event
   */
  @bindSelf
  onChangeName(e) {
    this.setState({ editLayerName: e.target.value });
  }

  /**
   * 双击名字
   * @param {editLayerIndex} index 双击的layer下标   *
   */
  @bindSelf
  onDoubleClickChangeName(e, index, elem) {
    e.stopPropagation();
    this.setState({ editLayerIndex: index, editLayerName: elem.name || elem.type });
  }

  componentDidMount() {
    // 拖动排序
    $('#h5dsLayerList').on('uniqend', (e, data) => {
      e.stopPropagation();
      this.props.h5ds.exChangeLayer(data.from, data.to);
      this.setLayer(data.to);
    });
  }

  componentWillUnmount() {
    $('#h5dsLayerList').off('uniqend');
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    let { selectLayer, layerListKeys, selectPage, selectFixed, selectPopup, selectType, selectGroup } = this.props.h5ds.edata;
    const { show, editLayerIndex, editLayerName } = this.state;
    let layers = this.props.h5ds.getLayers() || [];
    return (
      <div
        className="h5ds-layerlist h5ds-js-layerlist h5ds-drag"
        data-dragset={`{"limit":true, "undrag":["#h5dsLayerList"]}`}
      >
        <h1 className="h5ds-global-clearfix">
          <i className="h5ds-ico h5ds-ico-caidan" />
          <span>图层列表</span>
          <a onClick={this.showList}>
            <i className="h5ds-ico h5ds-ico-a1down" />
          </a>
        </h1>
        <ul id="h5dsLayerList" className="h5ds-uniqlist" style={{ display: show ? 'block' : 'none' }}>
          {layers.length > 0 ? (
            layers.map((elem, index) => {
              const vCName = ['h5ds-layerlist-showlayer'];
              const lCName = ['h5ds-layerlist-locklayer'];
              if (elem.set.hide) {
                vCName.push('h5ds-layerlist-hidelayer-active');
              }
              if (elem.set.lock) {
                lCName.push('h5ds-layerlist-locklayer-active');
              }
              const classActive = ['h5ds-js-layerlist-item'];

              // 如果是选择多个
              if (selectGroup) {
                if (selectGroup.indexOf(index) !== -1) {
                  classActive.push('h5ds-layerlist-active');
                }
              } else if (selectLayer === index) {
                classActive.push('h5ds-layerlist-active');
              }
              let name = elem.name;
              if((!name || name === '文本') && elem.pid === 'h5ds_text') {
                name = elem.data.data.substring(0, 12) || '文本';
              }
              return (
                <li
                  onClick={e => this.setLayer(index, e)}
                  data-keyid={elem.keyid}
                  key={elem.keyid}
                  className={classActive.join(' ')}
                >
                  <a onClick={e => this.viewLayer(e, elem)} className={vCName.join(' ')}>
                    <i className="h5ds-ico h5ds-ico-yanjing" />
                  </a>
                  <span className="name" onDoubleClick={e => this.onDoubleClickChangeName(e, index, elem)}>
                    {editLayerIndex === index ? (
                      <input
                        onBlur={e => this.onBlurName(e, elem)}
                        value={editLayerName}
                        onChange={this.onChangeName}
                      />
                    ) : (
                      name || elem.pid
                    )}
                  </span>
                  <a onClick={e => this.delLayer(e, index, elem)} className="h5ds-layerlist-dellayer" title="删除图层">
                    <i className="h5ds-ico h5ds-ico-icodel" />
                  </a>
                  <a onClick={e => this.copyLayer(e, index)} className="h5ds-layerlist-copylayer" title="复制图层">
                    <i className="h5ds-ico h5ds-ico-fuzhi" />
                  </a>
                  <a onClick={e => this.locklayer(e, elem)} className={lCName.join(' ')} title="锁定图层">
                    <i className="h5ds-ico h5ds-ico-suo" />
                  </a>
                </li>
              );
            })
          ) : (
            <li className="h5ds-layerlist-null">
              <span>暂无图层</span>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default LayerList;
