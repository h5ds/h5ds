import { appsetTpl, initAppset } from '../templete/appsetTpl'; //app设置模版
import { imgTpl, initCrop, imgNullTpl } from '../templete/imgTpl'; //图片模版
import { bgTpl, initBg } from '../templete/bgTpl'; //背景模版
import { bgColorTpl, initBgColor } from '../templete/bgColorTpl'; //背景色模版
import { pageListTpl, initPageListEvent, destoryControl } from '../templete/pageListTpl'; //page 列表模版
import { appSliderAnimateTpl, initAppSliderAnimate } from '../templete/appSliderAnimateTpl'; //选择翻页动画
import { appSliderTypeTpl, initAppSliderType } from '../templete/appSliderTypeTpl'; //设置翻页模式，锁定，自动
import { setPage } from '../common/pageFun';
import { layerShow } from '../common/layerFun'; //控制编辑区域显示隐藏的方法
import { addLayer } from '../common/layerSwitch';
import g from '../conf/global';
import { getDataPage, AppDataChange, removeDataPage, copyPageData, addNewPageData, getViewDom, getPageListDom } from '../common/AppDataFun.js';
import { appToHTML, eventAppViewShow } from '../common/saveApp';

import Page from './page.js';
import Popup from './popup.js';
import Fixed from './fixed.js';
import Animate from './animate.js';
import { iniFastEvent } from '../common/appFun'; // 画布的快捷操作
import { groupLayers } from '../common/appFunLayerGroup'; // layer 组的操作

import { loadHTML } from '../conf/loading'; // 加载图标

import manpic from '../../images/app.png';

// 新建空白的APP
class AppNew {
    constructor(name, info, img, mp3, loading, slider, style, pages) {
        this.name = name || '新建APP';
        this.info = info || 'H5DS 太酷炫了';
        this.img = img || manpic;
        this.mp3 = mp3 || { name: '', url: '' };
        this.loading = loading || 0;
        this.slider = slider || 0;
        this.style = style || '';
        this.pages = pages || []; // 页面
        this.popups = popups || []; // 弹窗
        this.fixeds = fixeds || []; // 浮动层
    }
}

// app 方法类
class App {
    constructor(res) {
        this.app = res;
        this.className = 'app';
    }

    // 设置左侧页面列表， 内部调用
    setPageList() {
        let tpls = '';
        let pages = this.app[AppData.edit.pageType];
        for (let i = 0; i < pages.length; i++) {
            let page = pages[i];
            tpls += pageListTpl(page, 'page');
        }
        getPageListDom().html(tpls);
    }

    //设置左侧页面列表
    setPagePage() {
        let tpls = '';
        let pages = this.app.pages;
        for (let i = 0; i < pages.length; i++) {
            let page = pages[i];
            tpls += pageListTpl(page, 'page');
        }
        $('#pagesList').html(tpls);
    }

    //设置左侧弹窗列表
    setPagePopup() {
        let tpls = '';
        let popups = this.app.popups;
        for (let i = 0; i < popups.length; i++) {
            let popup = popups[i];
            tpls += pageListTpl(popup, 'popup');
        }
        $('#popupsList').html(tpls);
    }

    //设置左侧浮动元素列表
    setPageFlex() {
        // ...
        let tpls = '';
        let fixeds = this.app.fixeds;
        for (let i = 0; i < fixeds.length; i++) {
            let fixed = fixeds[i];
            tpls += pageListTpl(fixed, 'fixed');
        }
        $('#fixedsList').html(tpls);
    }

    // 释放组合的选择
    destoryGroup() {
        AppData.edit.group = false;
        g.$doc.off('mousedown.group');
        g.$doc.off('contextmenu.group');
    }

    // 初始化loading
    initLoad() {
        $('#setAppLoading').html(loadHTML(this));
    }

