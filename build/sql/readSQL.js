var { pool, pageSql } = require('../lib/mysql');

/**
 * @desc 查询数据
 * @param req http请求
 * @param obj {name: xx, type: xx, owner: xx} 参数 name 是搜索名字，模糊匹配， type 是类型，可以是''
 * @param table 表名
 * @param page 是否分页 true/false
 * @param where 是否有条件 true/false
 * @param callBack 回调函数
*/
exports.readSQL = function (objs) {
    
    objs = Object.assign({
        obj: { name: '', type: '', owner: '' },
        like: false,
        where: false,
        page: {pageSize: 20, pageNum: 1},
        keys: '*', // keys 传入数组
        callBack: null 
    }, objs);

    let { req, obj, table, page, like, where, keys, callBack } = objs;

    pool.getConnection(function (err, connection) {
        if (err) {
            callBack(null, err);
            // throw err
            connection.release();
            return;
        }

        if(keys !== '*') {
            keys = `${keys.join(',')}`;
        }

        if(like) {
            where = true;
        }

        // SELECT * FROM table_name WHERE type='xx' AND owner='xx' AND name LIKE '%xx% LIMIT 1,20;
        // SELECT COUNT(*) FROM table_name;
        let idSql = obj.id ? ` id='${obj.id || ''}'` : '';
        let typeSql = obj.type ? ` AND type='${obj.type || ''}'` : '';
        let ownerSql = obj.owner ? ` AND owner='${obj.owner || ''}'` : '';
        let ownerWhere = obj.owner ? ` where owner=${obj.owner}` : '';
        let pages = page ? ` order by id desc ${pageSql(req)};SELECT COUNT(*) FROM ${table}${ownerWhere};` : '';
        let likeSql = like ? `name LIKE '%${obj.name || ''}%'${typeSql}` : '';
        let whereSql = where ? ' WHERE ' : ' ';
        let sqlStr = `SELECT ${keys} FROM ${table}${whereSql}${likeSql}${idSql}${typeSql}${ownerSql}${pages}`;

        // console.log(sqlStr);
        connection.query(sqlStr, function (err, result) {
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