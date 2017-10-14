import { getSysImgs, getSysImgTypes, getUserImgs, delImg } from '../server/ajax.js'; // ajax

export const PAGE_SIZE = 20;

// 系统图片的分页
export function newPage(count, $dom, callback) {
    // 初始化分页
    $dom.pagelist({
        page: 1,
        pagesize: PAGE_SIZE,
        count: count
    }).on('page', function(e, p) {
        callback(p);
    });
}

// 获取图片素材
function getSysImgsFun(p) {
    $('#imgSysList').loading();
    getSysImgs({ name: '', type: p.type, pageSize: p.pagesize, pageNum: p.page }).done((res) => {
        if (res.success) {
            // console.log(res.data);
            let tpl = '';
            for (let i = 0; i < res.data.length; i++) {
                let d = res.data[i];
                tpl += `<li><div class="imgbox"><img src="${d.url}" alt=""></div></li>`
            }
            // 设置 素材列表
            $('#imgSysList').html(tpl);

            // 分页
            let $imgPagelist = $('#imgPagelist');
            if (!$imgPagelist.find('.mt-pagelist')[0]) {
                // 初始化分页
                newPage(res.count, $imgPagelist, getSysImgsFun);
            }
        }
    });
}

// 获取图片素材分类
export function getImgSysTypes() {
    $('#imgSysTypesList').loading();
    getSysImgTypes().done((res) => {
        if (res.success) {
            let tpl = '<li class="item active" data-id=""><a href="javascript:;">全部</a></li>';
            for (let i = 0; i < res.data.length; i++) {
                tpl += `<li class="item" data-id="${res.data[i].id}"><a href="javascript:;">${res.data[i].name}</a></li>`;
            }
            $('#imgSysTypesList').html(tpl);
        }
    });
}

// 我的图片
function userImgTpl(data) {
    data.url = data.url.replace(/\\/g, '/');
    return `<li>
                <div class="imgbox"><!--
                    --><img src="${data.url}"><!--
                    --><a class="del-my-img" data-id="${data.id}"><i class="iconfont icon-close"></i></a><!--
                --></div>
            </li>`;
}

// 系统图片
export function sysImg() {

    // 获取系统图片
    getSysImgsFun({
        type: '',
        pagesize: PAGE_SIZE,
        page: 1
    });

    // 获取图片素材分类
    getImgSysTypes();

    // 图片上传 **
    $('#uploadImg').upload({
        auto: true,
        method: 'post',
        multi: true, //多文件上传
        fileName: 'file', //表单名字
        data: {}, //附带表单
        url: '/api/upload',
        uploadStart: () => {
            // 切换到我的图库
            $('#sysOrMyImgs').find('li[data-type="my"]').trigger('click');
        },
        uploadSuccess: (res) => {
            //...
            console.log('上传成功！重新获取用户图片', res);
            getUserImgsFun({
                pagesize: PAGE_SIZE,
                page: 1
            });
            // $('#imgMyList').prepend(userImgTpl(res.data));
        },
        uploadError: (res) => {
            console.error('图片上传失败！', res)
        }
    });

    // 选择图分类
    $('#imgSysTypesList').on('click', '.item', function(e) {
        $(this).addClass('active').siblings('.item').removeClass('active');
        let id = $(this).attr('data-id');
        getSysImgsFun({
            type: id,
            pagesize: PAGE_SIZE,
            page: 1
        });
    });

}

// 获取用户的图片
function getUserImgsFun(p) {
    getUserImgs({ pageSize: p.pagesize, pageNum: p.page }).done((res) => {
        if (res.success) {
            // console.log('用户图片=>', res);
            let str = '';
            for (let i = 0; i < res.data.length; i++) {
                str += userImgTpl(res.data[i]);
            }
            $('#imgMyList').html(str);

            // 分页
            let $imgPagelist = $('#imgUserPagelist');
            if ($imgPagelist.data('count') != res.count) {
                // 初始化分页
                newPage(res.count, $imgPagelist, getUserImgsFun);
            }
            $imgPagelist.data('count', res.count);

        } else {
            console.error('获取用户图片失败！');
        }
    })
}

// 我的图片
export function myImg() {
    getUserImgsFun({
        pagesize: PAGE_SIZE,
        page: 1
    });

    // 删除我的图片
    $('#imgMyList').on('click', '.del-my-img', function(e) {
        let id = $(this).attr('data-id');
        delImg({
            id: id
        }).done(res => {
            if(res.success) {
                $(this).closest('li').remove();
            }
        });    
    });
    
}