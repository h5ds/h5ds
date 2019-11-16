import React, { Component } from 'react';

import { Page } from '../pages';
import { bindSelf } from '../../utils/bindSelf';
import { util } from '../../utils/util';

export default class PageModule extends Component {
  constructor(props) {
    super(props);
    this.data = props.data;
    this.pagesLen = this.data.pages.length;
    this.state = {
      offset: 0, // 偏移量
      slides: [], // 当前显示的slides参数
      realIndex: 0 // 当前页面下标
    };
    this.id = `h5ds_swiper_${util.randomID()}`;
  }

  @bindSelf
  slideTo(index, time = 0) {
    this.swiperInstance.slideTo(index, time);
  }

  @bindSelf
  updateSwiper() {
    this.swiperInstance.updateSize();
    this.swiperInstance.updateSlides();
    this.slideTo(0);
  }

  @bindSelf
  slideChangeTransitionEnd() {
    const realIndex = this.swiperInstance.snapIndex;

    // 循环关键
    // 如果是最后一页，toPage到第一页
    // if (realIndex === this.pagesLen) {
    //   this.swiperInstance.slideTo(0, 0);
    //   return;
    // }

    // 提供给外部使用
    this.swiperInstance.h5dsRealIndex = realIndex;

    const { slides, offset } = this.renderExternal;
    // 如果参数相同，不setState;
    if (JSON.stringify({ realIndex: this.state.realIndex, slides: this.state.slides, offset: this.state.offset }) !== JSON.stringify({ realIndex, slides, offset })) {
      this.setState({ realIndex, slides, offset });
    }
  }

  // 下一页
  @bindSelf
  slideNext() {
    this.swiperInstance && this.swiperInstance.slideNext();
  }

  // 上一页
  @bindSelf
  slidePrev() {
    this.swiperInstance && this.swiperInstance.slidePrev();
  }

