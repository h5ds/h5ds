/**
 * @desc jquery的拖动排序。无侵入式，使用方法。只需要保持以下格式即可，可动态增删li：
 * <ul class="h5ds-uniqlist">
 *    <li>1</li>
 *    <li>2</li>
 *    <li>3</li>
 *    <li>4</li>
 * </ul>
 *
 * 引用方式: 在app.js 直接引用 import 'dragsort.js'; // 只引用一次
 */
$(document).on('mousedown.uniqlist', '.h5ds-uniqlist', function(e) {
  e.stopPropagation();
  var xd = e.pageX,
    yd = e.pageY,
    $this = $(this);

  $this.trigger('uniqstart');

  // 点击其他区域，不拖动
  if (e.target.className === 'h5ds-uniqlist') {
    return;
  }

  //处理 二次拖动clone的BUG
  if ($(e.target).closest('.h5ds-uniq-clone')[0]) {
    return;
  }

  let $li = $(e.target).closest('li');

  if (!$li[0]) {
    return;
  }

  let left = parseInt($li.position().left, 10),
    top = parseInt($li.position().top, 10),
    liHei = $li.height();
  let startIndex = $li.index();

  let $clone = null;

  // 使用clone 方法
  let cloneDom = () => {
    $li
      .addClass('h5ds-uniq-start')
      .siblings('li')
      .removeClass('h5ds-uniq-start');
    // 使用clone
    $clone = $($li.clone());
    $clone.addClass('h5ds-uniq-clone').css({
      left: left,
      top: top,
      width: $li.width(),
      height: $li.height(),
      position: 'absolute'
    });
    $this.append($clone.prop('outerHTML'));
    $clone = $('.h5ds-uniq-clone');
  };

  // 这里只能上下拖动
  let outHei = parseInt($li.css('margin-top'), 10) + parseInt($li.css('margin-bottom'), 10);
  let maxHei = liHei + outHei;

  let litop = parseInt($li.css('top'), 10);
  let stop = $this.scrollTop();
  litop = litop != 'auto' ? litop : 0;

  // 处理click事件
  let clickMark = true;
  let initCloneMark = false;

  $(document)
    .on('mousemove.uniqlist', em => {
      let move = litop + (em.pageY - yd);

      // 允许2px的误差
      if (Math.abs(move) > 3) {
        clickMark = false;
        // 只执行一次
        if (!initCloneMark) {
          initCloneMark = true;
          cloneDom();
          cloneDom = null;
        }
        $clone.css({
          left: left + (em.pageX - xd),
          top: top + (em.pageY - yd) + stop
        });

        if (move > 0 && move > maxHei) {
          if ($li.next()[0]) {
            litop -= maxHei;
            $li.before($li.next());
          }
        } else if (move < 0 && -move > maxHei) {
          if ($li.prev()[0]) {
            litop += maxHei;
            $li.after($li.prev());
          }
        }
      }
    })
    .on('mouseup.uniqlist', () => {
      let endleft = parseInt($li.position().left, 10),
        endtop = parseInt($li.position().top, 10) + stop;

      // click事件
      if (clickMark) {
        $li.removeClass('h5ds-uniq-start');
        $this = null;
        $li = null;
      } else {
        $clone.animate(
          {
            left: endleft,
            top: endtop
          },
          500,
          () => {
            $clone.remove();
            $li.removeClass('h5ds-uniq-start');
            let endIndx = $li.index();
            if (endIndx >= 0 && startIndex != endIndx) {
              $this.trigger('uniqend', {
                from: startIndex,
                to: endIndx
              });
            }
            $clone = null;
            $this = null;
            $li = null;
          }
        );
      }
      $(document).off('mousemove.uniqlist');
      $(document).off('mouseup.uniqlist');
    });
});
