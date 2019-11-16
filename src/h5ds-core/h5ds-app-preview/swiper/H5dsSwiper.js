import './h5swiper.less';

import React, { Component } from 'react';

import FixedModule from './FixedModule';
import PageModule from './PageModule';
import PopupModule from './PopupModule';
import { bindSelf } from '../../utils/bindSelf';

// import LoadingModule from './LoadingModule';

/**
 * props.style 传入外框的宽高样式，默认是 window.innerWidth，window.innerHeight
 * plugins 传入 pluginsKey 参数
 * data 传入json数据
 * appId 传入对应的appId
 */
export default class H5dsSwiper extends Component {
  static defaultProps = {
    style: {
      width: window.innerWidth,
      height: window.innerHeight
    }
  };

  constructor(props) {
    super(props);
    this.data = JSON.parse(JSON.stringify(props.data));
    const { width, height } = this.props.style;
    let scale = 1;
    switch (this.props.data.type) {
      case 'pc':
        scale = 1;
        break;
      case 'ppt':
        // 1280 * 720, 在手机上应该横屏展示
        scale = window.innerHeight / 720 > window.innerWidth / 1280 ? window.innerWidth / 1280 : window.innerHeight / 720;
        break;
      case 'horizontal-phone':
        {
          // 如果旋转后，开启了自动转屏
          if (width > height) {
            scale = height / 320;
          } else {
            scale = width / 320;
          }
        }
        break;
      default:
        scale = width / 320;
    }
    this.scale = this.props.scale || scale;
  }

  // 设置page的class 和 innerStyle
  @bindSelf
  setPageStyle(page) {
    const { style, data } = this.props;
    let innerHeight = page.style.height * this.scale; // inner 高度, 优先取page的高度
    let innerWidth = page.style.width * this.scale; // inner 宽度
    let isLangPage = style.height < innerHeight; // 长页
    // 屏幕最大高度，如果页面高度比 window高度还高，取window高度
    if (innerHeight > style.height) {
      innerHeight = style.height;
    }
    let innerTop = 0; // inner 距离顶部高度
    let noSwiper = false; // 不可滚动
    if (style.height >= innerHeight) {
      innerTop = (style.height - innerHeight) / 2;
    } else {
      noSwiper = true;
    }

    // 如果人为的锁定翻页
    if (page.slider && page.slider.lock) {
      noSwiper = true;
    }

    /**
     * @desc 这里的处理是为了做各种屏幕尺寸的兼容，如需修改，请慎重修改。
     *
     * backgroundColor 设置到 h5ds-swiper-box 上为了做最大化的兼容，
     * innerStyle 是为了让页面居中显示，兼容更多的屏幕，innerTop用于计算居中时候h5ds-swiper-pageinner距离顶部的距离。
     * overflow参数说明：如果是长页，innerTop 必定是0，所以超出设置隐藏，
     * 如果是非长页的情况，元素可能超出h5ds-swiper-pageinner，超出也要显示出来，这样可以兼容到非长页的所有手机尺寸，
     * 不至于居中的时候被截取掉一部分超出的元素，如果是长页，页面不能直接滚动noSwiper = true
     * 如果 backgroundGlobal === 'global' // 全局适配,会把 backgroundImage, backgroundSize, backgroundRepeat 等参数设置成全局的
     */
    // backgroundImage, backgroundSize, backgroundRepeat,
    let { backgroundColor, backgroundImage, backgroundSize, backgroundRepeat, backgroundGlobal, width } = page.style;
    let boxStyle = { backgroundColor };
    // 全局类型设置
    if (backgroundGlobal) {
      Object.assign(boxStyle, { backgroundImage, backgroundSize, backgroundRepeat });
    }
    let innerStyle = Object.assign(
      {},
      { width, height: innerHeight / this.scale },
      { top: innerTop }
      // { overflow: innerTop === 0 ? 'hidden' : 'initial' }
    );

    // 横屏自动居中展示
    if (data.type === 'horizontal-phone') {
      innerStyle.top = (style.height - page.style.height) / 2;
      innerStyle.left = (style.width - page.style.width) / 2;
    } else if (data.type === 'ppt') {
      // ppt 单独处理
      innerStyle.top = 0;
      innerStyle.left = 0;
    }

    let className = 'h5ds-swiper-page swiper-slide';
    if (noSwiper) {
      className += ' h5ds-swiper-page-lange';
    }
    if (page.className) {
      className += ` ${page.className}`;
    }

    const adsorbTopBottom = innerTop;
    const adsorbLeftRight = (style.width - innerWidth) / 2;
    return {
      className,
      boxStyle,
      innerStyle,
      noSwiper,
      isLangPage,
      adsorbTopBottom,
      adsorbLeftRight
    };
  }

