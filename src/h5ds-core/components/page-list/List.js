import React, { Component } from 'react';
import { bindSelf, util } from '../../utils';
import { config, renderIn } from '../../config';
import { inject, observer } from 'mobx-react';
import { toJS, transaction } from 'mobx';

import { Page } from '../../h5ds-app-preview/pages';
import { Popconfirm } from 'antd';

@inject('h5ds', 'scope')
@observer
class List extends Component {
  constructor(props) {
    super(props);
    this.pages = null;
  }

  /**
   * 切换tab的时候，会设置页面列表
   */
  @bindSelf
  setPages() {
    const { data, edata } = this.props.h5ds;
    this.pages = toJS(data[edata.selectType] || []);
  }

  /**
   * 复制页面
   * @param {event} e 事件
   * @param {number} index 当前复制页面
   */
  @bindSelf
  copyPage(e, index) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    this.props.h5ds.copyPage(index);
    this.setPage(index + 1);
    window.pubSubEditor.publish('h5ds.setHistory');
  }

  /**
   * 删除page
   * @param {event} e 事件
   * @param {number} index 当前要删除的页面
   */
  @bindSelf
  delPage(e, index) {
    e.stopPropagation(); // ...
    e.nativeEvent.stopImmediatePropagation();
    this.props.h5ds.delPage(index);
    window.pubSubEditor.publish('h5ds.setHistory');

    // 删除后，默认选择第一页
    this.setPage(0);
  }

  /**
   * 收藏页面
   */
  @bindSelf
  savePage() {
    $('.h5ds-js-savepage').trigger('click');
  }

  /**
   * 选中页面后，设置页面
   * @param {number} index 选中页面下标
   */
  @bindSelf
  setPage(index, e) {
    e && e.stopPropagation();
    const { edata } = this.props.h5ds;
    const { selectType } = edata;
    window.pubSubEditor.publish('h5ds.destoryControl', {
      pageNum: index,
      selectType
    });
    transaction(() => {
      this.props.h5ds.edata.keys = util.randomID();
      window.pubSubEditor.publish('h5ds.setHistory');
    });

    // 滚动条置顶
    $('.h5ds-center').scrollTop(0);
  }

  @bindSelf
  addPage(e, index) {
    e && e.stopPropagation();
    const data = this.props.h5ds.getNullPage();
    this.props.h5ds.addPage(data, index);
    this.props.h5ds.setHistory();
  }

  @bindSelf
  setFixedsName(index) {
    let name = '';
    switch (index) {
      case 0:
        name = '上层浮动';
        break;
      case 1:
        name = '底层浮动';
        break;
    }
    return name;
  }

  componentDidMount() {
    $('#h5dsPageListId').on('uniqend', (e, data) => {
      this.props.h5ds.exChangePage(data.from, data.to);
      window.pubSubEditor.publish('h5ds.setHistory');
    });

    // 初始化
    this.setPages();
  }

  componentWillUnmount() {
    $('#h5dsPageListId').off('uniqend');
  }

  componentWillReact() {
    console.log('pageList/List.js render');
    this.setPages();
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const { selectType, pageListKeys } = this.props.h5ds.edata;
    let cName = [];
    if (selectType !== 'fixeds') {
      cName.push('h5ds-uniqlist');
    }

    // 选择的页面
    const selectNum = this.props.h5ds.getPageNum();

    // 插件配置，用于渲染插件
    // const plugins = {
    //   pluginsKey: this.props.scope.pluginsKey,
    //   scripts: this.props.scope.scripts
    // };

    console.log('重新渲染pageList.jsx', this.pages && this.pages.length);

    return (
      <ul className={cName.join(' ')} id="h5dsPageListId">
        {this.pages ? (
          this.pages.map((elem, index) => {
            // const { width = 320, height = 514, ...other } = elem.style;
            return (
              <li
                key={elem.keyid}
                style={{ height: 70 }}
                // style={{ height: ['pc', 'ppt'].includes(config.appType) ? 70 : 160 }}
                className={'h5ds-pagelist-page-item' + (selectNum === index ? ' h5ds-pagelist-active' : '')}
              >
                <div className="h5ds-pagelist-page-content" onClick={e => this.setPage(index, e)}>
                  {selectType === 'fixeds' && <div className="h5ds-pagelist-fixeds-info">{this.setFixedsName(index)}</div>}
                  <div className="h5ds-page-name">
                    <span>{index + 1}</span>
                    {elem.name}
                  </div>
                  {/* <div
                    className="h5ds-page-min"
                    style={{
                      transform: `scale(${100 / width})`,
                      width,
                      height,
                      ...other
                    }}
                  >
                    <Page plugins={plugins} data={elem} renderIn={renderIn.RENDER_IN_PAGELIST} />
                  </div> */}
                </div>
                <div className="h5ds-pagelist-page-info">
                  {selectType !== 'fixeds' && [
                    <a key="1" onClick={e => this.copyPage(e, index)} className="h5ds-pagelist-copy-page" title="复制页面">
                      <i className="h5ds-ico h5ds-ico-fuzhi" />
                    </a>,
                    <a key="2" onClick={e => e.nativeEvent.stopImmediatePropagation()} className="h5ds-pagelist-del-page" title="删除页面">
                      <Popconfirm placement="rightBottom" title="是否删除该页面？" onConfirm={e => this.delPage(e, index)}>
                        <i className="h5ds-ico h5ds-ico-icodel" />
                      </Popconfirm>
                    </a>
                  ]}
                  {/* <a onClick={e => this.savePage(e, index)} className="h5ds-pagelist-save-page" title="收藏页面">
                    <i className="h5ds-ico h5ds-ico-shoucang" />
                  </a> */}
                  <a onClick={e => this.addPage(e, index)} className="h5ds-pagelist-add-page" title="添加页面">
                    <i className="h5ds-ico h5ds-ico-jia" />
                  </a>
                </div>
              </li>
            );
          })
        ) : (
          <div className="h5ds-pagelist-loading">页面载入中...</div>
        )}
      </ul>
    );
  }
}

export default List;
