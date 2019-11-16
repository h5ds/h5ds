import React, { Component } from 'react';

import Layer from './Layer';
import PowerbyModule from './PowerbyModule';
import { renderIn } from '../../config';
import debounce from 'lodash/debounce';

/**
 * @desc 重要说明，hack
 * index 页面index
 * realIndex 显示的页面
 * isLangPage 判断是否是长页
 * isRenderThis 用于控制页面动画的，如果 isRenderThis = true 会执行动画，切换页面的时候，isRenderThis是一个变化的值，
 * 当前页面isRenderThis = true，Layer 组件的 style 只在有动画的时候才会叠加到样式上。如果没有动画，这个参数会被忽略
 * adsorbTopBottom，adsorbLeftRight：在做适配的时候，如果画布比较小，可视区域会在手机屏幕中居中处理，而吸附会吸附到最外层body的边框上
 * leavePageUnmount 切换走的时候销毁
 *
 * appData, pageData 只在事件处理有用到，单独使用Layer或者Page无需传入appData，弹窗事件无效！单独使用Layer无需传入pageData，隐藏页面中的其他元素事件无效！
 */
class Page extends Component {
  constructor(props) {
    super(props);
    this.pageType = 'page';
  }

  // 切换到本页面后，执行翻页动画
  autoplay = () => {
    if (!this.props.data) {
      return false;
    }
    const { slider } = this.props.data;
    if (slider && slider.autoplay) {
      this.timer = setTimeout(() => {
        window.swiperInstance && window.swiperInstance.slideNext();
      }, slider.time * 1000);
    }
  };

  updateSwiper = () => {
    if (this.swiperLangPage) {
      this.swiperLangPage.scrollbar.updateSize();
    }
  };

  // // 判断layer是进入还是离开
  // judgeLayerLeaveEnter = () => {
  //   const { layers = [], style = {} } = this.props.data;
  //   const val = this.swiperLangPage.getTranslate();
  //   console.log('this.swiperLangPage', this.swiperLangPage);

  //   // 窗口大小：
  //   const height = this.swiperLangPage.height;
  //   const { width } = style;
  //   if (!width || !height) {
  //     console.error('页面没有预设width 或 height 参数');
  //   } else {
  //     let min = -val;
  //     let max = -val + height;

  //     // 最终采用直接操作DOM的方式处理
  //     layers.forEach(layer => {
  //       if (layer.animate.length > 0) {
  //         // 求中心点位置是否在min,max之间，如果存在就表示在可视区域中
  //         let top = layer.style.height / 2 + layer.style.top;
  //         if (top > min && top < max) {
  //           layer.inview = true;
  //         } else {
  //           layer.inview = false;
  //         }
  //       }
  //     });
  //     this.updateLayer();
  //   }
  // };

  // // 更新layer视图
  // updateLayer = () => {
  //   (this.props.data.layers || []).map(layer => {
  //     if (layer.inview !== undefined && layer.animate.length > 0) {
  //       this.swiperLangPage.$el.find(`[data-keyid="${layer.keyid}"]`).css({
  //         display: layer.inview ? 'block' : 'none'
  //       });
  //     }
  //   });
  // };

  componentDidMount() {
    if (this.props.isRenderThis) {
      this.autoplay();
    }

    // 如果是长页
    if (this.props.isLangPage) {
      console.log('初始化滚动条');
      // 设置初始位置
      if (this.props.scrollSet < 0) {
        window.initialSlide = 0;
      } else if (this.props.scrollSet > 0) {
        window.initialSlide = 9999;
      }
      const { keyid } = this.props;
      // eslint-disable-next-line no-undef
      this.swiperLangPage = new Swiper(`#${keyid}`, {
        touchMoveStopPropagation: false,
        direction: 'vertical',
        slidesPerView: 'auto',
        roundLengths: true,
        nested: true,
        resistanceRatio: 0,
        freeMode: true,
        scrollbar: {
          el: `.${keyid}_swiper-scrollbar`
        }, // '.'
        initialSlide: window.initialSlide || 0,
        mousewheel: true
      });

      // 监听事件，执行动画
      // this.judgeLayerLeaveEnter();
      // this.swiperLangPage.on('transitionEnd', this.judgeLayerLeaveEnter);
    }
  }

