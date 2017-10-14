var { result } = require('../lib/result');
var { readSQL } = require('../sql/readSQL');
var Sequelize = require('sequelize');

/**
 * @desc 获取系统图片
*/
exports.getSysMp3 = function (req, res) {

    // 获取系统图片，name = ''
    readSQL({
        req: req,
        // where: {
        //     name: {
        //         '$like': `%${req.body.name || ''}%`
        //     },
        //     type: req.body.type || ''
        // },
        table: 'h5ds_mp3',
        sequeObj: {
            id: { type: Sequelize.INTEGER, primaryKey: true },
            name: { type: Sequelize.CHAR },
            url: { type: Sequelize.CHAR },
            size: { type: Sequelize.CHAR },
            des: { type: Sequelize.CHAR },
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