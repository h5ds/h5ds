//控制杆
import g from '../conf/global';
import './transform.js'; //transform 方法

$.fn.control = function(setting) {
    var defaults = {
        movex: true, //x方向移动
        movey: true, //y方向移动
        autosize: true, //任意拉伸
        fixedsize: true, //固定比例拉伸
        rotate: true //旋转
    }
    var $this = $(this);
    var set = $.extend(defaults, setting);
    var shtml = `<div class="mt-control">
					{{rotate}}
					{{autosize}}
					{{fixedsize}}
					<span class="mt-control-center"></span>
				</div>`;

    //如果没有旋转
    if (set.rotate) {
        shtml = shtml.replace('{{rotate}}', '<span class="mt-control-rotate"></span>')
    } else {
        shtml = shtml.replace('{{rotate}}', '');
    }

    //自动缩放
    if (set.autosize) {
        shtml = shtml.replace('{{autosize}}', `<span class="mt-control-top"></span>
					<span class="mt-control-left"></span>
					<span class="mt-control-right"></span>
					<span class="mt-control-bottom"></span>`)
    } else {
        shtml = shtml.replace('{{autosize}}', '');
    }

    //如果没有缩放
    if (set.fixedsize) {
        shtml = shtml.replace('{{fixedsize}}', `<span class="mt-control-topleft"></span>
					<span class="mt-control-topright"></span>
					<span class="mt-control-bottomleft"></span>
					<span class="mt-control-bottomright"></span>`)
    } else {
        shtml = shtml.replace('{{fixedsize}}', '');
    }

    var $controlDom = $this.find('.mt-control');
    if ($controlDom[0]) {
        $controlDom.remove();
        $controlDom = null;
    }

    $this.append(shtml);

    //移动
    var moveFun = function(e, _this) {
        let down = {
            x: e.pageX,
            y: e.pageY
        }
        let $box = $(_this).parent();
        let scale = AppData.edit.phoneScale || g.scale;
        let box = {
            left: parseInt($box.css('left'), 10) * scale,
            top: parseInt($box.css('top'), 10) * scale
        }
        let style = null;
        g.$doc.on('mousemove.control_move', function(em) {
            em.stopPropagation();
            style = {
                left: (box.left + (em.pageX - down.x)) / scale,
                top: (box.top + (em.pageY - down.y)) / scale
            }
            if (!set.movex) {
                delete style.left;
            }
            if (!set.movey) {
                delete style.top;
            }
            $box.css(style);
        }).on('mouseup.control_move', function(e) {
            g.$doc.off('mousemove.control_move mouseup.control_move');
            $this.trigger('change', style);
            style = null;
        })
    }

    //旋转
    var rotateFun = function(e, _this) {
        let $target = $(e.target);
        let $center = $(_this).find('.mt-control-center');
        let $box = $(_this).parent();
        let center = {
            x: parseInt($center.offset().left, 10),
            y: parseInt($center.offset().top, 10)
        }
        let pi = 180 / Math.PI;
        let du = null;
        g.$doc.on('mousemove.control_rotate', function(em) {
            let x = em.pageX - center.x;
            let y = center.y - em.pageY;
            du = Math.atan(x / y);
            du = du * pi;
            du = parseInt(du, 10);

            //判断向限
            if (x >= 0 && y >= 0) { //1
                //...
            } else if (x >= 0 && y < 0) { //4
                du = Math.abs(du);
                du = 180 - du;
            } else if (x < 0 && y >= 0) { //2
                du = du + 360;
            } else { //3
                du = du + 180;
            }
            //旋转的时候，固定中心点
            $box.transform({
                'rotate': du + 'deg'
            })
        }).on('mouseup.control_rotate', function(e) {
            e.stopPropagation();
            g.$doc.off('mousemove.control_rotate mouseup.control_rotate');
            $this.trigger('change', {
                'rotate': du + 'deg'
            });
            du = null;
        })
    }

    //缩放
    var resizeFun = function(e, _this, type) {
        let down = {
            x: e.pageX,
            y: e.pageY
        }
        let scale = AppData.edit.phoneScale || g.scale;
        let $box = $(_this).parent();
        let box = {
            wid: parseInt($box.width(), 10),
            hei: parseInt($box.height(), 10),
            left: parseInt($box.css('left'), 10),
            top: parseInt($box.css('top'), 10)
        }
        // let scale = $box.transform('scale');
        let hei = null,
            wid = null,
            top = null,
            left = null;
        
        g.$doc.on('mousemove.control_resize', function(em) {
            let val = {
                x: (em.pageX - down.x) / scale,
                y: (em.pageY - down.y) / scale
            }
            if (type == 'top') {
                hei = box.hei - val.y;
                top = box.top + val.y;
            } else if (type == 'bottom') {
                hei = box.hei + val.y;
            } else if (type == 'left') {
                wid = box.wid - val.x;
                left = box.left + val.x;
            } else if (type == 'right') {
                wid = box.wid + val.x;
            } else if (type == 'topleft') {
                wid = box.wid - val.x;
                hei = box.hei / box.wid * wid;
                top = box.top + box.hei - hei;
                left = box.left + val.x;
            } else if (type == 'topright') {
                wid = box.wid + val.x;
                hei = box.hei / box.wid * wid;
                top = box.top + box.hei - hei;
            } else if (type == 'bottomleft') {
                wid = box.wid - val.x;
                hei = box.hei / box.wid * wid;
                left = box.left + val.x;
            } else if (type == 'bottomright') {
                wid = box.wid + val.x;
                hei = box.hei / box.wid * wid;
            }

            $box.css({
                height: hei || box.hei,
                width: wid || box.wid,
                top: top || box.top,
                left: left || box.left
            });

        }).on('mouseup.control_resize', function(e) {
            g.$doc.off('mousemove.control_resize mouseup.control_resize');
            $this.trigger('change', {
                height: hei || box.hei,
                width: wid || box.wid,
                top: top || box.top,
                left: left || box.left
            })
        })
    }

    //销毁
    this.distory = function() {
        $('.mt-control').remove();
        moveFun = null;
        rotateFun = null;
        resizeFun = null;
    }

    //事件绑定
    g.$doc.off('mousedown.control').on('mousedown.control', '.mt-control', function(e) {
        e.preventDefault();
        e.stopPropagation();

        // 专门给 group 提供的，如果正在编辑器组合，原来的方法都失效
        if(AppData.edit.group) {
            return;
        }

        switch (e.target.className) {
            case 'mt-control':
                moveFun(e, this);
                break;
            case 'mt-control-rotate':
                rotateFun(e, this);
                break;
            case 'mt-control-top':
                resizeFun(e, this, 'top');
                break;
            case 'mt-control-topleft':
                resizeFun(e, this, 'topleft');
                break;
            case 'mt-control-topright':
                resizeFun(e, this, 'topright');
                break;
            case 'mt-control-bottom':
                resizeFun(e, this, 'bottom');
                break;
            case 'mt-control-bottomleft':
                resizeFun(e, this, 'bottomleft');
                break;
            case 'mt-control-bottomright':
                resizeFun(e, this, 'bottomright');
                break;
            case 'mt-control-left':
                resizeFun(e, this, 'left');
                break;
            case 'mt-control-right':
                resizeFun(e, this, 'right');
                break;
        }
    });

    return this;

}