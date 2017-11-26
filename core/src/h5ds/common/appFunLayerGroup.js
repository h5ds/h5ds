import g from '../conf/global';
import { layerShow } from './layerFun';
import { AppDataChange, getViewDom } from './AppDataFun';

// layer 组的操作
// 同步保存 组的数据
function saveGroupData() {
    getViewDom().find('.mt-control').each(function () {
        let $layer = $(this).closest('.layer');
        let index = 9999 - $layer.css('z-index');
        let layer = AppData.data[AppData.edit.pageType][AppData.edit.pageIndex].layers[index];
        layer.style.left = $layer.css('left');
        layer.style.top = $layer.css('top');
    });
    AppDataChange();
}

// 获取layer 组的参数
export function getLayerGroupArr() {
    let arr = [];
    getViewDom().find('.mt-control').each(function () {
        let $this = $(this).closest('.layer');
        let oleft = parseInt($this.css('left'), 10);
        let otop = parseInt($this.css('top'), 10);
        arr.push({
            nleft: oleft,
            ntop: otop,
            dom: $this,
            left: oleft,
            top: otop
        });
    });

    return arr;
}

// 变化layer 组的位置, 新的x,y 坐标 是叠加的值
export function changeLayerGroupArr(arr, x, y) {
    let scale = AppData.edit.phoneScale || g.scale;
    arr.forEach(elem => {
        // 记录当前的位置
        if (x) {
            elem.nleft = elem.left + x / scale;
        } else {
            elem.nleft = elem.left;
        }
        if (y) {
            elem.ntop = elem.top + y / scale;
        } else {
            elem.ntop = elem.top;
        }
        elem.dom.css({
            left: elem.nleft,
            top: elem.ntop
        });
    });
}

// 设置 layer 组的 值
export function setLayerGroupArr(arr) {
    arr.forEach(elem => {
        let index = 9999 - elem.dom.css('z-index');
        let layer = AppData.data[AppData.edit.pageType][AppData.edit.pageIndex].layers[index];
        layer.style.left = elem.nleft + 'px';
        layer.style.top = elem.ntop + 'px';
    });
    AppDataChange();
    arr = null;
}

