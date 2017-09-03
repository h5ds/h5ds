var { pool, pageSql } = require('../lib/mysql');

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
    uid = uid,
    table = table,
    callBack = callBack
}) {
    pool.getConnection(function (err, connection) {
        if (err) {
            callBack(null, err);
            connection.release();
            return;
            // throw err;
        }
        // id 不能为空
        if (!id && !uid) {
            console.error('没有登录');
            callBack(null);
            connection.release();
            return;
        }

        let params = [id, uid];
        connection.query('DELETE FROM ' + table + ' WHERE `id`=? AND `owner`=?', params, function (err, result) {
            if (err) {
                callBack(null, err);
            } else {
                callBack(result);
            }
            // 接下来connection已经无法使用，它已经被返回到连接池中
            connection.release();
        })
    });
}