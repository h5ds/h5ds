import './canvas.less';

import React, { Component } from 'react';
import { SetPageHeight, SetPageWidth } from './setsize';
import { inject, observer } from 'mobx-react';

import CanvasView from './CanvasView';
import Grid from './grid';
import Navigator from './navigator';
import RulerLine from './ruler-line';
import { config } from '../../config';

@inject('h5ds', 'scope')
@observer
class Canvas extends Component {
  componentDidMount() {
    /**
     * @desc 窗口缩放的时候，重新设置画布尺寸
     */
    $(window).on('resize.ruler', () => {
      this.props.h5ds.setCanvasSize();
    });
  }

  componentWillUnmount() {
    $(window).off('resize.ruler');
  }

  render() {
    // console.time('canvas-render');
    const { data, edata, getPage } = this.props.h5ds;
    const { phoneScale, canvasHeight, canvasWidth } = edata;
    // eslint-disable-next-line no-unused-vars
    const { width, height, ...other } = data.style;
    const pageData = getPage('pages', edata.selectPage);
    // 当前页面的样式
    const pageStyle = {}; // width: config.appWidth, height: config.appHeight
    if (pageData) {
      Object.assign(pageStyle, { ...pageData.style });
    } else {
      console.error('page不存在:', edata.selectPage);
      return null;
    }

    // 插件配置，用于渲染插件
    const plugins = {
      pluginsKey: this.props.scope.pluginsKey,
      scripts: this.props.scope.scripts
    };

    const left = (canvasWidth - pageData.style.width * phoneScale) / 2;
    const top = (canvasHeight - pageData.style.height * phoneScale) / 2;

    // 不同的类型，设置区域不同
    let pageWidthReact = null;
    let pageHeightReact = null;
    switch (config.appType) {
      case 'phone':
        pageHeightReact = <SetPageHeight height={pageStyle.height} />;
        break;
      case 'pc':
        {
          pageWidthReact = <SetPageWidth width={pageStyle.width} />;
          pageHeightReact = <SetPageHeight height={pageStyle.height} />;
        }
        break;
      case 'horizontal-phone':
        break;
      default:
        break;
    }

    return (
      <div
        className="h5ds-center"
        style={{ height: canvasHeight, width: canvasWidth }}
        onDragStart={e => {
          e.preventDefault();
        }}
      >
        <RulerLine {...{ canvasHeight, canvasWidth, phoneScale, top, left }} />
        <Navigator
          phoneScale={edata.phoneScale}
          page={{ width: pageStyle.width * edata.phoneScale, height: pageStyle.height * edata.phoneScale }}
          {...{ canvasHeight, canvasWidth }}
        />
        <div style={{ height: canvasHeight, width: canvasWidth }} className={'h5ds-canvas' + (edata.banAnimate ? ' h5ds-ban-animate' : '')} id="h5dsCanvas">
          <div
            className="h5ds-canvas-realsize"
            style={{
              left,
              top,
              width: pageData.style.width * phoneScale,
              height: pageData.style.height * phoneScale
            }}
          >
            <div className="h5ds-canvas-box h5ds-js-canvas" style={Object.assign({ ...other }, { transform: `scale(${edata.phoneScale}) translate3d(0,0,0)` })}>
              {config.appType === 'phone' && (
                <div
                  className="h5ds-canvas-lines"
                  style={{
                    width: config.appWidth,
                    height: pageStyle.height
                  }}
                >
                  <div className="h5ds-canvas-lines-iphone678" />
                  <div style={{ top: (pageStyle.height - 640) / 2 < 0 ? (pageStyle.height - 640) / 2 : 0 }} className="h5ds-canvas-lines-iphoneX" />
                </div>
              )}
              <div className="h5ds-canvas-preview h5ds-canvas-app h5ds-js-setsize" id="h5dsCanvasApp" style={{ ...pageStyle }}>
                <Grid width={config.appWidth} height={pageStyle.height} />
                {pageHeightReact}
                {pageWidthReact}
                <CanvasView {...{ plugins, pageData }} />
              </div>
              <div className="h5ds-canvas-border" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Canvas;
