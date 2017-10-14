var { result } = require('../lib/result');
var { readSQL } = require('../sql/readSQL');
var Sequelize = require('sequelize');

/**
 * @desc 获取H5
*/
exports.getH5 = function(req, res, cback) {

    // 获取系统图片，name = ''
    let obj = {
        title: {
            '$like': `%${req.query.key || ''}%`
        },
        type: {
            '$like': `%${req.query.type || ''}%`
        },
        del: 0
    }
    req.query.pageNum = req.query.pageNum || 0;
    req.query.pageSize = req.query.pageSize || 20;
    readSQL({
        req: req,
        where: obj,
        table: 'h5ds_h5',
        sequeObj: {
            id: { type: Sequelize.INTEGER, primaryKey: true },
            title: { type: Sequelize.STRING },
            desc: { type: Sequelize.STRING },
            url: { type: Sequelize.STRING },
            pic: { type: Sequelize.STRING },
            type: { type: Sequelize.STRING }
        },
        callBack: (ret) => {
            if (ret) {
                cback(JSON.stringify(ret));
            } else {
                cback(null);
            }
        }
    });
}