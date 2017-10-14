var { result } = require('../lib/result');
var { readSQL } = require('../sql/readSQL');
var { createSQL } = require('../sql/createSQL');
var { deleteSQL } = require('../sql/deleteSQL');
var Sequelize = require('sequelize');

exports.delUserTpls = function (req, res) {

    // 获取系统模板，name = ''
    // console.log(req.body);
    deleteSQL({
        req: req, 
        id: req.body.id,
        table: 'h5ds_tpls_user',
        sequeObj: {
            type: Sequelize.INTEGER, primaryKey: true
        },
        callBack: (ret) => {
            if (ret) {
                result(req, res, {
                    code: 200,
                    data: ret,
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
        sequeObj: {
            name: { type: Sequelize.CHAR },
            pic: { type: Sequelize.CHAR },
            data: { type: Sequelize.TEXT('long') },
            owner: { type: Sequelize.CHAR },
            des: { type: Sequelize.CHAR }
        },
        callBack: (ret) => {
            if (ret) {
                result(req, res, {
                    code: 200,
                    data: ret.data,
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

/**
 * @desc 获取用户模板
*/
exports.getUserTpls = function (req, res) {

    // 获取系统模板，name = ''
    readSQL({
        req: req,
        where: { 
            name: {
                '$like': `%${req.body.name || ''}%`
            },
            owner: req.session.user.id
        },
        table: 'h5ds_tpls_user',
        sequeObj: {
            id: { type: Sequelize.INTEGER, primaryKey: true },
            name: { type: Sequelize.CHAR },
            pic: { type: Sequelize.CHAR },
            data: { type: Sequelize.TEXT },
            des: { type: Sequelize.CHAR }
        },
        callBack: (ret) => {
            if (ret) {
                result(req, res, {
                    code: 200,
                    data: ret.rows,
                    count: ret.count,
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