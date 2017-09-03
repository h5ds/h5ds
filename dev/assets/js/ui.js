import '../sass/ui/ui.scss';
//事件
import '../h5ds/otherEvent/toggleLeftBox.js'; //点击右侧

//工具
import '../h5ds/unit/confirm.js'; // 确认
import '../h5ds/unit/modal.js'; // 弹框
import '../h5ds/unit/mouseWheel.js'; // 滚轮事件
import '../h5ds/unit/slider.js'; //滚动条
import '../h5ds/unit/switch.js'; //开关
import '../h5ds/unit/selectdiy.js'; //自定义选择 select DIY
import '../h5ds/unit/title.js'; //title提示
import '../h5ds/unit/tabs.js'; //tabs
import '../h5ds/unit/drag.js'; //drag
import '../h5ds/unit/pagelist.js'; //分页插件
import '../h5ds/unit/tip.js'; //Tip提示
import '../h5ds/unit/uniqlist.js'; //列表排序
import '../h5ds/unit/control.js'; //控制器
import '../h5ds/unit/crop.js'; //图片剪切
import '../h5ds/unit/upload.js'; //文件上传
import '../h5ds/unit/toggle.js'; //触发器

$(function(){
    let pop = $.confirms({
        callback: function(mark) {
            console.log(mark);
        }
    });
    pop.show();

});

//滚动条事件，start,slider,end
$(function() {
    $('#sliderDemo').on('start', function(e, val) {
        console.log('start', val)
    }).on('change', function(e, val) {
        console.log('change', val)
    }).on('end', function(e, val) {
        console.log('end', val)
    });
})

//switch 事件
$(function() {
    $('#switchDemo').on('change', function(e, val) {
        console.log(val)
    })
})

//tip
$(function() {
    $('#tip').on('click', function(e) {
        $.tip({
            msg: '成功！'
        })
    });
})

//pagelist
$(function() {
    $('#pagelist').pagelist({
        count: 7,
        pagesize: 1,
        page: 1
    }).on('page', function(e, p) {
        console.log('>> ', p)
    });

    $('.tpl-pagelist').pagelist({ count: 200 })
})

//控制器
$(function() {

    var c = $('#resize').control({
        movex: true,
        movey: true,
        rotate: true,
        autosize: true,
        fixedsize: true
    })

    //销毁：c.distory()

})

//图片剪切
$(function() {
    $('#cropimg').crop({
        delBtn: true
    })

    $('#cropimg').on('crop', function(e, data) {
        console.log('裁剪', data)
    });

    $('#cropimg').on('cropNew', function(e) {
        console.log('换图')
    });

    $('#cropimg').on('cropDel', function(e) {
        console.log('删除')
    });
})

//图片上传
$(function() {
    $('#upload').upload({
        auto: true,
        method: 'post',
        multi: true, //多文件上传
        fileName: 'file', //表单名字
        data: { key: 123456 }, //附带表单
        imgbox: '.upload-box', //放图片的box
        url: '/api/upload', //上传
        uploadStart: function(a) { //上传开始时的动作

        },
        uploadSuccess: function(a) { //上传成功的动作

        },
        uploadComplete: function(a) { //上传完成的动作

        },
        uploadError: function(a) { //上传失败的动作

        },
        init: function(a) { //初始化时的动作

        },
        cancel: function(a) { //删除掉某个文件后的回调函数

        }
    });
});

//主函数入口
$(function() {

})