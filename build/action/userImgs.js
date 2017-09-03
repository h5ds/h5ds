var { result } = require('../lib/result');
var { readSQL } = require('../sql/readSQL');
var { deleteSQL } = require('../sql/deleteSQL');

exports.delUserImgs = function (req, res) {

    // 获取系统图片，name = ''
    console.log(req.body);
    deleteSQL({
        req: req, 
        id: req.body.id,
        uid: req.session.user.id,
        table: 'h5ds_imgs_user',
        callBack: (ret) => {
            if (ret) {
                result(req, res, {
                    code: 200,
                    data: ret[0],
                    msg: "成功",
                    count: ret[1],
                    success: true
                });
            } else {
                // 返回值
                result(req, res, {
                    code: 500,
                    data: ret,
                    msg: "失败",
                    success: false
                })
            }
        }
    })
}

/**
 * @desc 获取用户图片
*/
exports.getUserImgs = function (req, res) {

    // 获取系统图片，name = ''
    let obj =  { 
        name: req.body.name || '', 
        type: req.body.type || '',
        owner: req.session.user.id
    };
    readSQL({
        req: req,
        obj: obj,
        table: 'h5ds_imgs_user',
        like: true,
        callBack: (ret) => {
            if (ret) {
                result(req, res, {
                    code: 200,
                    data: ret[0],
                    msg: "成功",
                    count: ret[1],
                    success: true
                });
            } else {
                // 返回值
                result(req, res, {
                    code: 500,
                    data: ret,
                    msg: "失败",
                    success: false
                })
            }
        }
    })
}