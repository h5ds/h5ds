import * as db from '../localSave/indexedDB.js'; // indexedDB

const imgNullTpl = '<div class="a-selectimg img-null">选择图片</div>';

export function imgTpl(obj) {
    if(!obj || !obj.src) {
        return `
        <div class="set-img set_img">
            <div class="set_img_crop">${imgNullTpl}</div>
        </div>
        `;
    }
    if (obj.src.indexOf('#') !== -1) {
        obj.src = obj.src.split('#')[0];
    }
    // $crop 对象是 set_img_crop
    return `
    <div class="set-img set_img">
        <div data-oldsrc="${obj.src}" data-src="${obj.src}" class="set_img_crop"></div>
    </div>`;
}

/**  
 * 将以base64的图片url数据转换为Blob  
 * @param urlData  
 *        用url方式表示的base64图片数据  
 */
export function convertBase64UrlToBlob(urlData) {
    let bytes = window.atob(urlData.split(',')[1]); //去掉url的头，并转换为byte  
    //处理异常,将ascii码小于0的转换为大于0  
    let ab = new ArrayBuffer(bytes.length);
    let ia = new Uint8Array(ab);
    for (let i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/png' });
}

/**
 * base64 to url
 * @param base64
 * @param temp 时间戳
 * @return url
 */
export function base64ToUrl(base64, temp) {
    let URL = window.URL || window.webkitURL;
    // 通过 file 生成目标 url
    return URL.createObjectURL(convertBase64UrlToBlob(base64)) + `#${temp}`;
}

/**
 *	图片剪切方法的初始化
 *	$crop: set_img_crop 对象
 *	set: crop 插件的参数
 *	self: 当前操作的类
 *	callback: 执行完成后的回调函数
 *  selectImgBack 选择图片的回调函数
 */
export function initCrop(self, $crop, set, callback) {

    let obj = self[self.className];
    // 裁剪函数
    $crop.empty(); // 如果原来有对象，先清空DOM，和事件

    set.wh = set.wh || ['100%', '100%'];

    // 如果没图
    if(!$crop.crop(set)) {
        $crop.html(imgNullTpl);
    }

    // 绑定剪切事件
    $crop.off('crop').on('crop', function(e, data) {
        // 还原图片
        if (typeof data === 'string') {
            if (obj.type === 'img') {
                obj.data.src = data;
            } else { // 背景
                obj.style['background-image'] = data;
            }
            callback('reset');
        } else { // 图片上传

            let temp = +new Date();
            let imgURL = base64ToUrl(data.imgData, temp);

            // 存储图片到本地，提交的时候，再统一上传到服务器
            db.addData('img', [{
                id: temp,
                value: data.imgData
            }], () => {
                // 图片特殊处理
                if (obj.type === 'img') {
                    obj.data.src = imgURL;
                } else { // 背景
                    obj.style['background-image'] = imgURL;
                }
                callback('crop');
            });

        }
    });

    // 清除背景图
    $crop.off('cropDel.' + self.className).on('cropDel.' + self.className, function(e) {
        $crop.attr({
            'data-oldsrc': '',
            'data-src': ''
        }).html(imgNullTpl);

        // 图片特殊处理, 这里只是清除图片。并没有删除图层
        if (obj.type === 'img') {
            obj.data.src = '';
        } else { // 背景
            obj.style['background-image'] = '';
        }
        callback('delete');
    })

    // 换图
    // $crop.off('cropNew.' + self.className).on('cropNew.' + self.className, function(e, val) {
    //     // console.log('换图', val);
    // })

    // 选择图片, 这里感觉右侧的编辑区域，判断当前应该调用哪个事件
    let evName = 'layer';
    if(!$('#setAppBox').is(':hidden')) {
        evName = 'app';
    }else if(!$('#setPageBox').is(':hidden')) {
        evName = AppData.edit.pageType;
    }else if(!$('#setLayerBox').is(':hidden')) {
        evName = 'layer';
    }else {
        // ...
    }

    // console.log('初始化选择图片的方法');
    $crop.off('selectImg.' + evName).on('selectImg.' + evName, (e, val) => {
        $crop.attr({
            'data-oldsrc': val,
            'data-src': val
        });
        if($crop.find('.img-null')[0]) {
            $crop.crop(set);
        }else {
            //事件触发, 还原
            $crop.find('.mt-cropbtn-init').trigger('click'); // true : 不重新设置尺寸
        }
        // 选择后的回调函数
        $crop.trigger('selectImgBack', val);
        callback('select', val);
    });

    return $crop;
}