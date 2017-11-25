import g from '../conf/global';
import { getNowPage, AppDataChange, pushLayerData, getViewDom } from './AppDataFun';
import { uploadImgBase64, addUserTpls } from '../server/ajax';
import { getUserTplsFun } from '../source/tplSource';
import { setStorage, getStorage } from '../localSave/localStorage.js';
import { uniqendLayer } from './layerFun';
import { getLayerGroupArr, changeLayerGroupArr, setLayerGroupArr } from './appFunLayerGroup';

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
 * 长页设置
*/
function changePage(self) {

    // 最大高度 486px
    $('#setPageHeight').on('mousedown', function (e) {
        e.stopPropagation();
        let y0 = e.pageY;
        let $phonebox = $('.phonebox');
        let oldHei = $phonebox.height();
        let nowHei = 0;
        g.$doc.on('mousemove', function (e) {
            nowHei = (oldHei + (e.pageY - y0) / AppData.edit.phoneScale);
            if(nowHei < g.defaultHeight) {
                nowHei = g.defaultHeight;
            }
            $phonebox.css({
                height: nowHei
            });
        }).on('mouseup', function (e) {
            g.$doc.off('mousemove mouseup');
            let page = AppData.edit.pageClass[AppData.edit.pageClass.className];
            page.style.height = nowHei + 'px';
            AppDataChange();
        })
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
            $('#phoneApp').addClass('element-show');
            html2canvas($('#pageView')[0], {
                height: g.defaultHeight,
                width: g.defaultWidth
            }).then(function (canvas) {
                $('#phoneApp').removeClass('element-show');
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
        let page = AppData.data[AppData.edit.pageType][index];
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
                AppData.data[AppData.edit.pageType][obj.index] = obj.page;
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
function setXYPoint(xy, num) {
    // ...
    let $dom = null;
    let val = null;
    if (xy === 'x') {
        $dom = $('#basicTpl_set_x');
    } else {
        $dom = $('#basicTpl_set_y');
    }
    val = parseInt($dom.val(), 10) + num;
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
                { name: '<i class="iconfont icon-niantie"></i> 粘贴图层', val: 'paste' },
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

                    // 粘贴图层
                    case 'paste': $(document).trigger('pastelayer'); break;

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

    $(document).on("keydown.shortcuts", (ev) => {
        // var ev = window.event || e;
        var code = ev.keyCode;
        //ctrl+s + code
        // console.log(code, ev.ctrlKey, ev.shiftKey);

        // 这里加个锁吧
        if ($(':focus').length !== 0) {
            // console.log('不监听');
            return;
        }

        if (ev.ctrlKey && [83, 90, 89, 189, 187, 80, 75, 72, 67, 86].indexOf(code) !== -1) {
            ev.preventDefault();
            let copyDo = function () {
                let $active = $('#layerlist').find('.active');
                if ($active[0]) {
                    $active.find('.copylayer').trigger('click');
                }
            }
            switch (code) {
                case 83: $('#appPublish').trigger('click'); break; // ctrl+s 保存预览APP
                case 90: $('#fastToNext').trigger('click'); break; // ctrl+z 撤销
                case 89: $('#fastToPrev').trigger('click'); break; // ctrl+y 恢复
                case 189: $('#fastToMin').trigger('click'); break; // ctrl+ - 缩小画布
                case 187: $('#fastToMax').trigger('click'); break; // ctrl+ + 放大画布
                case 80: $('.play-animation-do').trigger('click'); break; // ctrl+ p 播放动画
                case 75: $('.close-animation-do').trigger('click'); break; // ctrl+ k 元素可见
                case 72: $('#gridBoxBtn').trigger('click'); break; // ctrl+ h 显示网格
                case 86: $(document).trigger('pastelayer'); break; // ctrl+ v 粘贴
                case 67: copyDo(); break; // ctrl+ c 复制
            }
        }

        // 删除
        if (code === 46) {
            ev.preventDefault();
            $('#layerlist').find('.active .dellayer').trigger('click'); // delete 删除layer
        }

        // 上下左右切换
        if ([38, 40, 37, 39].indexOf(code) !== -1) {
            ev.preventDefault();

            let num = 1;
            if (ev.shiftKey) {
                num = 20;
            }

            if (AppData.edit.layerIndex !== null) {
                switch (code) {
                    case 38: setXYPoint('y', -num); break; // 上
                    case 37: setXYPoint('x', -num); break; // 左
                    case 39: setXYPoint('x', num); break; // 右
                    case 40: setXYPoint('y', num); break; // 下
                }
            } else if (getViewDom().find('.mt-control').length > 1) { // 选择组
                let arr = getLayerGroupArr();
                switch (code) {
                    case 38: changeLayerGroupArr(arr, null, -num); break; // 上
                    case 37: changeLayerGroupArr(arr, -num, null); break; // 左
                    case 39: changeLayerGroupArr(arr, num, null); break; // 右
                    case 40: changeLayerGroupArr(arr, null, num); break; // 下
                }
                setLayerGroupArr(arr);
            }
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
    changePage(); // 改变长页
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