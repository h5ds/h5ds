import { layerShow } from '../common/layerFun.js'; //控制编辑区域显示隐藏的方法
import g from '../conf/global';
import { deleteDB } from '../localSave/indexedDB';
import { clearStorage } from '../localSave/localStorage';

// 所有的 全局事件均用 -do 结尾

// 切换右侧面板的 tab
$(function () {
    $('.appset .appname').on('click', function (e) {
        layerShow('#setAppBox')
    });
})

// 选择音乐，loading, 背景快速入口
$(function () {
    $('.appset').on('click', '.bg', function () {
        layerShow('#setAppBox');
        $('.tab-appbasic').trigger('click'); //
    })

    $('.appset').on('click', '.music', function () {
        layerShow('#setAppBox');
        $('.tab-appmusic').trigger('click');
    })

    $('.appset').on('click', '.loading', function () {
        layerShow('#setAppBox');
        $('.tab-apploading').trigger('click');
    })

    $('.appset').on('click', '.helpinfo', function () {

        // 展开
        if($('#temps').attr('data-status') !== 'show') {
            $('.flod-btn').trigger('click');
        }
        // 切换到主要区域
        $('.appset .bg').trigger('click');

        // 帮助
        $.helps({
            show: true,
            data: [
                { dom: '.appset', content: '【整体设置】点击此处设置H5页面的整体内容：背景，主图，介绍, 背景音乐，加载效果等', pos: 'bottom' },
                { dom: '#clearLocalSave', content: '【清除缓存】这里清除本地缓存', pos: 'bottom' },
                { dom: '#appPublish', content: '【预览/发布】做好之后，发布应用点击这里发布应用或者预览应用，全部OK后生成二维码', pos: 'bottom' },
                { dom: '.left', content: '【页面列表】此处主要展示页面的列表，也可以在【模板中心】中选择模板进行页面添加', pos: 'right' },
                { dom: '.a-tpls', content: '【模板中心】所有页面模板都在这里了，你可以选择系统提供的模板，也可以选择自己保存的模板', pos: 'right' },
                { dom: '#fastMenu', content: '【图层】页面里面所有的元素叫做图层，你可以在这里选择需要创建的图层，也可以点击“。。。”展开图层，选择更多图层', pos: 'left' },
                { dom: '#setAppBox', content: '【设置区域】只需要记住，页面，图层，动画，交互等任何设置相关的操作都在这里进行就可以了。顶部会显示：当前选中的对象', pos: 'left' },
                { dom: '.phonebox', content: '【可视化区域】页面的可视化界面，所见即所得', pos: 'left' },
                { dom: '.layerlist', content: '【图层列表】可以展开图层列表，这里有图层相关的一些操作！', pos: 'bottom' },
                { dom: '.fastbtns', content: '【快捷操作】这里有一些快捷操作的方法 <br/>【ctrl+s 保存预览APP】<br/>【ctrl+z 撤销】<br/>【ctrl+y 恢复】<br/>【ctrl+ - 缩小画布】<br/>【ctrl+ + 放大画布】<br/>【ctrl+ p 播放动画】<br/>【ctrl+ k 元素可见】<br/>【ctrl+ h 显示网格】<br/>【ctrl + d 删除】<br/>【上，下，左，右 微调距离】<br/>【shift + 上，下，左，右 大幅度调距离】', pos: 'left' }
            ]
        });
    })
})

$(function () {
    // 清除缓存
    $('#clearLocalSave').on('click', function () {
        clearStorage();
        deleteDB('H5DS');
        // $.tip({
        //     msg: '清除本地缓存成功！',
        //     callback: function() {
        //         window.location.reload();
        //     }
        // })
        window.location.reload();
    });
})

// 播放页面动画
$(function () {

    // 播放动画
    g.$doc.on('click', '.play-animation-do', function (e) {
        let $phoneApp = $('#phoneApp');
        $phoneApp.removeClass('element-show').find('.element').each(function (elem, index) {
            $(this).css('animation-play-state', 'running');
        });
        $phoneApp.hide(0).show(0);
    });

    // 关闭动画
    // g.$doc.on('click', '.close-animation-do', function(e) {
    //     let $phoneApp = $('#phoneApp');
    //     $phoneApp.addClass('animation-disabled').find('.element').each(function(elem, index) {
    //         $(this).css('animation-play-state', 'paused');
    //     });
    //     $phoneApp.hide(0).show(0);
    // });

    // 播放当前对象的动画
    g.$doc.on('click', '.play-nowlayer-animation-do', function (e) {
        $('#phoneApp').removeClass('animation-disabled');
        AppData.edit.layerDom.find('.element').css('animation-play-state', 'running').hide(0).show(0);
    });

    // 显示网格
    // g.$doc.on('click', '.show-grid-do', function(e) {
    //     let $grid = $('#phoneApp').find('.gridbox');
    //     if($grid.is(':hidden')) {
    //        $grid.show(); 
    //     }
    // });
})