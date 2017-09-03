//控制杆
import g from '../conf/global';
import './transform.js'; //transform 方法

$.fn.crop = function(setting) {
    var defaults = {
        movex: true,
        movey: true,
        borderWidth: -500,
        callback: null,
        delBtn: false,
        defaultWidth: 323, // 默认的图片框宽度
        defaultHeight: 218, // 默认的图片框高度
        wh: ['100%', '100%'] // 如果设置 100% 就表示默认 全屏显示，也可以设置 1,2 表示比例
    }
    var set = $.extend(defaults, setting);

    // 剪切区域宽度和高度，这里定义的全局变量，不做参数传递
    set['width'] = 0;
    set['height'] = 0;

    var _this = this;
    var $crop = $(this);
    var $this = $(this).empty(); // 渲染前，先清空内容，解除事件
    var srcOld = $this.data('src');

    if(!srcOld) {
        return false;
    }

    var idname = +new Date(); // 时间戳做事件别名
    var shtml = `<div class="mt-crop">
                    <div class="mt-crop-bg">
                        <div class="mt-crop-box">
                            <div class="mt-crop-controlbox">
                                <div class="mt-crop-control">
                                    <span class="mt-control-center"></span>
                                    <span class="mt-control-top"></span>
                                    <span class="mt-control-left"></span>
                                    <span class="mt-control-right"></span>
                                    <span class="mt-control-bottom"></span>
                                    <span class="mt-control-topleft"></span>
                                    <span class="mt-control-topright"></span>
                                    <span class="mt-control-bottomleft"></span>
                                    <span class="mt-control-bottomright"></span>
                                </div>
                            </div>
                            <img class="mt-crop-img" src="${srcOld}" alt="">
                        </div>
                    </div>
                    <div class="mt-crop-fun">
                        <a class="mt-crop-100">100%</a><!--
                        --><a class="mt-crop-11">1:1</a><!--
                        --><a class="mt-crop-23">2:3</a><!--
                        --><a class="mt-crop-34">3:4</a><!--
                        --><a class="mt-crop-35">3:5</a>
                    </div>
                    <div class="mt-crop-btns">
                           <a class="mt-cropbtn-change a-selectimg"><i class="iconfont icon-icoreset"></i> 换图</a><!--
                        --><a class="mt-cropbtn-crop"><i class="iconfont icon-icocrop"></i> 裁剪</a><!--
                        --><a class="mt-cropbtn-init"><i class="iconfont icon-icoinit"></i> 还原</a><!--
                        -->${set.delBtn ? '<a class="mt-cropbtn-del"><i class="iconfont icon-icodel"></i> 删除</a>' : ''}
                    </div>
                </div>`;

    $this.find('.mt-crop').remove();
    $this = $this.empty().html(shtml).find('.mt-crop');

    var swid, shei; //选区大小
    var $bg = $this.find('.mt-crop-bg');
    var bg = {
        wid: parseInt($bg.width(), 10),
        hei: parseInt($bg.height(), 10)
    }
    var img = null;
    var x = set.borderWidth,
        y = set.borderWidth; //移动位置
    //初始化图片
    var $img = $this.find('.mt-crop-img');

    //移动
    var moveFun = function(e, _this) {
        var down = {
            x: e.pageX,
            y: e.pageY
        }
        var $box = $(_this).parent();
        var box = {
            left: parseInt($box.css('left'), 10),
            top: parseInt($box.css('top'), 10)
        }
        g.$doc.on('mousemove.crop_move', function(em) {
            var left = box.left + (em.pageX - down.x) / g.scale - set.borderWidth;
            var top = box.top + (em.pageY - down.y) / g.scale - set.borderWidth;
            if (top + shei > set.height) {
                top = set.height - shei - 2;
            }
            if (top < 0) {
                top = 0;
            }
            if (left + swid > set.width) {
                left = set.width - swid - 2;
            }
            if (left < 0) {
                left = 0;
            }
            top += set.borderWidth;
            left += set.borderWidth;

            y = top;
            x = left;

            var style = {
                left: left,
                top: top
            }
            if (!set.movex) {
                delete style.left;
            }
            if (!set.movey) {
                delete style.top;
            }
            $box.css(style);
            style = null;
        }).on('mouseup.crop_move', function(e) {
            g.$doc.off('mousemove.crop_move mouseup.crop_move')
        })
    }

    //缩放
    var resizeFun = function(e, _this, type) {
        var down = {
            x: e.pageX,
            y: e.pageY
        }
        var $box = $(_this).parent();
        var box = {
            wid: parseInt($box.width(), 10),
            hei: parseInt($box.height(), 10),
            left: parseInt($box.css('left'), 10),
            top: parseInt($box.css('top'), 10)
        }
        var scale = $box.transform('scale');

        swid = box.wid;
        shei = box.hei;

        g.$doc.on('mousemove.crop_resize', function(em) {

            var val = {
                x: (em.pageX - down.x),
                y: (em.pageY - down.y)
            }
            var hei, wid;
            if (type == 'top') {
                hei = box.hei - val.y;
                y = (box.top + val.y);

                //超出top
                if (y - set.borderWidth < 0) {
                    y = set.borderWidth;
                }
                if (hei > img.hei) {
                    hei = img.hei - 2;
                } else if (y - set.borderWidth > img.hei) {
                    y = set.borderWidth + img.hei - 2;
                }

                $box.css({
                    height: hei,
                    top: y
                })
            } else if (type == 'bottom') {
                hei = box.hei + val.y;

                //超出底部
                if (y - set.borderWidth + hei > img.hei) {
                    hei = img.hei - (y - set.borderWidth) - 2
                }

                $box.css({
                    height: hei
                })
            } else if (type == 'left') {
                wid = box.wid - val.x;
                x = box.left + val.x;

                //左边超出
                if (x - set.borderWidth < 0) {
                    x = set.borderWidth;
                }
                if (wid > img.wid) {
                    wid = img.wid - 2;
                }

                $box.css({
                    width: wid,
                    left: x
                })
            } else if (type == 'right') {
                wid = box.wid + val.x;

                //右边超出
                if (x - set.borderWidth + wid > img.wid) {
                    wid = img.wid - (x - set.borderWidth) - 2
                }

                $box.css({
                    width: wid
                })
            } else if (type == 'topleft') {
                wid = box.wid - val.x;
                hei = box.hei / box.wid * wid;
                x = box.left + val.x;
                y = box.top + box.hei - hei;

                //超出
                if (x - set.borderWidth < 0) {
                    x = set.borderWidth;
                }
                if (wid > img.wid) {
                    wid = img.wid - 2;
                }
                if (y - set.borderWidth < 0) {
                    y = set.borderWidth;
                } else if (y - set.borderWidth > img.hei) {
                    y = set.borderWidth + img.hei - 2;
                }
                if (hei > img.hei) {
                    hei = img.hei - 2;
                }

                $box.css({
                    height: hei,
                    width: wid,
                    top: y,
                    left: x
                })
            } else if (type == 'topright') {
                wid = box.wid + val.x;
                hei = box.hei / box.wid * wid;
                y = box.top + box.hei - hei;

                //超出
                if (x - set.borderWidth + wid > img.wid) {
                    wid = img.wid - (x - set.borderWidth) - 2
                }
                if (y - set.borderWidth < 0) {
                    y = set.borderWidth;
                } else if (y - set.borderWidth > img.hei) {
                    y = set.borderWidth + img.hei - 2;
                }
                if (hei > img.hei) {
                    hei = img.hei - 2;
                }

                $box.css({
                    height: hei,
                    width: wid,
                    top: y
                })
            } else if (type == 'bottomleft') {
                wid = box.wid - val.x;
                hei = box.hei / box.wid * wid;
                x = box.left + val.x;

                //超出
                if (x - set.borderWidth < 0) {
                    x = set.borderWidth;
                }
                if (wid > img.wid) {
                    wid = img.wid - 2;
                }
                if (y - set.borderWidth + hei > img.hei) {
                    hei = img.hei - (y - set.borderWidth) - 2
                }

                $box.css({
                    width: wid,
                    height: hei,
                    left: x
                })
            } else if (type == 'bottomright') {
                wid = box.wid + val.x;
                hei = box.hei / box.wid * wid;

                //超出
                if (x - set.borderWidth + wid > img.wid) {
                    wid = img.wid - (x - set.borderWidth) - 2
                }
                if (y - set.borderWidth + hei > img.hei) {
                    hei = img.hei - (y - set.borderWidth) - 2
                }

                $box.css({
                    height: hei,
                    width: wid
                })
            }

            if (wid) {
                swid = wid;
            }
            if (hei) {
                shei = hei;
            }

        }).on('mouseup.crop_resize', function(e) {
            g.$doc.off('mousemove.crop_resize mouseup.crop_resize')
        })
    }

    //图片预加载
    var loadImage = function(url, callback) {
        var imgs = new Image();
        imgs.src = url;
        imgs.onload = function() { //图片下载完毕时异步调用callback函数。 
            callback(imgs); // 将callback函数this指针切换为img。
            // imgs.onload = null;
        };
    }

    //获取参数
    var getValue = function() {
        var scale = img.wid / img.width;
        return {
            x: (x - set.borderWidth) / scale,
            y: (y - set.borderWidth) / scale,
            width: swid / scale,
            height: shei / scale,
            realWidth: img.width,
            realHeight: img.height,
            src: img.src
        }
    }

    //设置比例
    var setSize = function(a, b) {

        if (a == '100%') {
            swid = img.wid;
            shei = img.hei;
        } else {
            //设置宽度
            if (img.wid > img.hei) {
                swid = img.hei * a / b;
                shei = img.hei;
            } else {
                swid = img.wid;
                shei = img.wid * b / a;
            }
        }

        var $controlbox = $this.find('.mt-crop-controlbox');

        $controlbox.css({
            display: 'block',
            width: swid - 2,
            height: shei - 2,
            top: set.borderWidth,
            left: set.borderWidth
        });

        //保留原来属性
        if (!$controlbox.attr('data-old')) {
            $controlbox.attr('data-old', $controlbox.attr('style'))
        }
    }

    //设置参数 - 图片预加载后，设置一些参数
    var reSet = function(_img) {
        img = {
            width: _img.width,
            height: _img.height,
            wid: parseInt($img.width(), 10),
            hei: parseInt($img.height(), 10),
            src: _img.src
        }

        // 如果图片是隐藏的。需要手动去计算wid,hei， 默认的宽高是323px * 218px
        if ($img.is(':hidden')) {

            //
            if(img.width < set.defaultWidth && img.height < set.defaultHeight) {
                img.wid = img.width;
                img.hei = img.height;
            } else{
                // 如果真实图片的 宽度比较小
                if (img.width / img.height >= set.defaultWidth / set.defaultHeight) {
                    img.wid = set.defaultWidth;
                    img.hei = img.wid * (img.height / img.width);
                } else { // 如果高度比较小
                    img.hei = set.defaultHeight;
                    img.wid = img.hei * (img.width / img.height);
                }
            }
        }

        console.log('reSet Crop');

        //设置移动范围
        set.width = img.wid;
        set.height = img.hei;
        swid = img.wid;
        shei = img.hei;

        //设置区域
        $this.find('.mt-crop-box').css({
            width: img.wid,
            height: img.hei,
            top: (bg.hei - img.hei) / 2
        });

        //初始化剪切区域
        setSize(set.wh[0], set.wh[1]);
    }

    //销毁
    _this.distory = function() {
        $crop.off('mousedown.crop_' + idname);
        $crop.off('click.crop_' + idname);
        $crop.off('click.cropset_' + idname);
        $crop.off('click.cropinit_' + idname);
        $crop.off('click.cropchang_' + idname);
        $crop.off('click.cropdel_' + idname);
        $this.find('.mt-crop').remove();
    }

    //事件绑定
    var initEvent = function() {

        //事件绑定
        $crop.off('mousedown.crop_' + idname).on('mousedown.crop_' + idname, '.mt-crop-control', function(e) {
            switch (e.target.className) {
                case 'mt-crop-control':
                    moveFun(e, this);
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

        //裁剪
        $crop.off('click.crop_' + idname).on('click.crop_' + idname, '.mt-cropbtn-crop', function(e) {
            var obj = getValue();
            var image = new Image();
            image.src = obj.src;
            var canvas = $('<canvas width="' + obj.width + '" height="' + obj.height + '"></canvas>')[0],
                ctx = canvas.getContext('2d');

            ctx.drawImage(
                image,
                obj.x,
                obj.y,
                obj.width,
                obj.height,
                0,
                0,
                obj.width,
                obj.height);
            var data = canvas.toDataURL();

            //console.log(data)
            _this.distory();
            $crop.data('src', data);
            $crop.crop(set);

            //事件触发
            $crop.trigger('crop', {
                imgData: data,
                crop: obj,
                name: 'crop_' + idname
            })

        });

        //设置比例
        $crop.off('click.cropset_' + idname).on('click.cropset_' + idname, '.mt-crop-fun', function(e) {
            switch (e.target.className) {
                case 'mt-crop-100': setSize('100%', '100%'); break;
                case 'mt-crop-11': setSize(1, 1); break;
                case 'mt-crop-23': setSize(2, 3); break;
                case 'mt-crop-34': setSize(3, 4); break;
                case 'mt-crop-35': setSize(3, 5); break;
            }
        })

        //还原
        $crop.off('click.cropinit_' + idname).on('click.cropinit_' + idname, '.mt-cropbtn-init', function(e) {
            console.log('还原');
            _this.distory();
            var src = $crop.attr('data-oldsrc');
            $crop.data('src', src);
            $crop.crop(set);
            //事件触发
            $crop.trigger('crop', src);
        })

        //换图
        $crop.off('click.cropchang_' + idname).on('click.cropchang_' + idname, '.mt-cropbtn-change', function(e) {
            //_this.distory();
            //事件触发 , _this 是当前操作的 DOM 。 
            $crop.trigger('cropNew', _this);
        })

        //删除
        $crop.off('click.cropdel_' + idname).on('click.cropdel_' + idname, '.mt-cropbtn-del', function(e) {
            _this.distory();
            //$this.remove();
            //事件触发
            // $(_this).find('.mt-crop').hide();
            $crop.trigger('cropDel');
        })
    }

    //图片预加载
    var mark = true;
    loadImage($img.attr('src'), function(_img) {
        //设置参数
        reSet(_img);
        if(mark) {
            mark = false;
            initEvent();
        }
        
    });

    return _this;

}