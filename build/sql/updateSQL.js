var Sequelize = require('sequelize');
var { sequelize } = require('../lib/mysql');

/**
 * @desc 查询数据
 * @param req http请求
 * @param obj {name: xx, type: xx, owner: xx} 参数 name 是搜索名字，模糊匹配， type 是类型，可以是''
 * @param table 表名
 * @param where 是否有条件 true/false
 * @param callBack 回调函数
*/
exports.updateSQL = function (table, sequeObj, obj, where, callBack) {

    sequelize.define(table, sequeObj, {
        timestamps: false,
        freezeTableName: true
    }).update(obj, {
        where: where
    }).then(result => {
        callBack(result);
    }).catch(err => {
        callBack(null, err);
    });
}