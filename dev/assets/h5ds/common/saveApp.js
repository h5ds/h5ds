import * as db from '../localSave/indexedDB.js'; // indexedDB
import { uploadImgBase64, saveData } from '../server/ajax';
import { AppDataChange } from './AppDataFun';
import { loadArr } from '../conf/loading';
import { sliderAnimate } from '../conf/sliderAnimate';
import { totalLayerType } from './totalLayerType';
import { popupHtml, fixedUpHtml, fixedDownHtml, pageHtml } from './saveAppHtml';

/**
 * @desc 将AppData里面的 img 单独拿出来
 * @param data 也就是 传入一个 app 对象
*/
function getAppDataImgs(data) {
    let arr = [];
    let pages = data.pages;

    if (data.style['background-image']) {
        arr.push(data.style['background-image']);
    }
    pages.forEach(page => {
        if (page.style['background-image']) {
            arr.push(page.style['background-image']);
        }
        page.layers.forEach(layer => {
            if (layer.type === 'img') {
                arr.push(layer.data.src);
            }
        });
    });

    return arr;
}

// app 页面的数据
/**
 * @desc 传入一个 app 对象，生成对应的 html 文件，这个方法必须是一个纯方法
 * 因为这个方法被案例中心，新建app的时候调用
*/
export function appToHtmlFile(app) {
    let types = totalLayerType(app);
    let fixedUp = app.fixeds[0];
    let fixedDown = app.fixeds[1];

    return `
        <!doctype html>
        <html>
        <head>
            <title>${app.name}</title>
            <meta name="description" content="${app.info}">
            <meta name="keywords" content="${app.info}">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="format-detection" content="telephone=no" />
            <meta name="format-detection" content="email=no" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="black" />
            <meta http-equiv="Cache-Control" content="no-cache" />
            <meta name="x5-fullscreen" content="true">
            <meta name="x5-orientation" content="portrait">
            <meta name="x5-page-mode" content="app">
            <meta charset="utf-8">
            <script src="/assets/plugin/h5ds.screen.js"></script>
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <!-- Set render engine for 360 browser -->
            <meta name="renderer" content="webkit">
            <!-- No Baidu Siteapp-->
            <meta http-equiv="Cache-Control" content="no-siteapp" />
            <link rel="stylesheet" type="text/css" href="/assets/plugin/animate.css">
            <link rel="stylesheet" type="text/css" href="/assets/plugin/animations.css">
            <link rel="stylesheet" type="text/css" href="/assets/plugin/loaders.css">
            <link rel="stylesheet" type="text/css" href="/assets/font/iconfont.css">
            <link rel="stylesheet" type="text/css" href="/assets/plugin/h5ds.app.css">
            <!--js-->
            <script src="/assets/plugin/jquery-2.1.1.js"></script>
            ${types.map ? `<script type="text/javascript" src="http://webapi.amap.com/maps?v=1.4.0&key=b10045abfc1d4d22446efdc74f85c238"></script>` : ''}
            <script src="/assets/plugin/jquery.touchSwipe.min.js"></script>
            <script>
            var IMG_SOURCE = '${JSON.stringify(getAppDataImgs(app))}';
            var sliderAnimate = ${ JSON.stringify(sliderAnimate[app.slider.animate]) || '{}'};
            </script>
            <script src="/assets/plugin/h5ds.swiper.js"></script>
        </head>
        <body ondragstart="return false">
            ${ app.mp3.url ? '<div class="h5ds-video-icon"><i></i><i></i><i></i><i></i></div>' : ''}
            ${ app.mp3.url ? `<audio style="display:none; height:0;" autoplay="autoplay" id="h5dsBgMusic" preload="auto" src="${app.mp3.url}" loop="loop"></audio>` : ''}
            <div id="h5dsPopups">${popupHtml(app.popups)}</div>
            <div id="h5dsFixedsUp">${fixedUpHtml(fixedUp)}</div>
            <div id="h5dsFixedsDown">${fixedDownHtml(fixedDown)}</div>
            <div class="h5ds-loading" id="h5dsLoading">
                <div class="h5ds-loadinner">
                    ${loadArr[app.loading]}
                    <div class="h5ds-progress" id="h5dsProgress">0</div>
                </div>
            </div>
            <div id="h5dsSwiper" pages-length="${app.pages.length}" class="h5ds-swiper" style="${$.toStyle(app.style)}">${pageHtml(app.pages)}</div>
        </body>
        </html>`;
}

