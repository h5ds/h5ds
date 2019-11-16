/**
 * @desc 帮助提示jquery插件
 * data 传入一个 数组 [ {dom: '#id1', content: '内容...'} ]
 */
$.helps = function(setting) {
  let defaults = {
    data: [] // 提示列队
  };
  let set = $.extend(defaults, setting);

  // 如果没有，就初始化一个
  if (!$('.h5ds-helps')[0]) {
    $('body').append(`
      <div class="h5ds-helps">
          <div class="h5ds-helps-content">
              <a class="h5ds-helps-close"><i class="h5ds-ico h5ds-ico-close"></i></a>
              <div class="h5ds-helps-info"></div>
              <div class="h5ds-helps-btns">
                  <a class="h5ds-helps-prev">上一步</a>
                  <a class="h5ds-helps-next">下一步</a>
                  <a class="h5ds-helps-end">完成</a>
              </div>
          </div>
      </div>
      `);
  }

  let $help = $('.h5ds-helps');
  let $content = $help.find('.h5ds-helps-content');

  // 显示DOM
  let showDom = function(index) {
    if (index === 0) {
      $('.h5ds-helps-prev').hide();
      $('.h5ds-helps-next').show();
      $('.h5ds-helps-end').hide();
    } else if (index === set.data.length - 1) {
      $('.h5ds-helps-next').hide();
      $('.h5ds-helps-end').show();
      $('.h5ds-helps-prev').show();
    } else {
      $('.h5ds-helps-end').hide();
      $('.h5ds-helps-next').show();
      $('.h5ds-helps-prev').show();
    }
    let obj = set.data[index];
    let $target = $(obj.dom);
    let size = {
      transfrom: $target.css('transfrom'),
      width: $target.outerWidth(),
      height: $target.outerHeight(),
      left: $target.offset().left,
      top: $target.offset().top
    };
    console.log('size ->', size);
    $help.css(size);
    $content.removeClass().addClass('h5ds-helps-content h5ds-helps-' + obj.pos);
    $help.find('.h5ds-helps-info').html(obj ? obj.content : '');
  };

  // 默认显示第一个
  let activeIndex = 0;
  showDom(activeIndex);
  if (set.data.length === 1) {
    $('.h5ds-helps-next').hide();
    $('.h5ds-helps-end').show();
  }

  // 事件绑定
  $help.on('click', '.h5ds-helps-next', function() {
    activeIndex++;
    if (activeIndex < set.data.length) {
      showDom(activeIndex);
    }
  });

  $help.on('click', '.h5ds-helps-prev', function() {
    activeIndex--;
    if (activeIndex >= 0) {
      showDom(activeIndex);
    }
  });

  $help.on('click', '.h5ds-helps-close, .h5ds-helps-end', function() {
    $help.off('click');
    $help.remove();
  });
};