    //初始化MP3
    initMp3() {
        // 设置mp3
        let self = this;
        let mp3 = this.app.mp3;
        $('#nowappName').html(`<span class="mp3-play-icon"><i></i><i></i><i></i><i></i></span> ${mp3.name || ''}`).attr('data-url', mp3.url || '');

        // 选择使用mp3
        $('#mp3list').on('click', '.use', function (e) {
            let $item = $(this).closest('.item');
            let url = $item.attr('data-url');
            let name = $item.find('.name').text();
            self.app.mp3 = {
                name: name,
                url: url
            };
            $('#nowappName').html(`<span class="mp3-play-icon"><i></i><i></i><i></i><i></i></span> ${name || ''}`).attr('data-url', url || '');

            // 暂停播放
            $('.mp3-play-iconing').removeClass('mp3-play-iconing');
            if (url) {
                $('#appMp3Audio')[0].pause();
            }

            AppDataChange();
        });

        // 清除背景音乐
        $('.now-use-mp3').on('click', '.del', function () {
            $('#nowappName').html('').attr('data-url', '');
            self.app.mp3 = {
                name: '',
                url: ''
            };
        });

        // 试听 选中的
        $('.now-use-mp3').on('click', '.try', function () {
            let $parent = $(this).parent();
            let url = $parent.find('.name').attr('data-url');
            $('.mp3-play-iconing').removeClass('mp3-play-iconing');
            $parent.find('.mp3-play-icon').addClass('mp3-play-iconing');
            if (url) {
                $('#appMp3Audio').attr('src', url)[0].play();
            }
        });

        // 试听
        $('#mp3list').on('click', '.try', function () {
            let $parent = $(this).parent();
            let url = $parent.attr('data-url');
            $('.mp3-play-iconing').removeClass('mp3-play-iconing');
            $parent.find('.mp3-play-icon').addClass('mp3-play-iconing');
            if (url) {
                $('#appMp3Audio').attr('src', url)[0].play();
            }
        });

        // 暂停
        $('#setAppMp3').on('click', '.mp3-play-iconing', function () {
            $(this).removeClass('mp3-play-iconing');
            $('#appMp3Audio')[0].pause();
        });
    }

    //设置操作区
    initSet() {
        let { style, name, info, img, slider } = this.app;
        let bcolor = style['background-color'];
        let $setAppBg = $('#setAppBg');

        //app设置区域显示
        layerShow('#setAppBox');

        // //模版赋值，tpl,data
        let appsetTpls = appsetTpl({
            name: name,
            info: info,
            img: img
        })
        let imgTpls = imgTpl({
            src: style['background-image'],
            id: 'cropimg',
            cropdom: 'appCropDom'
        })
        let bgTpls = bgTpl({
            repeat: style['background-repeat'],
            size: style['background-size'],
            repeatId: 'appRepeat',
            sizeId: 'appSize'
        })
        let bgColorTpls = bgColorTpl({
            color: bcolor ? bcolor.colorHex() : 'initial',
            opacity: bcolor ? bcolor.colorOpacity() : 1,
            colorId: 'appbgColor'
        })

        // 翻页动画选择
        let appSliderAnimateTpls = appSliderAnimateTpl({
            playtype: slider['animate']
        })

        // 翻页模式
        // let appSliderTypeTpls = appSliderTypeTpl({
        //     lock: slider['lock'],
        //     autoplay: slider['autoplay'],
        //     time: slider['time']
        // })

        // 设置HTML
        $setAppBg.empty().html(appsetTpls + `<div class="tr">页面背景：</div>` + imgTpls + bgTpls + bgColorTpls + `<div class="set-slider">${appSliderAnimateTpls}</div>`);
        // 设置app名字
        $('.a-setname').html(name);
    }

