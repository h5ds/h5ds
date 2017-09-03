// test.js
var mysql = require('mysql');
var { dbConf } = require('../conf/conf');
 
exports.pool = mysql.createPool(dbConf);

// 分页
exports.pageSql = function (req) {
    let pageSize = parseInt(req.body.pageSize, 10);
    let pageNum = parseInt(req.body.pageNum, 10);
    return `LIMIT ${(pageNum - 1) * pageSize},${pageSize}`;
};