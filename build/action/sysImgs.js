var { result } = require('../lib/result');
var { readSQL } = require('../sql/readSQL');
var Sequelize = require('sequelize');

/**
 * @desc 获取系统图片
*/
exports.getSysImgs = function(req, res) {

    // 获取系统图片，name = ''
    let obj = {
        name: {
            '$like': `%${req.body.name || ''}%`
        },
        type: req.body.type || '',
        del: 0
    }
    if(obj.type === '') {
        delete obj.type;
    }
    readSQL({
        req: req,
        where: obj,
        table: 'h5ds_imgs_sys',
        sequeObj: {
            id: { type: Sequelize.INTEGER, primaryKey: true },
            name: { type: Sequelize.CHAR },
            url: { type: Sequelize.CHAR },
            size: { type: Sequelize.CHAR },
            type: { type: Sequelize.CHAR }
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
    });
}

/**
 * @desc 获取系统图片类型
 */
exports.getSysImgTypes = function(req, res) {

    // 获取系统图片，name = ''
    readSQL({
        req: req,
        table: 'h5ds_imgs_type',
        where: {
            del: 0
        },
        sequeObj: {
            id: { type: Sequelize.INTEGER, primaryKey: true },
            name: { type: Sequelize.CHAR }
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