    // 事件
    eventFun() {
        let self = this;
        let $pagesList = $('#pagesList, #popupsList, #fixedsList');

        // loading 选择
        $('#setAppLoading').on('click', '.loader', function (e) {
            self.app.loading = $(this).index();
            $(this).addClass('active').siblings('.loader').removeClass('active');
        });

        // pagelist事件, 拖动排序，选择页面
        initPageListEvent(this);

        // app 翻页动画
        initAppSliderAnimate(this);

        // app 翻页模式
        initAppSliderType(this);

        // 点击空白，销毁layer控制器
        g.$doc.off('mousedown.destoryControl').on('mousedown.destoryControl', function (e) {
            if (!$(e.target).closest('.layer')[0] && $(e.target).closest('#phone')[0]) {
                destoryControl();
                // 然后默认选择page
                getPageListDom().find('.active').trigger('click');

                // 点击空白，重新释放 组的选择
                self.destoryGroup();
            }
        });

        // 组合图层的相关操作
        groupLayers();

        // 删除page
        $pagesList.off('click.delpage').on('click.delpage', '.del-page', function (e) {
            e.stopPropagation();
            let $item = $(this).closest('.page-item');
            let index = $item.index();
            self.delPage(index);
        });

        // 新增page
        // $pagesList.off('click.addpage').on('click.addpage', '.add-page', function (e) {
        //     e.stopPropagation();
        //     let $item = $(this).closest('.page-item');
        //     let index = $item.index();
        //     self.addPage(index);
        // });

        // 修改页面名字
        $pagesList.off('click.editpage').on('click.editpage', '.edit-page', function (e) {
            e.stopPropagation();
            let $item = $(this).closest('.page-item');
            let index = $item.index();
            let page = self.app[AppData.edit.pageType][index];
            // self.delPage(index);
            $.confirms({
                title: '修改页面名字',
                content: `
                <input id="editPageInputId" class="edit-page-input" value="${page.id || ''}" type="text" placeholder="页面ID"/>
                <input id="editPageInput" class="edit-page-input" value="${page.name || ''}" type="text" placeholder="请输入页面名称"/>`,
                callback: (mark) => {
                    if (mark) {
                        let name = $('#editPageInput').val();
                        let id = $('#editPageInputId').val();
                        if(id && !/^[_a-zA-Z][_a-zA-Z0-9]+/.test(id)) {
                            $.tip({
                                msg: 'id必须是字母或者下划线开头，且必须由字母，数字，或者下划线组成！', //
                                type: 'danger', //success,danger,warning
                                time: 5000 //
                            });
                            return;
                        }
                        page.name = name;
                        page.id = id;
                        $item.find('.page-content').html(`
                        <span class="page-name">${name}</span>
                        ${!id ? '' : `<span class="page-id">ID: ${id}</span>`}
                        `);
                        $('#setPageName').html(name);
                        AppDataChange();
                    }
                }
            }).show();
        });

        // 复制页面;
        $pagesList.off('click.copypage').on('click.copypage', '.copy-page', function (e) {
            e.stopPropagation();
            let $item = $(this).closest('.page-item');
            let index = $item.index();
            self.copyPage(index);
        });

        // 选择页面类型，切换，弹窗，浮动，页面
        $('#leftPagesList').on('changes', function(e, obj) {
            // 切换后，pageIndex 设置为 null,默认不选中，然后触发选中效果
            AppData.edit.pageIndex = null;
            AppData.edit.pageType = obj.dom.attr('data-name');

            // 如果是弹窗层，弹窗层显示
            if( AppData.edit.pageType === 'popups') {
                $('#pageViewPopup').show();
            }else {
                $('#pageViewPopup').hide();
            }
            
            // 如果是浮动层，全屏，就不能触发底层事件了
            if( AppData.edit.pageType === 'fixeds') {
                $('.pageViewFixed').eq(0).addClass('page-viewup-full');
                $('#pageView').css({
                    'pointer-events': 'none'
                });
            }else {
                $('.pageViewFixed').removeClass('page-viewup-full'); 
                $('#pageView').css({
                    'pointer-events': 'initial'
                });
            }

            // 切换后，设置默认选中
            let $active = getPageListDom().find('.active');
            if($active[0]) {
                $active.trigger('click');
            }else {
                getPageListDom().find('.page-item').eq(0).trigger('click');
            }

        });

    }

    //初始化页面方法
    initSetEvent() {
        let self = this;
        let $setAppBg = $('#setAppBg');

        // 图片剪切, 如果初始化图片没有，就不实例化图片剪切
        // 初始化图片剪切
        let $crop = initCrop(this, $('#setAppBg').find('.set_img_crop'), { delBtn: true }, function (type, val) {
            // 剪切后，this.style 发生变化，重新渲染可视区域，  delete 里面做了处理了
            if (type === 'select') {
                self.app.style['background-image'] = val;
                $('#phoneApp').css('background-image', `url(${val})`);
            }
            self.renderPhone();
        });

        // 初始化方法 slider
        initSlider();

        // 下拉
        initSelectOne();

        // 设置app 的事件绑定，主图上传，设置APP名称，设置APP信息 from '../templete/appsetTpl'
        initAppset();

        // 设置 背景
        initBg(this, $setAppBg, function () {
            self.renderPhone();
        });

        // 设置 背景色
        initBgColor(this, $setAppBg, function () {
            self.renderPhone();
        });

    }

    //设置phone区域的样式
    renderPhone() {

        //设置样式
        $('#phoneApp').setStyle({
            style: this.app.style
        });

        AppDataChange();
    }

