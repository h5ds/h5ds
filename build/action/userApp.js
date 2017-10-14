var Sequelize = require('sequelize');
var { result } = require('../lib/result');
var { readSQL } = require('../sql/readSQL');
var { deleteSQL } = require('../sql/deleteSQL');
var { createSQL } = require('../sql/createSQL');
var sd = require('silly-datetime');

/**
 * @desc 获取用户的APP
*/
exports.getUserApps = function (req, res) {

    readSQL({
        req: req,
        table: 'h5ds_apps',
        where: {
            owner: req.session.user.id,
            name: {
                '$like': `%${req.body.name || ''}%`
            }
        },
        sequeObj: {
            id: { type: Sequelize.INTEGER, primaryKey: true },
            owner: { type: Sequelize.CHAR },
            name: { type: Sequelize.CHAR },
            url: { type: Sequelize.CHAR },
            pic: { type: Sequelize.CHAR },
            des: { type: Sequelize.CHAR },
            date: { type: Sequelize.CHAR }
        },
        callBack: (ret) => {
            if (ret) {
                // console.log(ret);
                result(req, res, {
                    code: 200,
                    data: ret.rows,
                    count: ret.count,
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
 * @desc 编辑器内获取用户APP
*/
exports.getUserApp = function (req, res) {
    
    readSQL({
        req: req,
        where: {
            owner: req.session.user.id,
            id: req.body.appid
        },
        table: 'h5ds_apps',
        page: false,
        sequeObj: {
            data: { type: Sequelize.TEXT('long') }
        },
        callBack: (ret) => {
            if (ret) {
                result(req, res, {
                    code: 200,
                    data: ret[0],
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

// 新建app
exports.addData = function(req, res) {
    let uid = req.session.user.id;

    // 创建应用
    createSQL({
        obj: {
            owner: uid,
            name: req.body.name,
            pic: req.body.pic,
            des: req.body.des,
            date: sd.format(new Date(), 'YYYY/MM/DD HH:mm:ss'),
            data: req.body.data
        },
        sequeObj: { 
            id: { type: Sequelize.INTEGER, primaryKey: true },
            owner: { type: Sequelize.CHAR },
            name: { type: Sequelize.CHAR },
            url: { type: Sequelize.CHAR },
            pic: { type: Sequelize.CHAR },
            des: { type: Sequelize.CHAR },
            date: { type: Sequelize.CHAR },
            data: { type: Sequelize.TEXT('long') }
        },
        table: 'h5ds_apps',
        callBack: ret => {
            if (ret) {
                result(req, res, {
                    code: 200,
                    data: ret.insertId,
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