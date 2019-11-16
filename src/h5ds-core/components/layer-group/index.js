import { transaction } from 'mobx';

/**
 * layergroup export： setGroupControl，dragGroupEvent，initDragSelectGroupEvent 三个针对组操作的方法
 * 分别是：设置组的控制器，绑定组的拖拽方法，初始化选择组的事件
 */

/**
 * @desc 设置静态的 control
 * @param {h5ds.getPageDom} getPageDom 获取当前选中页面的jquery对象
 * @param {array} indexs 获取选中的图层下标
 */
export function setGroupControl(getPageDom, indexs) {
  // 批量设置选中
  const dom = `<div class="h5ds-control">
    <span class="h5ds-control-top"></span>
    <span class="h5ds-control-left"></span>
    <span class="h5ds-control-right"></span>
    <span class="h5ds-control-bottom"></span>
    <span class="h5ds-control-topleft"></span>
    <span class="h5ds-control-topright"></span>
    <span class="h5ds-control-bottomleft"></span>
    <span class="h5ds-control-bottomright"></span>
    <span class="h5ds-control-center"></span>
</div>`;

  let pageDom = getPageDom();

  // 先清除之前的
  pageDom.find('.h5ds-control').remove();

  indexs.forEach(elem => {
    const $layer = pageDom
      .children('.h5ds-swiper-layers-box')
      .children('.h5ds-swiper-layers')
      .children('.layer')
      .eq(elem);
    if (!$layer.find('.h5ds-control')[0]) {
      $layer.append(dom);
    }
  });
}

/**
 * @desc 初始化拖动组的方法
 * @param {h5ds.getLayers} getLayers 获取当前页面的layer对象
 * @param {h5ds.getPageLayerDom} getPageLayerDom 获取当前页面的layer dom的jquery对象，如果不带参数就是获取全部layer的jquery对象
 * @param {h5ds.edata} edata 编辑器操作配置参数
 */
export function dragGroupEvent(getLayers, getPageLayerDom, edata) {
  // 让图层可拖动
  $('#h5dsCanvas')
    .off('mousedown.h5ds.group')
    .on('mousedown.h5ds.group', '.h5ds-control', function(ed) {
      // 如果选择的组为null，不拖动
      if (!edata.selectGroup) {
        return;
      }
      ed.stopPropagation();
      const oldsize = {};
      const layers = getLayers();
      edata.selectGroup.forEach(num => {
        oldsize[num] = {
          x: parseInt(layers[num].style.left, 10),
          y: parseInt(layers[num].style.top, 10)
        };
      });
      // 性能优化
      const $layers = getPageLayerDom();
      $(document)
        .on('mousemove.h5ds.group', function(em) {
          em.stopPropagation();
          let x = em.pageX - ed.pageX;
          let y = em.pageY - ed.pageY;
          edata.selectGroup.forEach(num => {
            $layers.eq(num).css({
              left: oldsize[num].x + x / edata.phoneScale,
              top: oldsize[num].y + y / edata.phoneScale
            });
          });
        })
        .on('mouseup.h5ds.group', function(eu) {
          let x = eu.pageX - ed.pageX;
          let y = eu.pageY - ed.pageY;
          transaction(() => {
            edata.selectGroup.forEach(num => {
              if (layers[num]) {
                layers[num].style.left = oldsize[num].x + x / edata.phoneScale;
                layers[num].style.top = oldsize[num].y + y / edata.phoneScale;
              }
            });
          });
          $(document).off('mousemove.h5ds.group mouseup.h5ds.group');
          window.pubSubEditor.publish('h5ds.setHistory');
        });
    });
}

/**
 * @desc 初始化拖动框选组的方法
 * @param {h5ds} h5ds h5ds对象
 * @param {function} callback 回调函数，拖动结束后的回调
 */
