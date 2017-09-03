var { pool, pageSql } = require('../lib/mysql');

/**
 * @desc 保存数据到数据库
 * @param obj 请求参数 {key: xx, key2: xx}
 * @param table 表名
 * @param callBack 回调函数
*/
exports.createSQL = function ({
    obj = obj, 
    table = table, 
    callBack = callBack
}) {
    pool.getConnection(function(err, connection) {
        if (err || !obj) {
            callBack(null, err);
            // throw err;
        }
        // let params = [obj.name, obj.url, '1000', 'png', obj.uid];
        let params = [];
        let keys = [];
        let marks = [];
        for(let key in obj) {
            params.push(obj[key]);
            marks.push('?');
            keys.push(key);
        }
        // console.log(`INSERT INTO ${table} (${keys.join(',')}) VALUES (${marks.join(',')});`);
        connection.query(`INSERT INTO ${table} (${keys.join(',')}) VALUES (${marks.join(',')});`, params, function(err, result) {
            // console.log(err, result)
            if (err) {
                callBack(null, err);
                // throw err;
            } else {
                callBack(result);
            }

            // 接下来connection已经无法使用，它已经被返回到连接池中
            connection.release();
        })
    });
}