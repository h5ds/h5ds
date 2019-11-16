import React, { Component } from 'react';
import { bindSelf, util } from '../../../utils';
import { inject, observer } from 'mobx-react';

import { config } from '../../../config';
import { transaction } from 'mobx';

@inject('h5ds')
@observer
class SetPageHeight extends Component {
  constructor(props) {
    super(props);
  }

  @bindSelf
  setPageHei(e) {
    e.stopPropagation();
    const { edata, getPage } = this.props.h5ds;
    const page = getPage();
    if (!page.style.height) {
      page.style.height = config.appHeight;
    }
    let y0 = e.pageY;
    let nowHei = page.style.height;
    let phoneScale = edata.phoneScale;
    const $h5dsCanvasApp = $('.h5ds-js-setsize');
    const $pageHeightNum = $('.h5ds-js-setpage-height');
    // const $canvasRealsize = $('.h5ds-canvas-realsize');
    // let canvasTop = (edata.canvasHeight - page.style.height * phoneScale) / 2;
    const minHeight = config.type === 'phone' ? config.appHeight : 0;
    $(document)
      .on('mousemove.h5ds.setPageHei', em => {
        nowHei = parseInt(page.style.height + (em.pageY - y0) / phoneScale, 10);
        if (nowHei < minHeight) {
          nowHei = minHeight;
        }
        $h5dsCanvasApp.height(nowHei);
        $pageHeightNum.html(nowHei);
        // $canvasRealsize.css({
        //   top: canvasTop - ((nowHei - page.style.height) / 2) * phoneScale
        // });
      })
      .on('mouseup.h5ds.setPageHei', () => {
        transaction(() => {
          page.style.height = nowHei;
          edata.pageSize.height = page.style.height;
          edata.keys = util.randomID();
          window.pubSubEditor.publish('h5ds.setHistory');
          $(document).off('mousemove.h5ds.setPageHei mouseup.h5ds.setPageHei');
        });
      });
  }

  render() {
    const { height } = this.props;
    const { edata } = this.props.h5ds;
    return (
      <div className="h5ds-setpage-height">
        <span key={height} className="h5ds-setpage-px">
          <span className="h5ds-js-setpage-height">{height}</span>
          px [缩放：{edata.phoneScale}]
        </span>
        <a onMouseDown={this.setPageHei} className="h5ds-js-setpage h5ds-setpage-height-btn">
          <i className="h5ds-ico h5ds-ico-shangxiawen" />
        </a>
      </div>
    );
  }
}

export default SetPageHeight;
