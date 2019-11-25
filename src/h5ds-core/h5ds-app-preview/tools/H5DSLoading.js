/**
 * 页面在加载插件的时候会调用这个方法，全屏设置一个loading模块
 * 依赖 jquery
 * await installPlugins(); 这个方法执行之前
 */
export class H5DSLoading {
  constructor(
    set = {
      id: 'H5DS-APP', // id
      fadeTime: 300, // 隐藏动画时间
      autoHide: false, // 是否自动隐藏
      delayTime: 1000,
      callback: null // 如果开启了autoHide，动画完成后会执行 callback
    }
  ) {
    this.$target = $('#' + set.id);
    this.set = set;
    this.start();
  }

  hide() {
    return new Promise(resolve => {
      // 延迟1s消失
      setTimeout(() => {
        this.$target.find('.h5ds-preview-loading').fadeOut(this.set.fadeTime, () => {
          resolve();
        });
      }, this.set.delayTime);
    });
  }

  /**
   * 显示loading
   */
  start() {
    this.$target.html(`<div class="h5ds-preview-loading">
      <div class="h5ds-preview-loading-inner">
        <img src="//cdn.h5ds.com/static/images/logo_blue.png" alt="" />
        <div class="h5ds-preview-loading-progress">
          <span class="h5ds-preview-loading-bar"></span>
        </div>
        <div class="h5ds-preview-loading-tips">
          h5ds.com 友情提示:已加载<span class="h5ds-preview-loading-span">0%</span>
        </div>
      </div>
      <style>
      .h5ds-preview-loading{
        background: #fff;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        text-align: center;
      }
      .h5ds-preview-loading-inner{
        position: relative;
        top: 50%;
        transform: translateY(-50%);
      }
      .h5ds-preview-loading-inner img{
        width: 190px;
      }
      .h5ds-preview-loading-progress{
        width: 70%;
        margin: 15px 15%;
        background: #dadada;
        height: 4px;
        border-radius: 100px;
        overflow: hidden;
      }
      .h5ds-preview-loading-bar{
        float: left;
        background: #272894;
        height: 100%;
        transition: 0.3s;
      }
      .h5ds-preview-loading-tips{
        color: #999;
        font-size: 12px;
      }
      </style>
    </div>`);

    const $bar = $('.h5ds-preview-loading-bar');
    const $span = $('.h5ds-preview-loading-span');
    if (window.pubSubLayer) {
      window.pubSubLayer.subscribe('h5ds.load.plugins', async data => {
        const { count, index, progress } = data;
        const percent = parseInt(progress * 100 * 0.7, 10);
        if (count === 0 || (count !== 0 && count === index + 1)) {
          $bar.css('width', '100%');
          $span.html('100%');
          this.set.autoHide && (await this.hide());
          this.set.callback && this.set.callback();
        } else {
          $bar.css('width', percent + '%');
          $span.html(percent + '%');
        }
      });

      // 资源占比30%
      window.pubSubLayer.subscribe('h5ds.load.scripts', async data => {
        const { count, index, progress } = data;
        const percent = parseInt(progress * 100 * 0.3 + 70, 10);
        if (count === 0 || (count !== 0 && count === index + 1)) {
          $bar.css('width', '100%');
          $span.html('100%');
          this.set.autoHide && (await this.hide());
          this.set.callback && this.set.callback();
        } else {
          $bar.css('width', percent + '%');
          $span.html(percent + '%');
        }
      });
    }
  }
}