  // 对外暴露
  @bindSelf
  updateSwiper() {
    this.swiperRef && this.swiperRef.updateSwiper();
  }

  // 对外暴露：下一页
  @bindSelf
  slideNext() {
    this.swiperRef && this.swiperRef.slideNext();
  }

  // 对外暴露：上一页
  @bindSelf
  slidePrev() {
    this.swiperRef && this.swiperRef.slidePrev();
  }

  // 对外暴露：页面跳转
  @bindSelf
  slideTo(index, time = 0) {
    this.swiperRef && this.swiperRef.slideTo(index, time);
  }

  // 对外暴露swiper 对象
  componentDidMount() {
    this.swiperInstance = this.swiperRef.swiperInstance;

    // 全局事件
    window.pubSubLayer.subscribe('h5ds.layerEvent.topage', param => {
      this.slideTo(param.value, 500);
    });

    if (this.props.appId) {
      window.VIEW_APP_APPID = this.props.appId;
    }
  }

  componentWillUnmount() {
    window.VIEW_APP_APPID = undefined;
    window.pubSubLayer.unsubscribe('h5ds.layerEvent.topage');
  }

  render() {
    const data = this.data;
    const { renderIn, style, plugins } = this.props;
    let transformStyle = { transform: `scale(${this.scale})`, transformOrigin: '0 0' };
    const setPageStyle = this.setPageStyle;
    // data, transformStyle, plugins, style, renderIn, scale, setPageStyle
    let pcScale = 1;
    // 如果是pc页面，且最小宽度小于div的宽度，自由缩放
    if (data.type === 'pc' && style.width < data.style.width) {
      pcScale = style.width / data.style.width;
      style.width = data.style.width;
      style.height = style.height / pcScale;
    }
    let swiperStyle = { width: style.width, height: style.height, transform: `scale(${pcScale})` };

    // 横屏和PPT特殊处理
    const { direction = 'vertical' } = data.slider;
    // 横屏显示处理
    if (data.type === 'horizontal-phone') {
      // 如果是横屏锁定才会旋转，否则不旋转
      if (style.width < style.height) {
        transformStyle = {
          transform: `scale(${this.scale}) rotate(${direction === 'vertical' ? 90 : -90}deg)`,
          transformOrigin: 'center'
        };
      } else {
        transformStyle = {
          transform: `scale(${this.scale})`,
          transformOrigin: 'center',
          left: 0
        };
      }
    } else if (data.type === 'ppt') {
      transformStyle = Object.assign(transformStyle, {
        transformOrigin: `0 0`,
        top: '50%',
        left: '50%',
        margin: 0,
        transform: `scale(${this.scale})  translate(-50%, -50%)`
      });
      Object.assign(swiperStyle, {
        transform: `scale(1)`
      });
    }

    const swiperClass = ['h5ds-preview', `h5ds-preview-${data.type}`];
    return (
      <div className={swiperClass.join(' ')} style={swiperStyle}>
        {data.type === 'ppt' ? (
          <div className="h5ds-ppt-btn">
            <a className="h5ds-ppt-prev" onClick={this.slidePrev}></a>
            <a className="h5ds-ppt-next" onClick={this.slideNext}></a>
          </div>
        ) : null}
        <React.Fragment>
          <PageModule ref={c => (this.swiperRef = c)} {...{ data, transformStyle, renderIn, plugins, style, scale: this.scale, setPageStyle }} />
          <FixedModule {...{ data, transformStyle, renderIn, plugins, style, scale: this.scale, setPageStyle }} />
          <PopupModule {...{ data, transformStyle, renderIn, plugins, style, scale: this.scale, setPageStyle }} />
        </React.Fragment>
      </div>
    );
  }
}
