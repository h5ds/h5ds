import '../sass/ui/ui';
import '../sass/h5ds/h5ds';

// 模板初始化
import './initTpl';

//事件 ....
import './otherEvent/toggleLeftBox.js'; //点击右侧
import './otherEvent/setApp.js'; //设置app参数
import './otherEvent/source.js'; //资源库事件 //

// 全局方法
import './unit/utils.js'; // js 原生对象继承的方法集合
import './unit/bindToInput.js'; // 数据双向绑定
import './unit/inputType.js'; //自动控制单位
import './unit/accCount.js'; // 浮点数计算
//import './unit/Matrix.js'; // 矩阵算法

//插件
import './unit/checkboxGroup.js'; // 复选框
import './unit/help.js'; // 帮助提示
import './unit/contextMenu.js'; // 右键菜单初始化
import './unit/escape.js'; // json转码escape
import './unit/toStyle.js'; // object 变成 style top:10px; left: 20px; // ... 
import './unit/getUrlData.js'; // 获取浏览器url 数据
import './unit/loading.js'; // loading
import './unit/confirm.js'; // 确认
import './unit/modal.js'; // 弹框
import './unit/mouseWheel.js'; // 滚轮事件
import './unit/tpl.js'; //简单的模版引擎
import './unit/tip.js'; //简单的模版引擎
import './unit/addStyle.js'; //添加样式
import './unit/setStyle.js'; //设置样式
import './unit/color.js'; //颜色
import './unit/selectdiy.js'; //选
import './unit/selectone.js'; //单选
import './unit/toggle.js'; //触发器
import './unit/uniqlist.js'; //列表排序
import './unit/tabs.js'; //tabs
import './unit/title.js'; //title提示 
import './unit/crop.js'; //图片剪切
import './unit/slider.js'; // 滚动条
import './unit/switch.js'; //开关
import './unit/upload.js'; //文件上传
import './unit/pagelist.js'; //分页
import './unit/drag.js'; //drag
import './unit/control.js'; //控制器

import * as db from './localSave/indexedDB.js'; // indexedDB

//APP 类
import App from './core/app.js'; //..
import { setStorage, getStorage } from './localSave/localStorage.js';
import { openDB } from './localSave/indexedDB.js';
import { imgURLClear } from './unit/imgURLClear.js';
import { getAppData } from './server/ajax.js'; // ajax
import { sysImg, myImg } from './source/imgSource.js'; // 图片资源
import { sysTpls, myTpls } from './source/tplSource.js'; // 模板资源
import { sysMp3 } from './source/otherSource.js';
import { setPhoneScale } from './common/appFun';

// 数据容器
(function(window) {
    window.AppData = {
        data: null, //缓存APP数据
        edit: {
            pageType: 'pages', // 当前编辑的类型，pages, popups, fixeds 对应 data里面的 key
            copyLayer: null, // 复制layer内容
            history: [], // 历史记录
            setapp: true, // 我喜欢就加上咯，任性！
            phoneScale: null, // 手机缩放比例
            appClass: null, // appClass
            pageIndex: null, // 默认编辑页面 index
            pageClass: null, //当前编辑的 page 类
            layerIndex: null, // 默认选中的layer index
            layerDom: null, // 当前编辑的layer Dom对象
            layerClass: null // 当前编辑的layer 类
        }
    }
}) (window);

// 初始化App
function iniApp(res) {

    // 新增扩展, 浮动层, 弹窗层，兼容老版本.ss
    if(!res.fixeds) {
        res.fixeds = [{
            id: '',
            name: '浮动层上',
            style: {},
            layers: []
        }, {
            id: '',
            name: '浮动层下',
            style: {},
            layers: []
        }];
    }else if(res.fixeds.length === 1) {
        res.fixeds.push({
            id: '',
            name: '浮动层下',
            style: {},
            layers: []
        });
    }

    // 弹窗扩展，兼容老版本
    if(!res.popups) {
        res.popups = [];
    }

    AppData.data = res;
    
    var app = new App(res);
    app.init();

    // 如果pages 没有列表， 展开页面选择框
    if(res.pages.length === 0) {
        $('#flod-btn').trigger('click');
    }
}

// 获取数据
function getData() {
    // 获取缓存数据
    let uid_id = getStorage('UID_ID');
    let uid = $.getUrlData('owner');
    let id = $.getUrlData('id');

    if(uid === null && id === null) {
        $.tip({
            msg: '操作失败，请先选择APP', //
            type: 'danger', //success,danger,warning
            time: 30000 //
        });
        return;
    }

    // 如果有缓存， 且当前打开的 appid 
    if (uid_id === `${uid}_${id}`) {
        let APP_DATA = getStorage('APP_DATA');
        
        // 数据清洗 - 将 缓存的图片进行数据清洗，因为刷新后，二进制缓存更新了。
        imgURLClear(APP_DATA, () => {
            iniApp(APP_DATA);
        });
    } else {
        //获取APP对象
        getAppData({ appid: $.getUrlData('id') }).done((res) => {
            // console.log("main.js 43 =>",res);
            // 初始化编辑器方法，入口
            if(res.success) {
                setStorage('UID_ID', `${uid}_${id}`);
                iniApp(JSON.parse(res.data.data));
            }
        });
    }
}

// 主函数入口
$(function () {

    // 系统图片
    sysImg();

    // 系统模板
    sysTpls();

    // 我的图片
    myImg();

    // 音乐
    sysMp3();

    // 设置缩放
    setPhoneScale();

    // 创建数据库, 这个方法是异步的
    db.openDB().then( res => {
        // 获取数据， 渲染app
        if(res) {
            getData();
        }
    });

})