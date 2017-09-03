var { result } = require('../lib/result');
var { readSQL } = require('../sql/readSQL');
var { deleteSQL } = require('../sql/deleteSQL');

/**
 * @desc 
*/
exports.getUserApps = function (req, res) {

    //  = ''
    let obj = {
        name: req.body.name || '',
        owner: req.session.user.id
    };
    console.log(req.session.user)
    readSQL({
        req: req,
        obj: obj,
        table: 'h5ds_apps',
        keys: ['id', 'owner', 'name', 'url', 'pic', 'des', 'date'],
        like: true,
        callBack: (ret) => {
            if (ret) {
                // console.log(ret[1]);
                result(req, res, {
                    code: 200,
                    data: ret[0],
                    count: ret[1],
                    msg: "成功!",
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
 * @desc 
*/
exports.getUserApp = function (req, res) {
    
    // 获取系统图片，name = ''
    let obj = {
        id: req.body.appid,
        owner: req.session.user.id
    };
    readSQL({
        req: req,
        obj: obj,
        table: 'h5ds_apps',
        page: false,
        where: true,
        callBack: (ret) => {
            if (ret) {
                result(req, res, {
                    code: 200,
                    data: ret[0],
                    count: ret[1],
                    msg: "成功",
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

exports.delApp = function (req, res) {
    
    // 获取系统模板，name = ''
    deleteSQL({
        req: req, 
        id: req.body.id,
        uid: req.session.user.id,
        table: 'h5ds_apps',
        callBack: ret => {
            if (ret) {
                result(req, res, {
                    code: 200,
                    data: ret,
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