/**
 * @desc 设置弹窗的预览数据
*/
function appHTML(app) {
    let fixedUp = app.fixeds[0];
    let fixedDown = app.fixeds[1];
    return `
        <div class="view-phone">
            <div class="change-page">
                <a class="prev" id="pageToPrev"><i class="iconfont icon-a3top"></i></a>
                <p><span id="nowPageNum">1</span>/${app.pages.length}</p>
                <a class="next" id="pageToNext"><i class="iconfont icon-a3down"></i></a>
            </div>
            <div class="view-phone-window">
                ${ app.mp3.url ? `<audio style="display:none; height:0;" autoplay="autoplay" id="h5dsBgMusic" preload="auto" src="${app.mp3.url}" loop="loop"></audio>` : ''}
                ${ app.mp3.url ? '<div class="h5ds-video-icon"><i></i><i></i><i></i><i></i></div>' : ''}
                <div id="h5dsPopups">${popupHtml(app.popups)}</div>
                <div id="h5dsFixedsUp">${fixedUpHtml(fixedUp)}</div>
                <div id="h5dsFixedsDown">${fixedDownHtml(fixedDown)}</div>
                <div id="h5dsSwiper" pages-length="${app.pages.length}" class="h5ds-swiper" style="${$.toStyle(app.style)}">${pageHtml(app.pages)}</div>
            </div>
        </div>
        <div class="other-info">
            <div class="infos clearfix">
                <h2>基本参数</h2>
                <div class="qrcode-box box-left">
                    <img class="mainpic" src="${app.img}"/>
                </div>
                <div class="box-right">
                    <input class="app-name-input" type="text" value="${app.name}"/>
                    <textarea class="app-info-textarea">${app.info}</textarea>
                </div>
            </div>
            <div class="qrcode clearfix">
                <h2>二维码</h2>
                <div class="qrcode-box box-left" id="qrcode">
                    <span class="qrcode-tips">发布后生成</span>
                </div>
                <div class="box-right qrcode-url-box">
                    <span class="qrcode-tips">发布后生成</span>
                </div>
            </div>
            <div class="btns">
                <a id="continueEdit" class="btn-edit">继续编辑</a>
                <a id="publishApp" class="btn-publish">发布</a>
            </div>
        </div>
    `;
}

// 生成二维码
function newQrcode() {
    // 生成二维码
    let owner = $.getUrlData('owner');
    let id = $.getUrlData('id');
    let path = `${location.origin}/apps/${owner}/${id}/index.html`;
    $('.qrcode-url-box').html(path);
    let $qrcode = $('#qrcode').empty();
    new QRCode($qrcode[0], {
        text: path,
        width: 140,
        height: 140,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });
}

// 事件初始化， 在app.js 里面初始化
let animated = false;
export function eventAppViewShow(self) {

    // 切换按钮
    $('#appViewShow').on('click', '#pageToPrev, #pageToNext', function () {

        // 动画中，不能继续点
        if (animated) {
            return;
        }

        let cls = $(this).attr('class');
        let $out = $('#h5dsSwiper').find('.h5ds-swiper-current');
        let outIndex = $out.index();
        if (cls === 'prev') {
            $('#h5dsSwiper').trigger('h5ds_down', {
                $out: $out,
                outIndex: outIndex
            }).trigger('h5ds_left', {
                $out: $out,
                outIndex: outIndex
            });
        } else {
            $('#h5dsSwiper').trigger('h5ds_up', {
                $out: $out,
                outIndex: outIndex
            }).trigger('h5ds_right', {
                $out: $out,
                outIndex: outIndex
            });
        }
    });

    // 继续编辑
    $('#appViewShow').on('click', '#continueEdit', function () {
        $('#appViewShow').trigger('closeModal');
    });

    // 发布
    $('#appViewShow').on('click', '#publishApp', function () {

        let load = $.loading({
            tip: 'H5生成中，请耐心等待！'
        });

        let appid = $.getUrlData('id');
        if (appid === null) {
            $.tip({
                msg: '操作失败！APP的id不见了', //
                type: 'danger' //success,danger,warning
            });
            return;
        }
        saveData({
            id: appid,
            name: AppData.data.name,
            pic: AppData.data.img,
            des: AppData.data.info,
            data: JSON.stringify(AppData.data),
            shtml: appToHtmlFile(AppData.data)
        }).done(res => {
            if (res.success) {
                $.tip();
                load.close();

                newQrcode();

            }
        });
    });

    // 修改名字
    $('#appViewShow').on('change', '.app-name-input', function () {
        let name = $(this).val();
        self.app.name = name;
        $('.a-setname').html(name);
        $('#appSetName').val(name);
        AppDataChange();
    });

    // 修改描述
    $('#appViewShow').on('change', '.app-info-textarea', function () {
        let info = $(this).val();
        self.app.info = info;
        $('#appSetInfo').val(info);
        AppDataChange();
    });
}

