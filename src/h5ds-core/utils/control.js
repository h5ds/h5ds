import { getDragEventName } from './dragHelper';
import { pubsubEvent } from './pubsub';
import { util } from './util';

// import { rectMath } from './rectMath';

const drag = getDragEventName();

/**
 * @desc 控制器,用法
 * $(dom).control({...param});
 */
$.fn.control = function(setting) {
  const defaults = {
    lockWideHigh: false, // 锁定宽高比
    setHeight: true, // 能否设置高度
    setWidth: true, // 能否设置宽度
    movex: true, //能否往x方向移动
    movey: true, //能否往y方向移动
    autosize: true, // 能否任意拉伸
    fixedsize: true, // 是否固定比例拉伸
    scale: 1, // 画布缩放比例
    rotate: true // 是否支持旋转
  };
  const $this = $(this);
  const set = $.extend(defaults, setting);
  set.scale = $('.h5ds-js-canvas').transform('scale') || 1;
  let shtml = `<div class="h5ds-control">
					{{rotate}}
					{{autosize}}
					{{fixedsize}}
					<span class="h5ds-control-center"></span>
				</div>`;

  //如果没有旋转
  if (set.rotate) {
    shtml = shtml.replace('{{rotate}}', '<span class="h5ds-control-rotate"></span>');
  } else {
    shtml = shtml.replace('{{rotate}}', '');
  }

  //自动缩放
  if (set.autosize) {
    shtml = shtml.replace(
      '{{autosize}}',
      `${set.setHeight ? `<span style="display: ${set.lockWideHigh ? 'none' : 'block'}" class="h5ds-control-top"></span>` : ''}
					${set.setWidth ? `<span style="display: ${set.lockWideHigh ? 'none' : 'block'}" class="h5ds-control-left"></span>` : ''}
					${set.setWidth ? `<span style="display: ${set.lockWideHigh ? 'none' : 'block'}" class="h5ds-control-right"></span>` : ''}
					${set.setHeight ? `<span style="display: ${set.lockWideHigh ? 'none' : 'block'}" class="h5ds-control-bottom"></span>` : ''}`
    );
  } else {
    shtml = shtml.replace('{{autosize}}', '');
  }

  //如果没有缩放
  if (set.fixedsize) {
    shtml = shtml.replace(
      '{{fixedsize}}',
      `<span class="h5ds-control-topleft"></span>
					<span class="h5ds-control-topright"></span>
					<span class="h5ds-control-bottomleft"></span>
					<span class="h5ds-control-bottomright"></span>`
    );
  } else {
    shtml = shtml.replace('{{fixedsize}}', '');
  }

  let $controlDom = $this.find('.h5ds-control');
  if ($controlDom[0]) {
    $controlDom.remove();
    $controlDom = null;
  }

  $this.append(shtml);

  //移动
  const moveFun = function(e, _this) {
    let down = {
      x: e.pageX,
      y: e.pageY
    };
    let $box = $(_this).parent();
    let scale = set.scale;
    let box = {
      width: $box.width(),
      height: $box.height(),
      left: parseInt($box.css('left'), 10) * scale,
      top: parseInt($box.css('top'), 10) * scale
    };
    let style = null;

    // 吸附效果 - 此处应该优化下
    let gridAdsorb, gridSize;
    const $gridBox = $('.h5ds-js-grid');
    if ($gridBox[0]) {
      gridAdsorb = $gridBox.attr('data-adsorb') === 'true' ? true : false;
      gridSize = parseInt($gridBox.attr('data-size'), 10);
    }

    pubsubEvent.publish('h5ds.control.absorb.start');
    $(document)
      .on(`${drag.move}.control_move`, function(em) {
        em.stopPropagation();
        if (drag.touch) {
          em = drag.touchEvent(em);
        }
        style = {
          left: parseInt((box.left + (em.pageX - down.x)) / scale, 10),
          top: parseInt((box.top + (em.pageY - down.y)) / scale, 10)
        };
        if (!set.movex) {
          delete style.left;
        }
        if (!set.movey) {
          delete style.top;
        }

        // 设置网格对齐
        if (gridAdsorb && gridSize) {
          style.left ? (style.left = Math.round(style.left / gridSize, 10) * gridSize) : null;
          style.top ? (style.top = Math.round(style.top / gridSize, 10) * gridSize) : null;
          $box.css(style);
        } else {
          $box.css(style);
          pubsubEvent.publish('h5ds.control.absorb.move');
        }
      })
      .on(`${drag.end}.control_move`, function(e) {
        if (drag.touch) {
          e = drag.touchEvent(e);
        }
        $box = $(_this).parent();
        style = {
          left: parseFloat($box.css('left')),
          top: parseFloat($box.css('top'))
        };
        $(document).off(`${drag.move}.control_move ${drag.end}.control_move`);
        $this.trigger('change', style);
        pubsubEvent.publish('h5ds.control.absorb.end', style);
        style = null;
      });
  };

  //旋转
  const rotateFun = function(e, _this) {
    // let $target = $(e.target);
    let $center = $(_this).find('.h5ds-control-center');
    let $box = $(_this).parent();
    let center = {
      x: parseInt($center.offset().left, 10),
      y: parseInt($center.offset().top, 10)
    };
    // let width = $box.width();
    // let height = $box.height();
    let pi = 180 / Math.PI;
    let du = null;
    $(document)
      .on(`${drag.move}.control_rotate`, function(em) {
        if (drag.touch) {
          em = em.originalEvent.targetTouches[0];
        }
        let x = em.pageX - center.x;
        let y = center.y - em.pageY;
        du = Math.atan(x / y);
        du = du * pi;
        du = parseInt(du, 10);

        //判断向限
        if (x >= 0 && y >= 0) {
          //1
          //...
        } else if (x >= 0 && y < 0) {
          //4
          du = Math.abs(du);
          du = 180 - du;
        } else if (x < 0 && y >= 0) {
          //2
          du = du + 360;
        } else {
          //3
          du = du + 180;
        }
        //旋转的时候，固定中心点
        $box.transform({ rotate: `${util.toFixed(du, 1)}deg` });
      })
      .on(`${drag.end}.control_rotate`, function(e) {
        e.stopPropagation();
        $(document).off(`${drag.move}.control_rotate ${drag.end}.control_rotate`);
        $this.trigger('change', {
          value: util.toFixed(du, 1),
          rotate: util.toFixed(du, 1) + 'deg',
          transform: `rotate(${util.toFixed(du, 1)}deg)`
        });
        du = null;
      });
  };

  //缩放
  const resizeFun = function(e, _this, type) {
    const down = {
      x: e.pageX,
      y: e.pageY
    };
    const $box = $(_this).parent();
    const box = {
      width: $box[0].offsetWidth, //parseInt($box.width(), 10),
      height: $box[0].offsetHeight, //parseInt($box.height(), 10),
      left: $box[0].offsetLeft, // parseInt($box.css('left'), 10),
      top: $box[0].offsetTop, // parseInt($box.css('top'), 10)
      offsetLeft: $box.offset().left,
      offsetTop: $box.offset().top
    };

    $this.trigger('controlStart', { ...box });

    // 计算两点距离
    const twoDistance = (p1, p2, scale = 1) => {
      const [x1, y1] = p1;
      const [x2, y2] = p2;
      let x = x1 - x2;
      let y = y1 - y2;
      return Math.sqrt(x * x + y * y) * scale;
    };

    // 对角线的长度
    let diagonalValue = twoDistance([box.offsetLeft, box.offsetTop], [box.width + box.offsetLeft, box.height + box.offsetTop], set.scale);
    let diagonalValue2 = twoDistance([box.offsetLeft, box.offsetTop], [box.width + box.offsetLeft, box.height + box.offsetTop]);

    console.log('diagonalValue', diagonalValue);

    $(document)
      .on(`${drag.move}.control_resize`, function(em) {
        if (drag.touch) {
          em = drag.touchEvent(em);
        }
        // 变化值
        const move = {
          x: em.pageX - down.x,
          y: em.pageY - down.y
        };
        const { height, width, top, left, offsetLeft, offsetTop } = box;
        let newWidth = width,
          newHeight = height,
          newTop = top,
          newLeft = left;
        let cValue = 0;
        switch (type) {
          case 'top':
            cValue = twoDistance([em.pageX, em.pageY], [down.x, down.y]);
            if (move.y > 0) {
              cValue = -cValue;
            }
            cValue /= set.scale;
            newHeight = height + cValue;
            newTop = top - cValue;
            break;
          case 'left':
            cValue = twoDistance([em.pageX, em.pageY], [down.x, down.y]);
            if (move.x > 0) {
              cValue = -cValue;
            }
            cValue /= set.scale;
            newWidth = width + cValue;
            newLeft = left - cValue;
            break;
          case 'right':
            cValue = twoDistance([em.pageX, em.pageY], [down.x, down.y]);
            if (move.x < 0) {
              cValue = -cValue;
            }
            cValue /= set.scale;
            newWidth = width + cValue;
            break;
          case 'bottom':
            cValue = twoDistance([em.pageX, em.pageY], [down.x, down.y]);
            if (move.y < 0) {
              cValue = -cValue;
            }
            cValue /= set.scale;
            newHeight = height + cValue;
            break;
          case 'topleft':
            {
              cValue = twoDistance([em.pageX, em.pageY], [width + offsetLeft, height + offsetTop], set.scale);
              cValue -= diagonalValue;
              cValue /= set.scale;
              // 长的变化快点,所以以长的为标准
              if (width > height) {
                newWidth = width + cValue;
                newHeight = (newWidth / width) * height;
                newLeft = left - cValue;
                newTop = top - (newHeight - height);
              } else {
                newHeight = height + cValue;
                newWidth = (newHeight / height) * width;
                newTop = top - cValue;
                newLeft = left - (newWidth - width);
              }
            }
            break;
          case 'bottomleft':
            {
              cValue = twoDistance([em.pageX, em.pageY], [width + offsetLeft, offsetTop]);
              cValue -= diagonalValue2;
              cValue /= set.scale;
              // 长的变化快点,所以以长的为标准
              if (width > height) {
                newWidth = width + cValue;
                newHeight = (newWidth / width) * height;
                newLeft = left - cValue;
              } else {
                newHeight = height + cValue;
                newWidth = (newHeight / height) * width;
                newLeft = left - (newWidth - width);
              }
            }
            break;
          case 'topright':
            {
              cValue = twoDistance([em.pageX, em.pageY], [offsetLeft, height + offsetTop]);
              cValue -= diagonalValue;
              cValue /= set.scale;
              // 长的变化快点,所以以长的为标准
              if (width > height) {
                newWidth = width + cValue;
                newHeight = (newWidth / width) * height;
                newTop = top - (newHeight - height);
              } else {
                newHeight = height + cValue;
                newWidth = (newHeight / height) * width;
                newTop = top - cValue;
              }
            }
            break;
          case 'bottomright':
            {
              cValue = twoDistance([em.pageX, em.pageY], [offsetLeft, offsetTop]);
              cValue -= diagonalValue;
              cValue /= set.scale;
              // 长的变化快点,所以以长的为标准
              if (width > height) {
                newWidth = width + cValue;
                newHeight = (newWidth / width) * height;
              } else {
                newHeight = height + cValue;
                newWidth = (newHeight / height) * width;
              }
            }
            break;
        }
        if (newWidth < 0 || newHeight < 0) {
          return;
        }
        $box.css({
          width: newWidth,
          height: newHeight,
          top: newTop,
          left: newLeft
        });
        $this.trigger('controlResizeTick', { width: newWidth, height: newHeight, top: newTop, left: newLeft });
      })
      .on(`${drag.end}.control_resize`, function() {
        $(document).off(`${drag.move}.control_resize ${drag.end}.control_resize`);
        const { offsetWidth, offsetHeight, offsetLeft, offsetTop } = $box[0];
        const data = {
          height: parseInt(offsetHeight, 10),
          width: parseInt(offsetWidth, 10),
          top: parseInt(offsetTop, 10),
          left: parseInt(offsetLeft, 10)
        };
        $this.trigger('controlEnd', { ...data });
        $this.trigger('change', { ...data });
      });
  };

  //销毁
  this.distory = function() {
    $('.h5ds-control').remove();
  };

  // console.log('control.js -> init event');
  //事件绑定
  $(document)
    .off(`${drag.start}.control`)
    .on(`${drag.start}.control`, '.h5ds-control', function(e) {
      // console.log('control.js -> mousedown', e);
      e.stopPropagation();
      if (drag.touch) {
        e = drag.touchEvent(e);
      } else {
        e.preventDefault();
      }
      set.scale = parseFloat($('.h5ds-canvas-box').transform('scale')) || 1;
      switch (e.target.className) {
        case 'h5ds-control':
          moveFun(e, this);
          break;
        case 'h5ds-control-rotate':
          rotateFun(e, this);
          break;
        case 'h5ds-control-top':
          resizeFun(e, this, 'top');
          break;
        case 'h5ds-control-topleft':
          resizeFun(e, this, 'topleft');
          break;
        case 'h5ds-control-topright':
          resizeFun(e, this, 'topright');
          break;
        case 'h5ds-control-bottom':
          resizeFun(e, this, 'bottom');
          break;
        case 'h5ds-control-bottomleft':
          resizeFun(e, this, 'bottomleft');
          break;
        case 'h5ds-control-bottomright':
          resizeFun(e, this, 'bottomright');
          break;
        case 'h5ds-control-left':
          resizeFun(e, this, 'left');
          break;
        case 'h5ds-control-right':
          resizeFun(e, this, 'right');
          break;
      }
    });

  return this;
};
