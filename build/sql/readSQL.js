var Sequelize = require('sequelize');
var { sequelize } = require('../lib/mysql');

/**
 * @desc 查询数据
 * @param req http请求
 * @param table 表名
 * @param page 是否分页 {pageNum:1, pageSize: 20} / false
 * @param where 是否有条件 object / false
 * @param sequeObj sequelize 参数
 * @param callBack 回调函数 -
*/
exports.readSQL = function (objs) {

    objs = Object.assign({
        where: {},
        callBack: null,
        sequeObj: { id: { type: Sequelize.INTEGER, primaryKey: true } }
    }, objs);

    let pageNum = objs.req.body.pageNum || objs.req.query.pageNum;
    let pageSize = objs.req.body.pageSize || objs.req.query.pageSize;

    let page = false;
    if(pageNum !== undefined) {
        page = {
            pageNum: parseInt(pageNum, 10) || 1,
            pageSize: parseInt(pageSize, 10) || 20
        }
    }

    let { table, where, callBack, sequeObj } = objs;
    
    let Task = sequelize.define(table, sequeObj, {
        timestamps: false,
        freezeTableName: true
    });

    if (page) {
        Task.findAndCountAll({
            offset: (page.pageNum - 1) * page.pageSize,
            limit: page.pageSize,
            where: where,
            order: [['id', 'DESC']]
        }).then(result => {
            callBack(result);
        }).catch(err => {
            callBack(null, err);
        });
    } else {
        Task.findAll({
            where: where,
            order: [['id', 'DESC']]
        }).then(result => {
            callBack(result);
        }).catch(err => {
            callBack(null, err);
        });
    }
}