// 获取 blob 图片, 约定 arr#index 表示数组
function getBlobImg() {
    // let keys = []; // 记录 AppData.data[key] 中，有blob图片的 key 集合
    let blobObj = [];
    let app = AppData.data;

    // app 主图
    if (app.img.isBlob()) {
        blobObj[app.img.blobId()] = ['img'];
    }

    // app 背景
    if (app.style['background-image'].isBlob()) {
        blobObj[app.style['background-image'].blobId()] = ['style', 'background-image'];
    }

    // pages, layers 背景 layer 的 data.src // 如果还有其他的，都在这里添加
    app.pages.forEach((page, i) => {
        let pageBg = page.style['background-image'] || '';
        if (pageBg.isBlob()) {
            blobObj[pageBg.blobId()] = [`pages#${i}`, 'background-image'];
        }

        // layers
        page.layers.forEach((layer, j) => {
            let layerBg = layer.style['background-image'] || '';
            let src = '';
            if (layer.data && layer.data.src) {
                src = layer.data.src;
            }
            if (layerBg.isBlob()) {
                blobObj[layerBg.blobId()] = [`pages#${i}`, `layers#${j}`, 'background-image'];
            }
            if (src.isBlob()) {
                blobObj[src.blobId()] = [`pages#${i}`, `layers#${j}`, 'data', 'src'];
            }
        });
    });

    return blobObj;
}

// 重新设置 AppData.data 重置img，然后渲染弹窗
/**
 * @desc 在替换完二进制地址的照片后，将html渲染到弹窗里面。显示弹窗里面的内容
 * @param objs getBlobImg() 返回的数据，二进制图片 { id: 记录的AppData.data里面的路径}
 * @param allRes indexedDb里面查询到的base64图片。[{id: base64}]
*/
function resetAppData(objs, allRes) {
    let app = AppData.data;
    // 重置img
    for (let i = 0; i < allRes.length; i++) {
        let d = allRes[i];
        let keysArr = objs[d.id];
        let point = app; // 临时指针
        keysArr.forEach(elem => {
            if (elem === 'background-image' || elem === 'src') {
                point[elem] = d.src;
            } else {
                if (elem.indexOf('#') !== -1) {
                    let arr = elem.split('#');
                    point = point[arr[0]][arr[1]];
                } else {
                    point = point[elem];
                }
            }
        });
    }

    // 替换地址后，保存一次local 避免二次上传图片
    AppDataChange();

    // console.log('img 已经转换 ****', app);
    let html = appHTML(app);
    // console.log(html);

    // render 弹窗
    $('#appViewShowBtn').trigger('click');

    // 关闭弹窗事件
    $('#appViewShow').on('closeBack', function () {
        $(this).find('.mt-modal-full').html('');
    }).find('.mt-modal-full').html(`${html}`);

    // 自动播放音乐
    autoPlayMusic();

    // 滑动
    let $h5dsSwiper = $('#h5dsSwiper');
    $h5dsSwiper.h5dsSwiper($.extend(sliderAnimate[app.slider.animate] || {}, {
        len: app.pages.length
    }));
    $h5dsSwiper.off('animateStart animateEnd').on('animateStart', function (e, index) {
        // 切换编号
        $('#nowPageNum').html(index + 1);
        animated = true;
    }).on('animateEnd', function () {
        animated = false;
    });
}

/**
 * AppData.data 组合成HTML代码
 */
export function appToHTML() {
    console.log(AppData.data);

    return new Promise((resolve1, reject1) => {

        // 上传 blob 图片
        db.getAllData('img', (res) => {
            // console.log(res);
            if (!res) {
                // ...
                reject1(false);
                return;
            }

            // 找出 blob 图片
            let objs = getBlobImg();
            // console.log(objs);
            // 如果有图
            let arr = [];
            for (let i = 0; i < res.length; i++) {
                let d = res[i];
                if (objs[d.id]) {
                    let p = new Promise(function (resolve) {
                        uploadImgBase64({
                            imgData: d.value,
                            name: 'crop_' + d.id
                        }).done(res => {
                            if (res.success) {
                                resolve({
                                    id: d.id,
                                    src: res.data.src
                                });
                            }
                        });
                    });
                    arr.push(p);
                }
            }
            Promise.all(arr).then(function (allRes) {
                resetAppData(objs, allRes);
                resolve1(true);
            });

        });

    });
}