/**
 * @desc 组合图层 事件, app.js 里面调用一次
*/
export function groupLayers(self) {

    // $(document).trigger('appDataChange.history');

    // 通过旋转后的DIV，获取到外部DIV的坐标和尺寸
    /**              w
     *     ------------------------
     *     |                      |
     *     |     倾斜的矩形形      |  h
     *     |                      |
     *     ------------------------    
     */
    let rectParam = function ($dom) {
        let rotate = $dom.transform('rotate') % 90;
        let ro = rotate * (Math.PI / 180);
        let dw = parseInt($dom.css('width'), 10),
            dh = parseInt($dom.css('height'), 10);
        let dLeft = parseInt($dom.css('left'), 10),
            dTop = parseInt($dom.css('top'), 10);
        let center = {
            left: dLeft + dw / 2,
            top: dTop + dh / 2
        };
        if (rotate == 0) {
            return {
                top: dTop,
                left: dLeft,
                wid: dw,
                hei: dh,
                dw: dw,
                dh: dh,
                center: center
            };
        }
        let a = Math.cos(ro) * dw,
            b = Math.sin(ro) * dw,
            c = Math.cos(Math.PI / 2 - ro) * dh,
            d = Math.sin(Math.PI / 2 - ro) * dh;
        let wid = Math.ceil(c + a),
            hei = Math.ceil(b + d);
        return {
            top: center.top - hei / 2, // 外壳的 top
            left: center.left - wid / 2, // 外壳 的 left
            wid: wid, // 外壳宽
            hei: hei, // 外壳高
            dw: dw, // 真实宽
            dh: dh, // 真实高
            center: center
        }
    }

    // 快捷键功能, 左对齐
    $('#groupAlignLeft').on('click', function () {

        let min = Infinity;
        let $controls = getViewDom().find('.mt-control');
        $controls.each(function () {
            let $layer = $(this).closest('.layer');
            let val = rectParam($layer).left;
            if (val < min) {
                min = val;
            }
        });
        $controls.each(function () {
            let $layer = $(this).closest('.layer');
            let p = rectParam($layer);
            // 已知 外壳 left = min; 求left
            let domLeft = min + p.wid / 2 - p.dw / 2;
            // 这里要单独写个方法
            $layer.css('left', domLeft + 'px');
        });
        saveGroupData();
    });

    // 上对齐
    $('#groupAlignUpDown').on('click', function () {

        let min = Infinity;
        let $controls = getViewDom().find('.mt-control');
        $controls.each(function () {
            let $layer = $(this).closest('.layer');
            let val = rectParam($layer).top;
            if (val < min) {
                min = val;
            }
        });
        $controls.each(function () {
            let $layer = $(this).closest('.layer');
            let p = rectParam($layer);
            // 已知 外壳 left = min; 求left
            let domTop = min + p.hei / 2 - p.dh / 2;
            // 这里要单独写个方法
            $layer.css('top', domTop + 'px');
        });
        saveGroupData();
    });

    // 右对齐
    $('#groupAlignRight').on('click', function () {

        let max = 0;
        let $controls = getViewDom().find('.mt-control');
        $controls.each(function () {
            let $layer = $(this).closest('.layer');
            let p = rectParam($layer);
            let val = p.left + p.wid;
            if (val > max) {
                max = val;
            }
        });
        $controls.each(function () {
            let $layer = $(this).closest('.layer');
            let p = rectParam($layer);
            // 已知 外壳 left + wid = max; 求 left
            let domLeft = max - p.wid / 2 - p.dw / 2;
            // 这里要单独写个方法
            $layer.css('left', domLeft + 'px');
        });
        saveGroupData();
    });

    // 下对齐
    $('#groupAlignDown').on('click', function () {

        let max = 0;
        let $controls = getViewDom().find('.mt-control');
        $controls.each(function () {
            let $layer = $(this).closest('.layer');
            let p = rectParam($layer);
            let val = p.top + p.hei;
            if (val > max) {
                max = val;
            }
        });
        $controls.each(function () {
            let $layer = $(this).closest('.layer');
            let p = rectParam($layer);
            // 已知 外壳 left + wid = max; 求 left
            let domTop = max - p.hei / 2 - p.dh / 2;
            // 这里要单独写个方法
            $layer.css('top', domTop + 'px');
        });
        saveGroupData();
    });

    // 水平居中对齐
    $('#groupAlignLeftRightCenter').on('click', function () {

        let $controls = getViewDom().find('.mt-control');
        let len = $controls.length;
        let val = 0;
        $controls.each(function () {
            let $layer = $(this).closest('.layer');
            let p = rectParam($layer);
            val += p.center.top;
        });
        val = val / len; // 获取平均高度
        $controls.each(function () {
            let $layer = $(this).closest('.layer');
            let p = rectParam($layer);
            // 已知 外壳 pianYi = val - p.center.top; 求 top
            let domTop = val - p.dh / 2;
            // 这里要单独写个方法
            $layer.css('top', domTop + 'px');
        });
        saveGroupData();
    });

    // 垂直居中对齐
    $('#groupAlignUpDownCenter').on('click', function () {

        let $controls = getViewDom().find('.mt-control');
        let len = $controls.length;
        let val = 0;
        $controls.each(function () {
            let $layer = $(this).closest('.layer');
            let p = rectParam($layer);
            val += p.center.left;
        });
        val = val / len; // 获取平均高度
        $controls.each(function () {
            let $layer = $(this).closest('.layer');
            let p = rectParam($layer);
            // 已知 外壳 pianYi = val - p.center.top; 求 top
            let domLeft = val - p.dw / 2;
            // 这里要单独写个方法
            $layer.css('left', domLeft + 'px');
        });
        saveGroupData();
    });

    // 垂直均分
    $('#groupAlignUpDownEven').on('click', function () {

        let $controls = getViewDom().find('.mt-control');
        let len = $controls.length;
        let min = Infinity, max = 0;
        let all = 0; // 所有宽
        $controls.each(function () {
            let $layer = $(this).closest('.layer');
            let p = rectParam($layer);
            if (p.top < min) {
                min = p.top;
            }
            if ((p.top + p.hei) > max) {
                max = p.top + p.hei;
            }
            all += p.hei;
        });
        let eachSize = (max - min - all) / (len - 1); // 获取平均 间隔
        let prev = 0;
        $controls.each(function (index) {
            let $layer = $(this).closest('.layer');
            let p = rectParam($layer);
            if (index !== 0) {
                let val = eachSize + prev;
                // 这里要单独写个方法
                $layer.css('top', val + 'px');
                prev = val + p.hei;
            }else {
                prev = p.hei + p.top;
            }
        });
        saveGroupData();
    });

    // 水平均分
    $('#groupAlignRightLeftEven').on('click', function () {

        let $controls = getViewDom().find('.mt-control');
        let len = $controls.length;
        let min = Infinity, max = 0;
        let all = 0; // 所有宽
        $controls.each(function () {
            let $layer = $(this).closest('.layer');
            let p = rectParam($layer);
            if (p.left < min) {
                min = p.left;
            }
            if ((p.left + p.wid) > max) {
                max = p.left + p.wid;
            }
            all += p.wid;
        });
        let eachSize = (max - min - all) / (len - 1); // 获取平均 间隔
        let prev = 0;
        $controls.each(function (index) {
            let $layer = $(this).closest('.layer');
            let p = rectParam($layer);
            if (index !== 0) {
                let val = eachSize + prev;
                // 这里要单独写个方法
                $layer.css('left', val + 'px');
                prev = val + p.wid;
            }else {
                prev = p.wid + p.left;
            }
        });
        saveGroupData();
    });

    // 拖动事件
    let initGroupEvent = function () {
        // 让图层可拖动
        g.$doc.off('mousedown.group').on('mousedown.group', '.mt-control', function (ed) {
            ed.preventDefault();
            let arr = getLayerGroupArr(); // 获取layer 组的数据
            g.$doc.on('mousemove.group', function (em) {
                let x = em.pageX - ed.pageX;
                let y = em.pageY - ed.pageY;
                // 变化位置
                changeLayerGroupArr(arr, x, y);
            }).on('mouseup.group', function (eu) {
                // 数据缓存到 AppData, 设置组的值
                setLayerGroupArr(arr);
                g.$doc.off('mousemove.group mouseup.group');
            });
        });
    }

    // 鼠标右键功能， 慢慢开发
    // g.$doc.off('contextmenu.group').on('contextmenu.group', '.mt-control', function (e) {
    //     e.stopPropagation();
    //     e.preventDefault();
    //     $.contextMenu({
    //         x: e.pageX,
    //         y: e.pageY,
    //         vals: [
    //             { name: '<i class="iconfont icon-fuzhi"></i> 复制图层', val: 'copy' },
    //             { name: '<i class="iconfont icon-icodel"></i> 删除图层', val: 'del' }
    //         ],
    //         callback: (val, $layer) => {
    //             console.log(val);
    //             if (val === 'copy') {
    //                 console.log('复制图层！');
    //             } else if (val === 'del') {
    //                 console.log('删除图层！');
    //             }
    //         }
    //     });
    // });

    // 拖动选择一组layer
    $('#phone').off('mousedown.layerGroup').on('mousedown.layerGroup', function (ed) {
        if (!$(ed.target).closest('.layer')[0]) {

            // 控制器的代码
            let controlBox = `<div class="mt-control">
                <span class="mt-control-top"></span>
                <span class="mt-control-left"></span>
                <span class="mt-control-right"></span>
                <span class="mt-control-bottom"></span>
                <span class="mt-control-topleft"></span>
                <span class="mt-control-topright"></span>
                <span class="mt-control-bottomleft"></span>
                <span class="mt-control-bottomright"></span>
                <span class="mt-control-center"></span>
            </div>`;

            // 获取当前的layer 位置, 获取中心点。
            let arr = [];
            getViewDom().find('.layer').each(function () {
                let $this = $(this);
                let rotate = $this.transform('rotate');
                $this.transform({ 'rotate': '0deg' });
                let obj = {
                    left: $this.offset().left,
                    top: $this.offset().top,
                    width: $this.width(),
                    height: $this.height(),
                    dom: $this
                };
                if (rotate) {
                    $this.transform({ 'rotate': rotate + 'deg' });
                }
                obj.center = {
                    x: obj.left + obj.width / 2,
                    y: obj.top + obj.height / 2
                };
                arr.push(obj);
            });

            // 写入选中框
            if (!$('.layer-group-select')[0]) {
                $('body').append('<div class="layer-group-select"></div>');
            }

            // 拖动的时候，时刻监听，然后给对应的layer 设置好 样式
            let $selectGroup = $('.layer-group-select');
            let wid, hei, top, left;
            g.$doc.on('mousemove.layerGroup', function (em) {

                wid = Math.abs(em.pageX - ed.pageX);
                hei = Math.abs(em.pageY - ed.pageY);

                // 拉动鼠标
                em.pageX > ed.pageX ? left = ed.pageX : left = em.pageX;
                em.pageY > ed.pageY ? top = ed.pageY : top = em.pageY;

                $selectGroup.css({
                    top: top,
                    left: left,
                    width: wid,
                    height: hei
                });

                // 设置 控制器
                arr.forEach((elem, index) => {
                    let { x, y } = elem.center;
                    if (x > left && x < left + wid && y > top && y < top + hei) {
                        // console.log('中心了', index);
                        if (!elem.dom.find('.mt-control')[0]) {
                            elem.dom.append(controlBox);
                        }
                    } else {
                        elem.dom.find('.mt-control').remove();
                    }
                });

            }).on('mouseup.layerGroup', function (eu) {
                g.$doc.off('mousemove.layerGroup mouseup.layerGroup');
                // console.log(wid, hei, top, left);

                // 调出拖动组的浮动层，选中之后，接下来就要，对选中的进行操作了
                let $control = getViewDom().find('.mt-control');
                if ($control.length > 1) {
                    console.log('触发图层集合的操作');
                    // 显示 设置区域
                    layerShow('#setLayerGroupBox');

                    // 启用组合模式 , 这时候，设置个 group 参数，如果在点击 layer 的时候，发现有 group 参数，就统一操作
                    AppData.edit.group = true;

                    // 初始化图层组的事件，拖动移动位置
                    initGroupEvent();

                } else if ($control.length === 1) {
                    // 只选中一个，就选择这个图层
                    $control.closest('.layer').trigger('click');
                } else {
                    // ...
                }

                // 释放内存
                arr = null;
                $selectGroup.remove();

            });
        }
    });
}