    // 初始化选中的page, canRender 强制渲染，撤销用
    newPage(index, canRender) {

        //显示设置区域
        layerShow('#setPageBox');

        //如果选择同一个类型的同一个页面，不再重复渲染
        if (AppData.edit.pageIndex == index && !canRender) {
            return;
        }

        //设置当前选中 appData
        setPage(index, this);

        // console.log('app.js 183 => 设置当前选中的page', AppData.edit.pageIndex)
        var p = getDataPage(index);
        p['index'] = index;

        console.log('new ----------------------', AppData.edit.pageType, p);

        if(AppData.edit.pageType === 'pages') {
            new Page({
                className: 'page',
                page: p,
                pagesList: 'pagesList'
            }).init();
        }else if(AppData.edit.pageType === 'popups') {
            new Popup({
                className: 'popup',
                popup: p,
                pagesList: 'popupsList'
            }).init();
        }else if(AppData.edit.pageType === 'fixeds') {
            new Fixed({
                className: 'fixed',
                fixed: p,
                pagesList: 'fixedsList'
            }).init();
        }else {
            // ...
        }
        
    }

    // 初始化 动画 模块 选项
    newAnimate() {
        let animate = new Animate();
        animate.init();
    }

    // 添加功能layer模块
    addLayerModule() {
        let $fastMenu = $('#fastMenu');
        $fastMenu.off('click.fun').on('click.fun', '.fun', function () {
            var fun = $(this).data('fun');
            $fastMenu.find('.fastlist').removeClass('show');
            $fastMenu.find('.more').removeClass('active');
            addLayer(fun);
        });
    }

    //删除页面
    delPage(index) {

        if(AppData.edit.pageType === 'fixeds') {
            $.tip({
                msg: '浮动层不可删除',
                type: 'danger',
                time: 3000
            });
            return;
        }

        $.confirms({
            content: '是否要删除当前页面？',
            callback: (mark) => {
                if (mark) {
                    // 清除DOM
                    getPageListDom().find('.page-item').eq(index).remove();

                    // 移除data page 数据
                    removeDataPage(index);

                    // 默认选择第一个
                    let $page = getPageListDom().find('.page-item').eq(0);
                    if ($page[0]) {
                        AppData.edit.pageIndex = null;
                        $page.trigger('click')
                    } else {
                        $('#layerlist').html('');
                        $('.appname').trigger('click');
                        getViewDom().html('');
                    }
                }
            }
        }).show();

    }

    //新增页面, 这里目前只能新增页面，不能新增 popup ,fixed 后期加 ，在 tplSource.js 里面调用
    addPage(index, page) {

        if(AppData.edit.pageType === 'fixeds') {
            $.tip({
                msg: '浮动层只能加一个',
                type: 'danger',
                time: 3000
            });
            return;
        }

        if(!page) {
            console.error('App.addPage 方法，必须传入 page 对象');
            return;
        }

        // 插入pages
        addNewPageData({
            index: index + 1,
            page: page || null
        });

        // 设置左侧的 page List
        this.setPageList();

        // 默认选择新增的那一个
        getPageListDom().find('.page-item').eq(index + 1).trigger('click');
    }

    //复制页面
    copyPage(index) {

        if(AppData.edit.pageType === 'fixeds') {
            $.tip({
                msg: '浮动层不可复制',
                type: 'danger',
                time: 3000
            });
            return;
        }

        // 复制pages
        copyPageData(index + 1);

        // 设置左侧的 page List
        this.setPageList();

        // 默认选择新增的那一个
        getPageListDom().find('.page-item').eq(index + 1).trigger('click');
    }

    // 发布预览
    publish() {
        $('#appPublish').on('click', () => {
            // console.log(AppData.data);
            let load = $.loading({
                tip: 'H5生成中，请耐心等待！'
            });
            appToHTML().then(res => {
                load.close();
            });
        });
    }

    //初始化背景参数
    init() {

        this.newAnimate();
        this.initSet();
        this.initMp3();
        this.initLoad();
        this.initSetEvent();
        this.renderPhone();

        //设置page 列表
        this.setPagePopup();
        this.setPagePage();
        this.setPageFlex();
        this.eventFun();

        // 默认选中第一页, 这里new Layer 设置了 local
        $('#leftPagesList').find('[data-name="fixeds"]').trigger('click');
        $('#fixedsList').find('.page-item').trigger('click');
        $('#leftPagesList').find('[data-name="pages"]').trigger('click');
        $('#pagesList').find('.page-item').eq(0).trigger('click');

        this.addLayerModule(); // 添加layer模块

        // 快捷图标事件
        iniFastEvent(this);

        // 发布
        this.publish();
        // 绑定发布弹窗的各种事件
        eventAppViewShow(this);

        AppData.edit.appClass = this;

        AppData.edit.phoneScale = g.scale;
    }
}
export default App;