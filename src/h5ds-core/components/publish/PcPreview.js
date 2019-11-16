import React, { Component } from 'react';
import { bindSelf, util } from '../../utils';
import { config, renderIn } from '../../config';
import { inject, observer } from 'mobx-react';

import { Button } from 'antd';
import H5dsSwiper from '../../h5ds-app-preview/swiper';

@inject('h5ds', 'scope')
@observer
class PcPreview extends Component {
  state = {
    url: '',
    keys: +new Date(),
    isTemporaryUrl: false
  };

  @bindSelf
  reRender() {
    this.setState({ keys: +new Date() });
  }

  @bindSelf
  publishApp() {
    this.props.publishApp().then(appId => {
      const { publishHost = '', publishParam, noServer } = this.props.scope.options;
      if (noServer) {
        return;
      }
      // 设置正式的二维码
      let url = `${publishHost}?appId=${appId}`;
      if (publishParam) {
        for (let key in publishParam) {
          url = url + `&${key}=${publishParam[key]}`;
        }
      }
      this.setState({
        url,
        isTemporaryUrl: false
      });
    });
  }

  componentDidMount() {
    window.addEventListener('resize', this.reRender);

    // 如果是ppt，全屏
    if (this.props.data.type === 'ppt') {
      // util.fullScreen();
      setTimeout(() => {
        this.H5SwiperRef.updateSwiper();
      }, 500);
    }
    // 传入临时的认证token获取方法，只10分钟有效
    const { getPrivewToken, publishHost, publishParam, noServer } = this.props.scope.options;
    if (getPrivewToken) {
      if (noServer) {
        return;
      }
      // 先保存，再预览
      console.log('获取临时token');
      this.props.saveApp().then(() => {
        getPrivewToken(this.props.appId).then(auth => {
          // 设置临时二维码
          let url = `${publishHost}?appId=${this.props.appId}&auth=${auth}`;
          if (publishParam) {
            for (let key in publishParam) {
              url = url + `&${key}=${publishParam[key]}`;
            }
          }
          this.setState({
            url,
            isTemporaryUrl: true
          });
        });
      });
    } else {
      console.warn('没有设置临时二维码接口：getPrivewToken');
    }
  }

  componentWillUnmount() {
    if (this.reRender) {
      window.removeEventListener('resize', this.reRender);
    }
    // util.exitFullscreen();
  }

  render() {
    const style = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    // const style = {
    //   width: 720,
    //   height: 1280
    // };
    const { pluginsKey, scripts } = this.props.scope;
    return (
      <div className="h5ds-pc-preview">
        <div className="h5ds-pc-preview-bodyer">
          <H5dsSwiper
            // scale={scale}
            ref={c => (this.H5SwiperRef = c)}
            style={style}
            plugins={{ pluginsKey, scripts }}
            data={this.props.data}
            renderIn={renderIn.RENDER_IN_PREVIEW}
          />
        </div>
        <div className="h5ds-pc-preview-down">
          <Button type="primary" loading={!this.state.url} icon="qrcode">
            {this.state.url ? (
              <a href={this.state.url} rel="noopener noreferrer" target="_blank">
                {this.state.isTemporaryUrl ? '临时URL' : '正式URL'}
              </a>
            ) : (
              'loading...'
            )}
          </Button>
          {this.props.scope.options.downApp ? (
            <this.props.scope.options.downApp appId={this.props.scope.options.appId} />
          ) : (
            <Button onClick={this.props.downCode} type="primary" icon="download">
              下载源码
            </Button>
          )}
          <Button onClick={this.props.close} type="primary" icon="gateway">
            继续编辑
          </Button>
          {this.props.scope.options.AsTemplate ? (
            <this.props.scope.options.AsTemplate appId={this.props.scope.options.appId} data={JSON.stringify(this.props.h5ds.data)} />
          ) : (
            <Button onClick={this.publishApp} type="primary" icon="check-circle">
              确认发布
            </Button>
          )}
        </div>
      </div>
    );
  }
}

export default PcPreview;
