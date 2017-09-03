var { pool } = require('../lib/mysql');

/**
 * @desc 查询数据
 * @param req http请求
 * @param obj {name: xx, type: xx, owner: xx} 参数 name 是搜索名字，模糊匹配， type 是类型，可以是''
 * @param table 表名
 * @param page 是否分页 true/false
 * @param where 是否有条件 true/false
 * @param callBack 回调函数
*/
exports.updateSQL = function (table, obj, where, callBack) {
    pool.getConnection(function (err, connection) {
        if (err) {
            callBack(null, err);
            // throw err;
            connection.release();
            return;
        }

        let params = [];
        let marks = [];
        for(let key in obj) {
            params.push(obj[key]);
            marks.push(`${key}=?`);
        }

        let marks2 = [];
        for(let key in where) {
            marks2.push(`${key}=?`);
            params.push(where[key]);
        }

        // UPDATE h5ds_apps SET a=?,b=? WHERE id=?;
        // console.log(`UPDATE ${table} SET ${marks.join(',')} WHERE ${marks2.join(' AND ')};`)
        connection.query(`UPDATE ${table} SET ${marks.join(',')} WHERE ${marks2.join(' AND ')};`, params, function (err, result) {
            if (err) {
                callBack(null, err);
                // throw err
            } else {
                callBack(result);
            }

            // 接下来connection已经无法使用，它已经被返回到连接池中
            connection.release();
        })
    });
}