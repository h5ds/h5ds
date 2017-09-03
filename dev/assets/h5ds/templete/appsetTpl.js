import { setDataApp } from '../common/AppDataFun.js';

export function appsetTpl(obj) {
    return `<div class="set-appinfo">
				<div class="tr">
					主图: <a id="appSetUpload" class="mt-upload-btn"><img id="uploadMainImg" src="${obj.img}" width="100" height="100"/></a>
				</div>
				<div class="tr">
					标题: <input id="appSetName" type="text" class="mt-input" width="200" value="${obj.name}"/>
				</div>
				<div class="tr">
					描述: <textarea id="appSetInfo" style="resize:none" type="text" class="mt-textarea">${obj.info}</textarea>
				</div>
			</div>`;
}

// appset 的事件
export function initAppset() {

    //设置名字
    $('#appSetName').on('input', function(e) {
        let val = $(this).val();
        let $setname = $('.a-setname');
        $setname.html(val);
        setDataApp({
            name: val
        });
    });

    //设置info
    $('#appSetInfo').on('input', function(e) {
        setDataApp({
            info: $(this).val()
        });
    });

    //图片上传 ..
    $('#appSetUpload').upload({
        auto: true,
        method: 'post',
        multi: false, //多文件上传
        fileName: 'file', //表单名字
        data: {}, //附带表单
        imgbox: '#uploadMainImg', //放图片的box
        url: '/api/upload', //上传
        uploadSuccess: (res) => {
            //...
            setDataApp({
                img: res.data.url
            });
        },
        uploadError: (res) => {
            console.error('图片上传失败！', res)
        }
    })
}