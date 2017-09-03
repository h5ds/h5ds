import g from '../conf/global';
import { getNowPage, AppDataChange } from './AppDataFun';
import { uploadImgBase64, addUserTpls } from '../server/ajax';
import { getUserTplsFun } from '../source/tplSource';
import { setStorage, getStorage } from '../localSave/localStorage.js';
import { uniqendLayer, layerShow } from './layerFun';
/**
 * APP 函数集合
*/
// 放大画布
function fastToMax() {
    $('#fastToMax').off('click').on('click', (e) => {
        let $phonebox = $('.phonebox');
        let scale = $phonebox.transform('scale') || 1;
        AppData.edit.phoneScale = scale;
        scale += 0.2;
        if (scale > 2) {
            scale = 2;
        }
        $phonebox.transform({
            scale: scale
        });
    });
}

// 缩小画布
function fastToMin() {
    $('#fastToMin').off('click').on('click', (e) => {
        let $phonebox = $('.phonebox');
        let scale = $phonebox.transform('scale') || 1;
        scale -= 0.2;
        if (scale < 0.5) {
            scale = 0.5;
        }
        AppData.edit.phoneScale = scale;
        $phonebox.transform({
            scale: scale
        });
    });
}

/**
 * 鼠标滚动缩放页面
*/
function mouseWheelPhone() {
    $('.phonebox').on('mousewheel.phone', (e) => {
        e.preventDefault();
        // 往下加
        if (e.originalEvent.deltaY > 0) {
            $('#fastToMax').trigger('click');
        } else {
            $('#fastToMin').trigger('click');
        }
    });
}

/**
 * 复制页面
*/
function copyPage(self) {
    $('.add-page-do').on('click', () => {
        self.copyPage(AppData.edit.pageIndex);
    });
}

/**
 * 删除页面
*/
function delPage(self) {
    $('.del-page-do').on('click', () => {
        self.delPage(AppData.edit.pageIndex);
    });
}

/**
 * 新增页面
*/
function addPage(self) {
    $('#fastAddNewPage').on('click', () => {
        self.addPage(AppData.edit.pageIndex);
    });
}

/**
 * 保存当前模板
*/
function savePage(self) {
    $('.save-page-do').on('click', function () {
        if (AppData.edit.pageIndex !== null) {
            let page = getNowPage();
            page = JSON.parse(JSON.stringify(page));
            delete page['index'];

            let load = $.loading();
            html2canvas($('#pageView')[0], {
                height: 486,
                width: 320
            }).then(function (canvas) {
                uploadImgBase64({
                    imgData: canvas.toDataURL("image/jpeg", 0.5)
                }).done(res => {
                    // console.log(res);
                    load.close();
                    if (!res.success) {
                        return;
                    }
                    addUserTpls({
                        name: page.name,
                        data: JSON.stringify(page),
                        pic: res.data.src
                    }).done(result => {
                        if (result.success) {
                            $.tip({});
                            // 重新加载用户模板列表
                            getUserTplsFun({
                                type: '',
                                pagesize: 20,
                                page: 1
                            });
                        }
                    });
                });
            });
        }
    });
}

// 撤销，next
function unRedoFun(self) {
    let appPageHistory = '';
    let appHistoryIndex = 0; // 记录当前的下标
    let appHistoryLock = false; // 点击撤销，恢复按钮的时候，不记录操作

    let historyFun = (e, mark) => {

        if (appHistoryLock) {
            return;
        }

        let index = AppData.edit.pageIndex;
        let page = AppData.data.pages[index];
        let pageStr = JSON.stringify(page);
        if (mark && appPageHistory !== pageStr) {
            console.log('发生变化，进行缓存记录');
            // 缓存记录 
            AppData.edit.history.push(JSON.stringify({
                page: page,
                index: index
            }));
            // 只存20条记录
            if (AppData.edit.history.length > 20) {
                AppData.edit.history.shift();
            }
            appHistoryIndex = AppData.edit.history.length - 1;
            appPageHistory = pageStr;
        }
    };

    // 绑定历史操作监听
    $(document).on('mouseup.history keyup.history appDataChange.history', historyFun);

    // 点击撤销，下一步之后的操作
    let unRedo = () => {
        // console.log(appHistoryIndex);
        if (appHistoryIndex < 0) {
            appHistoryIndex = 0;
            return;
        }
        appHistoryLock = true;
        let history = AppData.edit.history;
        if (history.length > 0) {
            let his = history[appHistoryIndex];
            if (his) {
                let obj = JSON.parse(his);
                AppData.data.pages[obj.index] = obj.page;
                $('#pagesList').find('.page-item').eq(obj.index).trigger('click', true);
            }
        }
        appHistoryLock = false;
    }

    // 撤销， 撤销的时候，不记录缓存
    $('#fastToNext').on('click', (e) => {
        e.stopPropagation();
        appHistoryIndex--;
        unRedo(appHistoryIndex);
    });

    // 下一步
    $('#fastToPrev').on('click', (e) => {
        e.stopPropagation();
        appHistoryIndex++;
        unRedo(appHistoryIndex);
    });
}