export function initDragSelectGroupEvent(h5ds, callback) {
  const { edata } = h5ds;
  // 拖动选择一组layer
  $('#h5dsCanvas')
    .off('mousedown.h5ds.layerGroup')
    .on('mousedown.h5ds.layerGroup', function(ed) {
      // 如果是选择的标线。不做处理
      if ($(ed.target).closest('.h5ds-ruler')[0]) {
        return;
      }

      // 拖动导航器
      if ($(ed.target).closest('.h5ds-canvas-navigator')[0]) {
        return;
      }

      // 拖动按钮修改页面长度和宽度
      if ($(ed.target).closest('.h5ds-js-setpage')[0]) {
        return;
      }

      // 如果已经选择了组 或者 选择了layer ，不再执行组的拖动区域
      if (edata.selectGroup || edata.selectLayer !== null) {
        return;
      }

      // 控制器的代码
      let controlBox = `<div class="h5ds-control">
                    <span class="h5ds-control-top"></span>
                    <span class="h5ds-control-left"></span>
                    <span class="h5ds-control-right"></span>
                    <span class="h5ds-control-bottom"></span>
                    <span class="h5ds-control-topleft"></span>
                    <span class="h5ds-control-topright"></span>
                    <span class="h5ds-control-bottomleft"></span>
                    <span class="h5ds-control-bottomright"></span>
                    <span class="h5ds-control-center"></span>
                </div>`;

      // 获取当前的layer 位置, 获取中心点。
      let arr = [];
      h5ds
        .getPageDom()
        .children('.h5ds-swiper-layers-box')
        .children('.h5ds-swiper-layers')
        .children('.layer')
        .each(function() {
          let $this = $(this);
          let obj = {
            left: $this.offset().left,
            top: $this.offset().top,
            width: $this.width(),
            height: $this.height(),
            dom: $this
          };
          obj.center = {
            x: obj.left + obj.width / 2,
            y: obj.top + obj.height / 2
          };
          // 如果是lock图层 和 合并内部的图层，都不选中
          // if ($this.hasClass('layer-temporary-lock') || $this.closest('.layer-combinbox')[0]) {
          if ($this.hasClass('layer-temporary-lock') || $this.closest('.layer-combinbox')[0]) {
            return;
          } else {
            arr.push(obj);
          }
        });

      // 写入选中框
      if (!$('.layer-group-select')[0]) {
        $('body').append('<div class="layer-group-select"></div>');
      }

      // 拖动的时候，时刻监听，然后给对应的layer 设置好 样式
      let $selectGroup = $('.layer-group-select');
      let wid, hei, top, left;
      $(document)
        .on('mousemove.h5ds.layerGroup', function(em) {
          wid = Math.abs(em.pageX - ed.pageX);
          hei = Math.abs(em.pageY - ed.pageY);

          // 拉动鼠标
          em.pageX > ed.pageX ? (left = ed.pageX) : (left = em.pageX);
          em.pageY > ed.pageY ? (top = ed.pageY) : (top = em.pageY);

          $selectGroup.css({
            top: top,
            left: left,
            width: wid,
            height: hei,
            display: wid + hei === 0 ? 'none' : 'block'
          });

          // 设置 控制器
          arr.forEach(elem => {
            let { x, y } = elem.center;
            if (x > left && x < left + wid && y > top && y < top + hei) {
              // console.log('中心了', index);
              const $control = elem.dom.find('.h5ds-control');
              if (!$control[0]) {
                elem.dom.append(controlBox);
              }
            } else {
              elem.dom.find('.h5ds-control').remove();
            }
          });
        })
        .on('mouseup.h5ds.layerGroup', function() {
          // 调出拖动组的浮动层，选中之后，接下来就要，对选中的进行操作了
          let $control = h5ds.getPageDom().find('.h5ds-control');
          if ($control.length > 1) {
            // console.log('触发图层集合的操作');
            callback(getLayerIndex(h5ds));
            // dragGroupEvent();
          } else if ($control.length === 1) {
            // 只选中一个，就选择这个图层
            $control.closest('.layer').trigger('click');
          }

          // 释放内存
          arr = null;
          $(document).off('mousemove.h5ds.layerGroup');
          $(document).off('mouseup.h5ds.layerGroup');
          $selectGroup.remove();
        });
    });
}

/**
 * @desc 获取选中的 layer 下标
 */
function getLayerIndex(h5ds) {
  let group = [];
  h5ds
    .getPageDom()
    .find('.h5ds-control')
    .each(function() {
      let $this = $(this).closest('.layer');
      group.push($this.index());
    });
  return group;
}
