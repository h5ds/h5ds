import { getDragEventName } from './dragHelper';

/**
 * @desc 该方法是一个全局的jquery拖动方法。用法 <div class="h5ds-drag">drag div</div>
 * 参数设置到 data-set 属性上面. {"limit": true, "undrag": [".a", ".b"]}
 *  limit: true 的时候，会以外框为限制框，不能拖动出去
 *  undrag: [] 做了设置之后，设置区域不可触发拖动效果
 */
const drag = getDragEventName();
$(document).on(`${drag.start}.drag`, '.h5ds-drag', function(e) {
  if (drag.touch) {
    e = drag.touchEvent(e);
  }

  var xd = e.pageX,
    yd = e.pageY,
    // _this = this,
    $this = $(this),
    left = $this.offset().left,
    top = $this.offset().top;

  var set = {
    limit: true, //边界限制
    undrag: []
  };
  var dragset = $this.attr('data-dragset');
  dragset = dragset ? JSON.parse(dragset) : {};
  set = $.extend(set, dragset);

  //undrag 区域设置,不拖动
  if (set.undrag.length != 0) {
    for (let i = 0; i < set.undrag.length; i++) {
      if ($(e.target).closest(set.undrag[i])[0]) {
        return;
      }
    }
  }

  //限制边界
  if (set.limit) {
    var wid = $this.width(),
      hei = $this.height(),
      outLeft = $this.parent().offset().left,
      outTop = $this.parent().offset().top,
      outWid = $this.parent().width(),
      outHei = $this.parent().height();
  }

  $(document)
    .on(`${drag.move}.drag`, function(em) {
      if (drag.touch) {
        em = drag.touchEvent(em);
      }
      let x = left + (em.pageX - xd),
        y = top + (em.pageY - yd);

      //区域限制
      if (set.limit) {
        if (x < outLeft) {
          x = outLeft;
        } else if (x > outWid - wid) {
          x = outWid - wid;
        }

        if (y < outTop) {
          y = outTop;
        } else if (y > outHei - hei) {
          y = outHei - hei;
        }
      }

      $this.css({
        left: x,
        top: y
      });
    })
    .on(`${drag.end}.drag`, function() {
      $(document).off(`${drag.move}.drag ${drag.end}.drag`);
    });
});
