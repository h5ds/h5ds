//////////////////////////////////////////////////////////////////////////////////////////
// 交互事件
export function initH5dsSwiperUeFun(swiper) {

    $(document).find('[data-uefun]').each(function () {
        var $this = $(this);
        var obj = $this.attr('data-uefun'); // 
        if (obj) {
            try {
                obj = JSON.parse(unescape(obj));
            } catch (e) {
                obj = null;
                console.warn('data-uefun 格式错误！具体见：', unescape(obj), this);
            }
            if (obj) {
                // 监听点击事件
                $this.swipe({
                    tap: function (e) {
                        if ($(e.target).css('opacity') == 0) {
                            return;
                        }
                        for (var key in obj) {
                            console.log(obj, key);
                            switch (key) {
                                case 'link': toLink(obj[key], $this, swiper); break;
                                case 'toPage': toPage(obj[key], $this, swiper); break;
                                case 'tel': toTel(obj[key], $this, swiper); break;
                                case 'msg': toMsg(obj[key], $this, swiper); break;
                                case 'hideShow': toHideShow(obj[key], $this, swiper); break;
                            }
                        }
                    }
                });
            }
        }
    });
} (window);

// 超链接
function toLink(obj, $layer, swiper) {
    location.href = obj.data;
}

// 发短信
function toMsg(obj, $layer, swiper) {
    location.href = 'sms:' + obj.data;
}

// 打电话
function toTel(obj, $layer, swiper) {
    location.href = 'tel:' + obj.data;
}

// 页面跳转
function toPage(obj, $layer, swiper) {
    swiper.toPage(obj.data);
}

// 隐藏显示元素
function toHideShow(obj, $layer, swiper) {
    var ids = [];
    try {
        ids = obj.data.ids.split(',');
    } catch (e) {
        // ...
        console.warn('obj.data.ids 为 null');
    }
    if (obj.data.type === 'hide') {
        ids.forEach(function (elem, index) {
            $('#' + elem).hide();
        });
    } else if (obj.data.type === 'show') {
        ids.forEach(function (elem, index) {
            $('#' + elem).show();
        });
    } else if (obj.data.type === 'showhide') {
        ids.forEach(function (elem, index) {
            var $dom = $('#' + elem);
            if ($dom.is(':hidden')) {
                $dom.show();
            } else {
                $dom.hide();
            }
        });
    } else {
        // ...
    }
}