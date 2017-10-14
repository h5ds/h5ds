var Sequelize = require('sequelize');
var { sequelize } = require('../lib/mysql');

/**
 * @desc 保存数据到数据库
 * @param obj 请求参数 {key: xx, key2: xx}
 * @param table 表名
 * @param callBack 回调函数
*/
exports.createSQL = function ({
    obj = obj, 
    table = table, 
    callBack = callBack,
    sequeObj = { id: { type: Sequelize.INTEGER, primaryKey: true } }
}) {

    let Task = sequelize.define(table, sequeObj, {
        timestamps: false,
        freezeTableName: true
    });

    Task.create(obj)
    .then(result => {
        callBack(result);
    }).catch(err => {
        callBack(null, err);
    });
}