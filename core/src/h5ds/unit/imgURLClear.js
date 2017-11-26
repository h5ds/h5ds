import { openDB, getAllData } from '../localSave/indexedDB.js';
import { arrToObj } from './funs.js';
import { base64ToUrl } from '../templete/imgTpl'; //  图片方法

// @param obj：对应层的obj对象 type:object，imgCacheObj 所有的图片缓存 type:[]
// 清理 style.background 和 data.src
function clearStyleImg(obj, imgCacheObj) {

    // 过滤背景
    if (obj['style'] && obj.style['background-image']) {
        let url = obj.style['background-image'] || '';
        if (url.isBlob()) {
            let temp = url.split('#')[1];
            obj.style['background-image'] = base64ToUrl(imgCacheObj[temp], temp);
        }
    }

    // 过滤 data
    if (obj['data'] && obj.data['src']) {
        let url = obj.data['src'] || '';
        if (url.isBlob()) {
            let temp = url.split('#')[1];
            obj.data['src'] = base64ToUrl(imgCacheObj[temp], temp);
        }
    }
}

// @param APP_DATA : APP本地缓存数据， callback: 数据清洗后的回调函数
// 数据清洗
export function imgURLClear(APP_DATA, callback) {

    // 从本地数据库去拿缓存图片
    openDB().then( res => {

        if(!res) {
            return;
        }
        // 获取全部缓存图片
        getAllData('img', (arr) => {
            if (arr.length > 0) {

                // 图片的缓存对象
                var imgCacheObj = arrToObj(arr);

                // 过滤 APP
                clearStyleImg(APP_DATA, imgCacheObj);
                for (let i = 0; i < APP_DATA.pages.length; i++) {
                    // 过滤 pages
                    clearStyleImg(APP_DATA[AppData.edit.pageType][i], imgCacheObj);
                    for (let j = 0; j < APP_DATA[AppData.edit.pageType][i].layers.length; j++) {
                        // 过滤 layers
                        clearStyleImg(APP_DATA[AppData.edit.pageType][i].layers[j], imgCacheObj);
                    }
                }

                // 释放引用内存
                imgCacheObj = null;

                callback();

            } else {
                // 无缓存图片
                callback();
            }
        });

    });

}