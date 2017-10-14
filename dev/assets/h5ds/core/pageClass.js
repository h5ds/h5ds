import { basicTpl } from '../templete/basicTpl'; //坐标，尺寸基础模块
import { imgTpl, initCrop } from '../templete/imgTpl'; //图片模版
import { bgTpl, initBg } from '../templete/bgTpl'; //背景模版
import { bgColorTpl, initBgColor } from '../templete/bgColorTpl'; //背景色模版
import { getLayerDom, layerTypeSelect } from '../common/layerSwitch'; // 渲染 不同类型的 layer dom
import { initControl, layerShow, uniqendLayer } from '../common/layerFun'; // layer 的公用函数
import { appSliderTypeTpl, initAppSliderType } from '../templete/appSliderTypeTpl'; //设置翻页模式，锁定，自动
import { layerListTpl } from '../templete/layerListTpl'; //layer list
import { removeDataLayer, AppDataChange, setPageClass, saveHistory, getViewDom } from '../common/AppDataFun.js';
import { initPageLayerFun } from '../common/initPageLayerFun';

/**
 * 所有页面，弹窗，浮动层，都继承这个类，提供一些公用方法
 */
export default class PageClass {
    constructor(props) {
        this.layerListTpl = layerListTpl;
        this.pagesList = props.pagesList || 'pagesList'; // pagesList 的 id
        this.className = props.className || 'page'; // 类名字
        this[props.className || 'page'] = props[props.className]; // 直接编辑当前page 对象 app里面的page ，不是new Page() 对象
    }

    // 选择第一个layer
    selectFirstLayer() {
        let $layer = $('#layerlist').find('.layer-item');
        if ($layer[0]) {
            $layer.eq(0).trigger('click.select');
        }
    }

    // 初始化layerlist
    initLayerList(indexActive) {

        // 因为要设置重新选中，这里必须设置 layerIndex = null, 列表发生了变化
        AppData.edit.layerIndex = null;

        let shtml = '';
        let { layers } = this[this.className];
        if (layers.length == 0) {
            shtml = `<li><span>暂无图层</span></li>`;
        } else {
            let zIndex = 9999;
            for (let i = 0; i < layers.length; i++) {
                let layer = layers[i];
                // 重置z-index
                layer.style['z-index'] = zIndex - i;
                shtml += this.layerListTpl({
                    type: layer.typename,
                    active: indexActive === i ? true : false
                });
            }
        }
        $('#layerlist').html(shtml);
    }

    // 渲染页面样式
    renderPage() {
        let style = this[this.className].style;
        getViewDom().setStyle({
            style: style
        }).show();

        let height = parseInt(style.height, 10);
        if(height && height !== 486 ) {
            $('.phonebox').height(height);
        }else {
            $('.phonebox').height(486);
        }
        AppDataChange();
    }

    // 包含了剪切图片的所有方法
    initCropFun() {
        let self = this;
        let { style } = this[this.className];
        let $crop = initCrop(self, $('#setPageStyle').find('.set_img_crop'), { delBtn: true }, function (type, val) {
            // 剪切后，this.style 发生变化，重新渲染可视区域, delete 里面做了处理了
            if (type === 'select') {
                style['background-image'] = val;
            }
            // AppDataChange();
            self.renderPage();
        });
    }