// 设置 x,y 坐标
/**
 * @desc 坐标添加或者删除
 * @param d 方向 x, y
 * @param type 添加或者减少 add, del
 * @param num 每次添加减少的值
*/
function setXYPoint(xy, type, num) {
    // ...
    let $dom = null;
    let val = null;
    if (xy === 'x') {
        $dom = $('#basicTpl_set_x');
    } else {
        $dom = $('#basicTpl_set_y');
    }
    val = parseInt($dom.val(), 10);
    type === 'del' ? val -= num : val += num;
    $dom.val(val + 'px');
    $dom.trigger('changes', val);
}

// 移动层级
function layerFromTo(data) {
    if (data.to < 0 || data.to > AppData.edit.pageClass.page.layers.length) {
        console.log('不能移动了', data.to);
        return;
    }
    uniqendLayer(AppData.edit.pageClass, data);
    AppData.edit.pageClass.initLayerList(data.to);
}

// 鼠标右键操作
function mouseRightBtn(self) {
    $(document).on('contextmenu', '#phone', function (e) {
        e.preventDefault();
    });
    $(document).on('contextmenu.menu', '.page-view .layer, .mt-contextmenu', function (e) {
        e.preventDefault();
        // ...
        $.contextMenu({
            x: e.pageX,
            y: e.pageY,
            vals: [
                { name: '<i class="iconfont icon-dingceng"></i> 置顶层', val: 'top' },
                { name: '<i class="iconfont icon-diceng"></i> 置底层', val: 'bottom' },
                { name: '<i class="iconfont icon-shangyiyiceng"></i> 上移一层', val: 'prev' },
                { name: '<i class="iconfont icon-xiayiyiceng"></i> 下移一层', val: 'next' },
                { name: '<i class="iconfont icon-fuzhi"></i> 复制图层', val: 'copy' },
                { name: '<i class="iconfont icon-shoucang"></i> 收藏图层', val: 'save' },
                { name: '<i class="iconfont icon-icodel"></i> 删除图层', val: 'del' }
            ],
            callback: (val, $layer) => {
                let activeIndex = $('#layerlist').find('.active').index();
                switch (val) {
                    // 置顶
                    case 'top': layerFromTo({
                        from: activeIndex,
                        to: 0
                    }); break;

                    // 置底
                    case 'bottom': layerFromTo({
                        from: activeIndex,
                        to: AppData.edit.pageClass.page.layers.length - 1
                    }); break;

                    // 上移一层
                    case 'prev': layerFromTo({
                        from: activeIndex,
                        to: activeIndex - 1
                    }); break;

                    // 下移一层
                    case 'next': layerFromTo({
                        from: activeIndex,
                        to: activeIndex + 1
                    }); break;

                    // 复制图层
                    case 'copy': $('#layerlist').find('.active .copylayer').trigger('click'); break;

                    // 收藏图层
                    case 'save': $('.save-page-do').trigger('click'); break;

                    // 删除图层
                    case 'del': $('#layerlist').find('.active .dellayer').trigger('click'); break;
                }
            }
        });
    });
}

