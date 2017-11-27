// 获取图片素材分类
export function getSysImgTypes() {
    return $.ajax({
        type: 'post',
        url: '/api/getSysImgTypes',
        dataType: 'json'
    });
}

// 保存APP
// obj : { name: '', pageSize: 20, pageNum: 1 }
export function saveData(obj) {
    return $.ajax({
        type: 'post',
        url: '/api/saveData',
        data: obj,
        dataType: 'json'
    });
}

// 获取模板素材
// obj : { name: '', pageSize: 20, pageNum: 1 }
export function getSysTpls(obj) {
    return $.ajax({
        type: 'post',
        url: '/api/getSysTpls',
        data: obj,
        dataType: 'json'
    });
}

// 获取模板素材分类
export function getSysTplsTypes() {
    return $.ajax({
        type: 'post',
        url: '/api/getSysTplsTypes',
        dataType: 'json'
    });
}

// 获取我的模板
export function getUserTpls(data) {
    return $.ajax({
        data: data,
        type: 'post',
        url: '/api/getUserTpls',
        dataType: 'json'
    });
}

// 添加我的模板
export function addUserTpls(data){
    return $.ajax({
        data: data,
        type: 'post',
        url: '/api/addUserTpls',
        dataType: 'json'
    });
}

// 删除我的模板
export function delUserTpls(data){
    return $.ajax({
        data: data,
        type: 'post',
        url: '/api/delUserTpls',
        dataType: 'json'
    });
}

// 获取图片素材
// obj : { name: '', pageSize: 20, pageNum: 1 }
export function getSysImgs(obj) {
    return $.ajax({
        type: 'post',
        url: '/api/getSysImgs',
        data: obj,
        dataType: 'json'
    });
}

// 获取app json
// obj : { appid: 1 }
export function getAppData(obj) {
    //获取APP对象
    return $.ajax({
        type: 'post',
        url: '/api/getUserApp',
        data: obj,
        dataType: 'json'
    });
}

// 获取我的图片
// obj : { pageSize: 20, pageNum: 1 }
export function getUserImgs(obj) {
    return $.ajax({
        type: 'post',
        url: '/api/getUserImgs',
        data: obj,
        dataType: 'json'
    });
}

// 获取音乐
// obj : { pageSize: 20, pageNum: 1 }
export function getMp3(obj) {
    return $.ajax({
        type: 'post',
        url: '/api/getMp3',
        data: obj,
        dataType: 'json'
    });
}

// 上传图片
// obj : { imgData: xx}
export function uploadImgBase64(obj) {
    return $.ajax({
        type: 'post',
        url: '/api/uploadBase64',
        data: obj,
        dataType: 'json'
    });
}

/**
 * @desc 删除用户图片
 * @param id 图片ID
*/
export function delImg(obj) {
    return $.ajax({
        type: 'post',
        url: '/api/delUserImgs',
        data: obj,
        dataType: 'json'
    });
}