var { result } = require('../lib/result');
var { readSQL } = require('../sql/readSQL');
var { createSQL } = require('../sql/createSQL');
var { deleteSQL } = require('../sql/deleteSQL');

exports.delUserTpls = function (req, res) {

    // 获取系统模板，name = ''
    // console.log(req.body);
    deleteSQL({
        req: req, 
        id: req.body.id,
        uid: req.session.user.id,
        table: 'h5ds_tpls_user',
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
 * @desc 添加用户模板
*/
exports.addUserTpls = function (req, res) {

    let obj =  { 
        name: req.body.name || '', 
        data: req.body.data || '',
        pic: req.body.pic || '',
        owner: req.session.user.id
    };
    createSQL({
        req: req,
        obj: obj,
        table: 'h5ds_tpls_user',
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
    });
}

/**
 * @desc 获取用户模板
*/
exports.getUserTpls = function (req, res) {

    // 获取系统模板，name = ''
    let obj =  { 
        name: req.body.name || '', 
        type: req.body.type || '',
        owner: req.session.user.id
    };
    readSQL({
        req: req,
        obj: obj,
        table: 'h5ds_tpls_user',
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