    // 初始化设置区域,设置page样式
    initSetBox() {

        let self = this;
        let $setPageStyle = $('#setPageStyle');
        let { style, slider } = this[this.className];

        console.log('当前page', this.className, this[this.className]);

        // 设置背景参数
        let bgTpls = bgTpl({
            repeat: style['background-repeat'] || 'initial',
            color: style['background-color'] || 'none',
            size: style['background-size'] || 'initial'
        });

        // 设置背景色
        let bcolor = style['background-color'];
        let bgColorTpls = bgColorTpl({
            color: bcolor ? bcolor.colorHex() : 'initial',
            opacity: bcolor ? bcolor.colorOpacity() : 1
        })

        // 翻页模式, app 整体可以设置翻页，每个page可以单独设置

        let appSliderTypeTpls = ''; // _page 作为不同的ID使用

        if(this.className === 'page') {
            appSliderTypeTpls = `<div class="set-slider">${appSliderTypeTpl({
                lock: slider['lock'],
                autoplay: slider['autoplay'],
                time: slider['time']
            }, '_page')}</div>`;
        }
    
        // 如果page没有背景，初始化一个空的模版
        let allTpls = '';
        if (!style) {
            style = {};
            allTpls = imgTpl() + bgTpls + bgColorTpls + appSliderTypeTpls;
        } else {
            // 如果page有背景图
            if (style['background-image']) {
                let imgTpls = imgTpl({
                    src: style['background-image'] || ''
                });
                allTpls = imgTpls + bgTpls + bgColorTpls + appSliderTypeTpls;
            } else {
                // 只有背景色
                allTpls = imgTpl() + bgTpls + bgColorTpls + appSliderTypeTpls;
            }
        }
        $setPageStyle.html(allTpls);

        // 初始化图片剪切功能
        this.initCropFun();
        
        // 设置样式
        this.renderPage();

    }

    // 重置z-index
    resetZIndex() {
        getViewDom().find('.layer').each( function(ind, elem) {
            $(this).css('z-index', 9999 - ind);
        });
    }

    // 事件
    initEvent() {
        let self = this;
        let $setPageStyle = $('#setPageStyle');
        let $layerlist = $('#layerlist');

        //初始化方法
        initSlider();
        initSelectOne();

        // 删除layer
        $layerlist.off('click.dellayer').on('click.dellayer', '.dellayer', function (e) {
            e.stopPropagation();

            var $li = $(this).parent();
            var index = $li.index();
            getViewDom().find('.layer').eq(index).remove();
            $li.remove();

            // 存个历史记录
            saveHistory();

            // 删除 AppData.data[cName][xx].layers[index] 
            removeDataLayer(index);

            AppData.edit.layerIndex = null;
            AppData.edit.layerDom = null;

            // 重新设置 z-index
            self.resetZIndex();

            // 默认选择第一layer
            var $li0 = $('#layerlist').find('.layer-item').eq(0);
            if ($li0[0]) { // 重置选择状态
                $li0.trigger('click');
            } else {
                // 删除完之后，什么都不干
                return;
            }

        });

        // 复制layer
        $layerlist.off('click.copylayer').on('click.copylayer', '.copylayer', function (e) {
            e.stopPropagation();

            let $li = $(this).parent();
            let index = $li.index();

            // console.log('**************', self, index);
            let obj = self[self.className].layers[index];
            // 拷贝一份
            obj = JSON.parse(JSON.stringify(obj));

            // 复制内容存放到 copyLayer 里面
            delete obj['z-index'];
            AppData.edit.copyLayer = obj;

            $.tip({
                msg: '复制成功！ctrl + v 粘贴',
                type: 'success',
                time: 3000
            });
        });

        // 粘贴
        $(document).off('pastelayer').on('pastelayer', function (e) {
            
            if(!AppData.edit.copyLayer) {
                $.tip({
                    msg: '请先复制图层！',
                    type: 'error',
                    time: 3000
                });
                return;
            }

            // 存个历史记录
            saveHistory();

            // e.stopPropagation();
            let $li = $('#layerlist').find('.active');
            let index = 0;
            if($li[0]) {
                index = $li.index();
            }

            // 前面插入
            let layer = JSON.parse(JSON.stringify(AppData.edit.copyLayer)); // 拷贝对象
            self[self.className].layers.splice(index, 0, layer);

            // 重新渲染列表
            self.initLayerList();
            // 重新渲染viewPage
            self.initPageDom();

            AppDataChange();

            // 设置选中
            $('#layerlist').find('.layer-item').eq(index).trigger('click');

        });

        // 显示隐藏
        $layerlist.off('click.showlayer').on('click.showlayer', '.showlayer', function (e) {
            e.stopPropagation();
            var $li = $(this).parent();
            var index = $li.index();
            var $layer = getViewDom().find('.layer').eq(index);
            if ($layer.is(':hidden')) {
                $layer.show();
                $(this).removeClass('showlayer_hide');
            } else {
                $layer.hide();
                $(this).addClass('showlayer_hide');
            }
        });

        //选择layer 通过 浮动的 列表
        $layerlist.off('click.select').on('click.select', '.layer-item', function (e, val) {
            var index = $(this).index();
            $('#layerlist').find('.layer-item').eq(index).addClass('active').siblings('.layer-item').removeClass('active');
            //new layer
            self.newLayer(index);
        });

        //排序 layer列表
        $layerlist.off('uniqend').on('uniqend', function (e, data) {

            // 排序
            uniqendLayer(self, data);

            // 排序不能撤销操作
        });

        //选择layer 通过 layer
        getViewDom().off('click.layer contextmenu.layer').on('click.layer contextmenu.layer', '.layer', function (e) {

            // 取消焦点
            $(':focus').blur();

            // 如果在组合模式下，不选择单个layer
            if(AppData.edit.group) {
                return;
            }
            
            var index = $(this).index();
            $('#layerlist').find('li').removeClass('active').eq(index).addClass('active');
            //new layer
            self.newLayer(index);
        });

        // 设置 背景
        initBg(this, $setPageStyle, function () {
            self.renderPage();
        });

        // 设置 背景色
        initBgColor(this, $setPageStyle, function () {
            self.renderPage();
        });

        // 锁定翻页
        if(self.className === 'page') {
            initAppSliderType(self, '_page');
        }

        // 播放该页动画
        $('.play-animation-do').trigger('click');

    }