  @bindSelf
  newSwiper() {
    let { time, effect, autoplay, speed = 0.5, direction = 'vertical' } = this.data.slider;

    if (autoplay) {
      autoplay = {
        delay: time * 1000,
        disableOnInteraction: false
        // stopOnLastSlide: true //最后一页禁用自动翻页
      };
    }
    this.offset = $(`#${this.id}`).height();
    let slidesInit = new Array(this.pagesLen).fill(1).map((d, i) => i);
    // 如果只有一个页面，不循环
    // if (slidesInit.length > 1) {
    //   slidesInit.push(0);
    // }
    // eslint-disable-next-line no-undef
    this.swiperInstance = new Swiper(`#${this.id}`, {
      // slidesPerView: 'auto',
      loop: false,
      // touchStartForcePreventDefault: true, // 是否强制阻止`touchstart` (`mousedown`)的默认事件，即使Swiper不允许滑动(allowTouchMove:false)
      // touchMoveStopPropagation: true, // 阻止冒泡
      virtual: {
        slides: slidesInit,
        cache: false,
        renderExternal: data => {
          const { slides, offset } = data;

          // 初始化参数，从0页开始，首位加1
          if (!this.renderExternal) {
            this.setState({ slides, offset });
          }
          this.renderExternal = { slides, offset };
        }
      },
      speed: speed * 1000,
      autoplay,
      // touchRatio:  1, // 触摸比例。触摸距离与slide滑动距离的比率。
      // longSwipesRatio: 0.1, // 触发swiper所需要的最小拖动距离比例 最大值0.5
      roundLengths: true, // 如果设置为true，则将slide的宽和高取整(四舍五入)，以防止某些分辨率的屏幕上文字或边界(border)模糊。
      direction, // 垂直切换选项
      effect,
      mousewheel: true,
      noSwipingClass: 'h5ds-swiper-stop-swiping', // 锁定翻页
      watchOverflow: true // 仅有1个slide，swiper无效
      // on: {
      //   touchStart: function(event){
      //     console.log('touchStart2', event);
      //     // event.stopImmediatePropagation();
      //     event.preventDefault();
      //   },
      //   touchMove: function(event){
      //     console.log('touchMove2', event);
      //     event.stopImmediatePropagation();
      //     event.preventDefault();
      //   },
      // }
      // pagination: {
      //   el: '.swiper-pagination',
      //   type: 'bullets',
      //   // type: 'fraction',
      //   // type : 'custom',
      //   // type: 'progressbar',
      //   progressbarOpposite: true // 进度条和默认的反向
      // }
    });
    this.swiperInstance.h5dsRealIndex = 0;
    this.swiperInstance.on('transitionEnd', this.slideChangeTransitionEnd);
    // 丢全局去
    window.swiperInstance = this.swiperInstance;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.style.height !== prevProps.style.height) {
      if (this.pageRef && this.pageRef.swiperLangPage) {
        this.pageRef.swiperLangPage.update();
      }
    }
  }

  componentDidMount() {
    this.newSwiper();
  }

  componentWillUnmount() {
    this.swiperInstance.destroy();
    window.swiperInstance = undefined;
  }

  render() {
    const { data, plugins, style, renderIn, scale, setPageStyle } = this.props;
    const transformStyle = this.props.transformStyle;
    const { realIndex, slides, offset } = this.state;
    const pages = data.pages;
    const previewStyle = Object.assign({}, { ...data.style }, { ...style });
    const { direction = 'vertical' } = data.slider;

    return (
      <div id={this.id} className="h5ds-pages swiper-container" style={{ ...previewStyle }}>
        <div className="swiper-wrapper">
          {slides.map((index, i) => {
            const page = pages[index];
            // 正常模版
            let { innerStyle, boxStyle, className, isLangPage, adsorbTopBottom, adsorbLeftRight } = setPageStyle(page);
            className = [className];
            let boxClassName = ['h5ds-pages-box', 'swiper-container'];
            const keyid = `keyid_` + page.keyid + `_${index}`;
            if (isLangPage) {
              boxClassName.push('h5ds-swiper-page-scroll');
            }

            // 如果不是当前页面暂停动画
            if (realIndex - index === 0) {
              className.push('swiper-slide-active');
            } else if (realIndex - index > 0) {
              className.push('swiper-slide-prev h5ds-swiper-ban-animate');
            } else {
              className.push('swiper-slide-next h5ds-swiper-ban-animate');
            }
            if (page.slider.lock) {
              className.push('h5ds-swiper-stop-swiping');
            }

            const scrollStyle = {};
            if (isLangPage && data.type === 'pc') {
              scrollStyle.right = -(window.innerWidth - page.style.width) / 2 + 2;
            }

            return (
              <div
                id={page.id}
                className={className.join(' ')}
                key={keyid}
                data-keyid={page.keyid}
                data-swiper-slide-index={index}
                style={{
                  [direction === 'horizontal' ? 'left' : 'top']: `${offset}px`,
                  transform: 'rotateX(0deg) rotateY(0deg) translate3d(0px, 0px, 0px)'
                }}
              >
                <div className={boxClassName.join(' ')} style={boxStyle}>
                  <div id={keyid} style={Object.assign(innerStyle, transformStyle)} className={['h5ds-swiper-pageinner', isLangPage ? 'swiper-container' : ''].join(' ')}>
                    <Page
                      adsorbSet={{
                        scale,
                        adsorbTopBottom,
                        adsorbLeftRight
                      }}
                      ref={c => {
                        if (realIndex === index) {
                          this.pageRef = c;
                        }
                      }}
                      index={index}
                      keyid={keyid}
                      scrollSet={realIndex - index}
                      realIndex={realIndex}
                      isLangPage={isLangPage}
                      isRenderThis={realIndex === index}
                      plugins={plugins}
                      appData={data}
                      data={page}
                      renderIn={renderIn}
                    />
                    {isLangPage ? (
                      <div
                        style={scrollStyle}
                        className={[`${keyid}_swiper-scrollbar`, 'swiper-scrollbar', !page.slider.showScroll ? 'swiper-scrollbar-hideScroll' : ''].join(' ')}
                      ></div>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="swiper-pagination" />
      </div>
    );
  }
}
