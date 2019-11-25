import { Alert, Button, Input, Modal, Radio } from 'antd';
import React, { Component } from 'react';
import { bindSelf, util } from '../../utils';
import { config, renderIn } from '../../config';
import { inject, observer } from 'mobx-react';

import H5dsSwiper from '../../h5ds-app-preview/swiper';
import PageButton from './PageButton';
import QRCode from 'qrcode.react';

// import { toJS } from 'mobx';

@inject('h5ds', 'scope')
@observer
class PhonePreview extends Component {
  constructor(props) {
    super(props);
    // const { appHeight, appWidth } = config;
    this.state = {
      keys: util.randomID(),
      viewType: 'iphone6',
      url: '', // 默认没有url
      isTemporaryQrcode: false, // 临时二维码
      style: {
        width: 320,
        height: 514
      }
    };

    this.H5SwiperRef = null;
    // 判断是否是模版
    this.isTemplate = util.getUrlQuery('isTemplate');
  }

  // 切换视图
  @bindSelf
  changeViewType(e) {
    this.setState(
      {
        viewType: e.target.value,
        style: {
          width: 320,
          height: e.target.value === 'iphoneX' ? 640 : 514
        }
      },
      this.H5SwiperRef.updateSwiper
    );
  }

  // 替换主图
  @bindSelf
  changeMainImg() {
    window.pubSubEditor.publish('h5ds.img.modal.show', {
      callback: url => {
        this.props.data.img = url;
      }
    });
  }

  @bindSelf
  changeName(e) {
    this.props.data.name = e.target.value;
  }

  @bindSelf
  changeDesc(e) {
    this.props.data.desc = e.target.value;
  }

  @bindSelf
  publishApp() {
    this.props.publishApp().then(appId => {
      const { publishHost, publishParam, noServer } = this.props.scope.options;
      if (noServer) {
        return;
      }
      let url = `${publishHost}?${this.isTemplate ? 'templateId' : 'appId'}=${appId}`;
      if (publishParam) {
        for (let key in publishParam) {
          url = url + `&${key}=${publishParam[key]}`;
        }
      }
      // 设置正式的二维码
      this.setState({
        url,
        isTemporaryQrcode: false
      });
    });
  }

  componentDidMount() {
    // 传入临时的认证token获取方法，只10分钟有效
    const { getPrivewToken, publishHost = '', publishParam, noServer } = this.props.scope.options;
    if (getPrivewToken) {
      // 先保存，再预览
      console.log('获取临时token');
      this.props.saveApp().then(() => {
        getPrivewToken(this.props.appId).then(auth => {
          if (noServer) {
            return;
          }
          // 设置临时二维码
          let url = `${publishHost}?${this.isTemplate ? 'templateId' : 'appId'}=${this.props.appId}&auth=${auth}`;
          if (publishParam) {
            for (let key in publishParam) {
              url = url + `&${key}=${publishParam[key]}`;
            }
          }
          this.setState({
            url,
            isTemporaryQrcode: true
          });
        });
      });
    } else {
      console.warn('没有设置临时二维码接口：getPrivewToken');
    }

    // 延迟设置keys，为了显示 PageButton
    this.settime = setTimeout(() => {
      this.setState({
        keys: util.randomID()
      });
    }, 500);
  }

  componentWillUnmount() {
    if (this.settime) {
      clearTimeout(this.settime);
    }
  }

  render() {
    const { style, isTemporaryQrcode, keys } = this.state;
    const { TextArea } = Input;
    const { data } = this.props;
    const { pluginsKey } = this.props.scope;

    let left = 0;

    return (
      <div className="h5ds-phone-preview">
        <div className="h5ds-phone-preview-box">
          <div className="h5ds-phone-preview-content">
            <div className="h5ds-phone-preview-view">
              <div className="h5ds-phone-preview-header">
                <Radio.Group onChange={this.changeViewType} defaultValue="iphone6" buttonStyle="solid">
                  <Radio.Button value="iphone6">iphone6</Radio.Button>
                  <Radio.Button value="iphoneX">iphoneX</Radio.Button>
                </Radio.Group>
              </div>
              {this.H5SwiperRef ? <PageButton H5SwiperRef={this.H5SwiperRef} pageLength={data.pages.length} /> : null}
              <div id="h5ds-phone-preview-bodyer" style={{ left }} className="h5ds-phone-preview-bodyer" >
                <H5dsSwiper ref={c => (this.H5SwiperRef = c)} style={style} plugins={{ pluginsKey }} data={data} appId={this.props.appId} renderIn={renderIn.RENDER_IN_PREVIEW} />
              </div>
            </div>
            <div className="h5ds-phone-preview-info">
              <div className="h5ds-phone-preview-wx clearfix">
                <div className="h5ds-phone-preview-img" onClick={this.changeMainImg}>
                  <img src={data.img} alt="" />
                </div>
                <div className="h5ds-phone-preview-title">
                  <Input onChange={this.changeName} value={data.name} />
                </div>
                <div className="h5ds-phone-preview-desc">
                  <TextArea onChange={this.changeDesc} style={{ height: 118 }} value={data.desc} rows={4} />
                </div>
              </div>
              <div className="h5ds-phone-preview-wx clearfix">
                <div className="h5ds-phone-preview-img">
                  {this.state.url && (
                    <QRCode
                      {...{
                        fgColor: 'rgba(0,0,0,1)', // 前景色
                        bgColor: 'rgba(255,255,255,1)', // 背景色
                        size: 160,
                        level: 'M', // string ('L' 'M' 'Q' 'H')
                        value: this.state.url // 内容
                      }}
                    />
                  )}
                </div>
                <div className="h5ds-phone-preview-desc">
                  <TextArea style={{ height: 160 }} rows={4} value={this.state.url} />
                </div>
              </div>
              <div className="h5ds-phone-preview-down">
                <Alert
                  message={isTemporaryQrcode ? '以上为临时二维码和链接，10分钟有效，发布后生成永久二维码和链接' : '以上为正式二维码和链接，永久有效'}
                  type={isTemporaryQrcode ? 'warning' : 'success'}
                />
                <br />
                {this.props.scope.options.downApp ? (
                  <this.props.scope.options.downApp appId={this.props.scope.options.appId} />
                ) : (
                  <Button onClick={this.props.downCode} type="primary" icon="download">
                    下载源码
                  </Button>
                )}
                &nbsp;&nbsp;
                <Button onClick={this.props.close} type="primary" icon="gateway">
                  继续编辑
                </Button>
                &nbsp;&nbsp;
                {this.props.scope.options.AsTemplate ? (
                  <this.props.scope.options.AsTemplate appId={this.props.scope.options.appId} data={JSON.stringify(this.props.h5ds.data)} />
                ) : (
                  <Button onClick={this.publishApp} type="primary" icon="check-circle">
                    确认发布
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default PhonePreview;
