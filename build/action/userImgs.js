var { result } = require('../lib/result');
var { readSQL } = require('../sql/readSQL');
var { deleteSQL } = require('../sql/deleteSQL');
var Sequelize = require('sequelize');

exports.delUserImgs = function (req, res) {

    // 获取系统图片，name = ''
    deleteSQL({
        req: req, 
        where: {
            id: req.body.id,
            del: 0
        },
        table: 'h5ds_imgs_user',
        sequeObj: {
            id: { type: Sequelize.INTEGER, primaryKey: true }
        },
        callBack: (ret) => {
            if (ret) {
                result(req, res, {
                    code: 200,
                    data: ret.rows,
                    count: ret.count,
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
    })
}

/**
 * @desc 获取用户图片
*/
exports.getUserImgs = function (req, res) {

    // 获取系统图片，name = ''
    let obj =  { 
        name: {
            '$like': `%${req.body.name || ''}%`
        },
        owner: req.session.user.id,
        del: 0
    };
    readSQL({
        req: req,
        where: obj,
        table: 'h5ds_imgs_user',
        sequeObj: {
            id: { type: Sequelize.INTEGER, primaryKey: true },
            name: { type: Sequelize.CHAR },
            url: { type: Sequelize.CHAR }
        },
        callBack: (ret) => {
            if (ret) {
                result(req, res, {
                    code: 200,
                    data: ret.rows,
                    count: ret.count,
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
    })
}