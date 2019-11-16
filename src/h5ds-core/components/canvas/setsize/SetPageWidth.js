import React, { Component } from 'react';
import { bindSelf, util } from '../../../utils';
import { inject, observer } from 'mobx-react';

import { config } from '../../../config';
import { transaction } from 'mobx';

@inject('h5ds')
@observer
class SetPageWidth extends Component {
  constructor(props) {
    super(props);
  }

  /**
   * 拖动滑块，设置宽度
   */
  @bindSelf
  setPageWidth(e) {
    e.stopPropagation();
    const { edata, getPage } = this.props.h5ds;
    const page = getPage();
    if (!page.style.width) {
      page.style.width = config.appWidth;
    }
    let x0 = e.pageX;
    let oldSet = page.style.width; // 屏幕宽度
    let nowSet = page.style.width;
    let phoneScale = edata.phoneScale || 1;

    const $h5dsCanvasApp = $('.h5ds-js-setsize');
    const $pageWidthNum = $('.h5ds-js-setpage-width');

    let minWidth = 0;
    switch (config.type) {
      case 'phone':
        minWidth = config.appWidth;
        break;
      case 'pc':
        minWidth = 0;
        break;
      case 'horizontal-phone':
      case 'ppt':
        minWidth = config.appWidth;
        break;
    }
    $(document)
      .on('mousemove.h5ds.setPageWidth', em => {
        nowSet = parseInt(oldSet + (em.pageX - x0) / phoneScale, 10);
        if (nowSet < minWidth) {
          nowSet = minWidth;
        }
        $h5dsCanvasApp.css({ width: nowSet });
        // $canvasRealsize.css({ left: canvasLeft - ((nowSet - oldSet) / 2) * phoneScale });
        $pageWidthNum.html(nowSet + 'px');
      })
      .on('mouseup.h5ds.setPageWidth', () => {
        transaction(() => {
          // // 子页面全部变
          // page.pages.forEach(d => {
          //   d.style.width = parseInt(nowSet, 10);
          // });
          page.style.width = nowSet;
          edata.pageSize.width = nowSet;
          edata.keys = util.randomID();
          window.pubSubEditor.publish('h5ds.setHistory');
          $(document).off('mousemove.h5ds.setPageWidth mouseup.h5ds.setPageWidth');
        });
      });
  }

  componentDidMount() {
    $(this.btn).on('mousedown', this.setPageWidth);
  }

  componentWillUnmount() {
    $(this.btn).off('mousedown');
  }

  render() {
    const { width } = this.props;
    return (
      <div className="h5ds-setpage-width">
        <span key={width} className="h5ds-setpage-px h5ds-js-setpage-width">
          {width}
          px
        </span>
        <a ref={c => (this.btn = c)} className="h5ds-js-setpage h5ds-setpage-width-btn">
          <i className="h5ds-ico h5ds-ico-shangxiawen" />
        </a>
      </div>
    );
  }
}

export default SetPageWidth;