  componentDidUpdate() {
    if (this.props.isRenderThis) {
      this.autoplay();
    }
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }

    // 长页才有的
    if (this.swiperLangPage) {
      this.swiperLangPage.off('touchMove');
      this.swiperLangPage.destroy();
    }
  }

  render() {
    const { data, plugins, adsorbSet, initControl, isLangPage, appData = null } = this.props;
    let isRenderThis = this.props.isRenderThis;

    // 默认没传是要渲染的，处理单个页面渲染的问题
    if (isRenderThis === undefined) {
      isRenderThis = true;
    }

    console.log('isRenderThis', this.props.index, isRenderThis);

    if (!data) {
      console.warn('pages/Page.js error, data is not null');
      return null;
    }

    const { pluginsKey } = plugins;
    const { layers = [], style = {} } = data;
    const zIndex = 9999;

    let onPageStyle = null;

    // RENDER_IN_PUBLISH是组合起来使用，因为要做适配，所以需要把背景分离
    if ([renderIn.RENDER_IN_INDEPENDENT, renderIn.RENDER_IN_PAGELIST].includes(this.props.renderIn)) {
      onPageStyle = style;
    } else {
      // 背景色设置在 h5ds-pages-box 上。做最大兼容
      // backgroundImage, backgroundSize, backgroundRepeat,
      // eslint-disable-next-line no-unused-vars
      let { backgroundColor, backgroundGlobal, ...pageStyle } = style;
      if (backgroundGlobal) {
        // eslint-disable-next-line no-unused-vars
        let { backgroundImage, backgroundSize, backgroundRepeat, ...pageStyle2 } = pageStyle;
        onPageStyle = pageStyle2;
      } else {
        onPageStyle = pageStyle;
      }
    }

    return (
      <div className={`h5ds-swiper-layers-box ${isLangPage ? 'swiper-wrapper' : ''}`}>
        <div ref={c => (this.swiperPageRef = c)} className={`h5ds-swiper-layers ${isLangPage ? 'swiper-slide' : ''}`} style={{ ...onPageStyle }}>
          {layers.map((layer = {}, index) => {
            const { pid, leavePageUnmount = false, name } = layer;
            const layerPlugin = pluginsKey[pid];
            let ReactDom = layerPlugin ? layerPlugin.LayerComp : null;
            // 如果离开销毁的参数是true，且当不是当前页面，直接return null
            if (leavePageUnmount && !isRenderThis) {
              return null;
            }
            // 如果在缩图列表，layer超过30个就不显示了。为了提升更好的性能体验
            if (index > 30 && renderIn.RENDER_IN_PAGELIST === this.props.renderIn) {
              return null;
            }
            // 在canvas里面，layer是proxy对象，需要做转换
            if (renderIn.RENDER_IN_CANVAS === this.props.renderIn) {
              layer = JSON.parse(JSON.stringify(layer));
            }
            return (
              <Layer
                // 每次页面切换，都会从 none 变到 block 会自动触发layer的动画
                style={{ display: isRenderThis ? 'block' : 'none' }}
                appData={appData}
                isRenderThis={isRenderThis}
                pageData={data}
                renderIn={this.props.renderIn}
                initControl={initControl}
                layer={layer}
                adsorbSet={adsorbSet}
                zIndex={zIndex - index}
                key={layer.keyid}
              >
                {ReactDom ? (
                  <ReactDom appData={appData} pageData={data} isRender={isRenderThis} renderIn={this.props.renderIn} layer={layer} plugins={plugins} />
                ) : (
                  <div className="layer-null">
                    请载入{name}:{pid}插件
                    <span style={{ display: 'none' }}>{JSON.stringify(layer)}</span>
                  </div>
                )}
              </Layer>
            );
          })}
          {data.type === 'h5ds_combin' ? null : <PowerbyModule height={data.style.height} renderIn={this.props.renderIn} adsorbSet={adsorbSet} pageType={this.pageType} />}
        </div>
      </div>
    );
  }
}

export default Page;