// 快捷按钮操作
function shortcuts() {
    $(document).on("keydown.shortcuts", (e) => {
        var ev = window.event || e;
        var code = ev.keyCode || ev.which;
        //ctrl+s + code
        console.log(code, ev.shiftKey);
        if (ev.ctrlKey && [83, 90, 89, 189, 187, 80, 75, 72, 70].indexOf(code) !== -1) {
            // console.log(code);
            ev.preventDefault();
            switch (code) {
                case 83: $('#appPublish').trigger('click'); break; // ctrl+s 保存预览APP
                case 90: $('#fastToNext').trigger('click'); break; // ctrl+z 撤销
                case 89: $('#fastToPrev').trigger('click'); break; // ctrl+y 恢复
                case 189: $('#fastToMin').trigger('click'); break; // ctrl+ - 缩小画布
                case 187: $('#fastToMax').trigger('click'); break; // ctrl+ + 放大画布
                case 80: $('.play-animation-do').trigger('click'); break; // ctrl+ p 播放动画
                case 75: $('.close-animation-do').trigger('click'); break; // ctrl+ k 元素可见
                case 72: $('#gridBoxBtn').trigger('click'); break; // ctrl+ h 显示网格
                case 70: {
                    let $active = $('#layerlist').find('.active');
                    if ($active[0]) {
                        $active.find('.copylayer').trigger('click');
                    }
                }; break; // ctrl+ f 复制
                case 8: $('#layerlist').find('.active .dellayer').trigger('click'); break; // ctrl + d 删除layer
            }
        }

        // 上下左右切换
        if ([38, 40, 37, 39].indexOf(code) !== -1 && AppData.edit.layerIndex !== null) {
            ev.preventDefault();

            let num = 1;
            if (ev.shiftKey) {
                num = 20;
            }
            switch (code) {
                case 38: setXYPoint('y', 'del', num); break; // 上
                case 37: setXYPoint('x', 'del', num); break; // 左
                case 39: setXYPoint('x', 'add', num); break; // 右
                case 40: setXYPoint('y', 'add', num); break; // 下
            }
        }

    });
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
        console.log(rotate);
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

    // 同步保存数据
    let saveGroupData = function () {
        $('#pageView').find('.mt-control').each(function () {
            let $layer = $(this).closest('.layer');
            let index = 9999 - $layer.css('z-index');
            let layer = AppData.data.pages[AppData.edit.pageIndex].layers[index];
            layer.style.left = $layer.css('left');
            layer.style.top = $layer.css('top');
        });
        AppDataChange();
    }

    // 快捷键功能, 左对齐
    $('#groupAlignLeft').on('click', function () {

        let min = Infinity;
        let $controls = $('#pageView').find('.mt-control');
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
        let $controls = $('#pageView').find('.mt-control');
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
        let $controls = $('#pageView').find('.mt-control');
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
        let $controls = $('#pageView').find('.mt-control');
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
    // $('#groupAlignLeftRightCenter').on('click', function() {
        
    //     let $controls = $('#pageView').find('.mt-control');
    //     let len = $controls.length;
    //     let val = 0;
    //     $controls.each(function () {
    //         val += p.center.top;
    //     });
    //     val = val / len; // 获取平均高度
    //     $controls.each(function () {
    //         let $layer = $(this).closest('.layer');
    //         let p = rectParam($layer);
    //         // 已知 外壳 pianYi = val - p.center.top; 求 top
    //         let domTop = max - p.hei / 2 - p.dh / 2;
    //         // 这里要单独写个方法
    //         $layer.css('top', domTop + 'px');
    //     });
    //     saveGroupData();
    // });

    // 拖动事件
    let initGroupEvent = function () {
        // 让图层可拖动
        g.$doc.off('mousedown.group').on('mousedown.group', '.mt-control', function (ed) {
            ed.preventDefault();
            let arr = [];
            let scale = AppData.edit.phoneScale || g.scale;
            $('#pageView').find('.mt-control').each(function () {
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
            g.$doc.on('mousemove.group', function (em) {
                let x = em.pageX - ed.pageX;
                let y = em.pageY - ed.pageY;
                arr.forEach(elem => {
                    // 记录当前的位置
                    elem.nleft = elem.left * scale + x;
                    elem.ntop = elem.top * scale + y;
                    elem.dom.css({
                        left: elem.nleft / scale,
                        top: elem.ntop / scale
                    });
                });
            }).on('mouseup.group', function (eu) {
                // 数据缓存到 AppData
                arr.forEach(elem => {
                    let index = 9999 - elem.dom.css('z-index');
                    let layer = AppData.data.pages[AppData.edit.pageIndex].layers[index];
                    layer.style.left = elem.nleft + 'px';
                    layer.style.top = elem.ntop + 'px';
                });
                AppDataChange();
                arr = null;
                g.$doc.off('mousemove.group mouseup.group');
            });
        });

        // 鼠标右键功能
        g.$doc.off('contextmenu.group').on('contextmenu.group', '.mt-control', function (e) {
            // 明天开发该功能
            e.stopPropagation();
            e.preventDefault();
            return;
            $.contextMenu({
                x: e.pageX,
                y: e.pageY,
                vals: [
                    { name: '<i class="iconfont icon-fuzhi"></i> 复制图层', val: 'copy' },
                    { name: '<i class="iconfont icon-icodel"></i> 删除图层', val: 'del' }
                ],
                callback: (val, $layer) => {
                    console.log(val);
                    if (val === 'copy') {
                        console.log('复制图层！');
                    } else if (val === 'del') {
                        console.log('删除图层！');
                    }
                }
            });
        });
    }

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
            $('#pageView').find('.layer').each(function () {
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
                let $control = $('#pageView').find('.mt-control');
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

/**
 * 初始化事件
 */
export function iniFastEvent(self) {
    fastToMax();
    fastToMin();
    copyPage(self);
    delPage(self);
    addPage(self);
    savePage(self);
    unRedoFun(self);
    shortcuts(); // 快捷键
    mouseRightBtn(self); // 鼠标右键
}

/**
 * 初始化的时候，默认设置phone 的 缩放
*/
export function setPhoneScale() {
    $('.phonebox').transform({
        "scale": g.scale
    });
}