    //初始化页面对象 , phone 里面的内容
    initPageDom() {
        var layers = this[this.className].layers;
        var $pageView = getViewDom();
        var arr = [];
        for (let i = 0; i < layers.length; i++) {
            arr.push(getLayerDom(layers[i]));
        }
        $pageView.html(arr.join(''));
        arr = null;

        // 初始化JS 方法，地图什么的
        this.initPageLayerFun();
    }

    // 有的页面 初始化JS 方法，地图什么的
    initPageLayerFun() {
        var layers = this[this.className].layers;
        initPageLayerFun(layers, getViewDom());
    }

    // 选择layer 之后，需要重新渲染 layer 对象 AppData.edit.layerDom 这个对象，在排序，复制之后，得重新设置
    newLayer(index) {

        //显示layer设置
        layerShow('#setLayerBox');

        let pageIndex = 0;
        try {
            pageIndex = $('#' + this.pagesList).find('.active').index();
        } catch(e) {
            pageIndex = undefined;
        }
        // active 是哪个，就实例化哪个
        let layer = this[this.className].layers[index];

        /**
         * 如果选择同一个page的同一个layer ，不再重复渲染set区域
         * 这里因为会添加，删除layer, layerIndex 在变化中。如果没有控制器，只单独初始化控制器
        */
        if (index === AppData.edit.layerIndex && pageIndex === AppData.edit.pageIndex) {
            if (!getViewDom().find('.mt-control')[0]) {
                // 实例化控制器
                initControl({
                    layer: layer,
                    selectAnimateDom: null,
                    className: 'layer'
                });
            }
        }else {
            // 给layer 容器设置值, 设置 AppData.edit.layerDom, layerIndex
            AppData.edit.layerIndex = index;
            getViewDom().find('.layer').each( function() {
                if($(this).css('z-index') == 9999 - index) {
                    AppData.edit.layerDom = $(this);
                }
            });

            // 添加之前，先存个历史记录
            saveHistory();

            // new 对应的 layer, 这里是layer 的入口
            layerTypeSelect(layer);
        }
    }

    // svg 预加载
    lazySvg() {
        $('#phoneApp').find('.layer-svg').each(function() {
            let $this = $(this).find('.element');
            let src = $this.attr('data-svglazy');
            let color = $this.attr('data-color').split('@') || [];
            $.get(src).done( svg => {
                // 预加载成功
                let $svg = $(svg);
                color.forEach(function(elem, index) {
                    if(elem) {
                        $svg.find('path').eq(index).attr('fill', elem);
                    }
                })
                let str = $svg.find('svg').prop('outerHTML');
                $this.html(str);
            });
        });
    }

    //初始化方法
    _init() {
        console.log(this);
        $('#setPageName').html(this[this.className].name);
        this.initLayerList();
        this.initSetBox();
        this.initPageDom();
        this.initEvent();

        setPageClass(this);

        this.lazySvg();

        return this;
    }
}