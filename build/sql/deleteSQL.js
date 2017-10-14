var Sequelize = require('sequelize');
var { sequelize } = require('../lib/mysql');

/**
 * @desc 删除数据
 * @param req http请求
 * @param id 删除ID 这个方法只能通过ID删除
 * @param uid 删除用户ID 
 * @param table 表名
 * @param callBack 回调函数
*/
exports.deleteSQL = function ({
    req = req,
    id = id,
    table = table,
    callBack = callBack,
    sequeObj = { type: Sequelize.INTEGER, primaryKey: true }
}) {

    let Task = sequelize.define(table, sequeObj, {
        timestamps: false,
        freezeTableName: true
    });

    Task.destroy({
        where: {
            id: id,
            owner: req.session.user.id
        }
    }).then(result => {
        callBack(result);
    }).catch(err => {
        callBack(null, err);
    });

}