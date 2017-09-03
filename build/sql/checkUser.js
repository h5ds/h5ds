var { pool } = require('../lib/mysql');

exports.checkUser = function ( req, callBack ) {
    pool.getConnection(function(err, connection){
        if(err) {
            callBack(null, err);
            // throw err;
        }
        let param = [req.body.tel, req.body.password];
        connection.query('SELECT id,username,email,tel,usertype FROM `h5ds_user` WHERE `tel`=? AND `password`=?', param, function(err, result){
            if(err) {
                callBack(null, err);
                // throw err;
            } else {
                console.log('>>>>>', result);
                if(result.length !== 0) {
                    callBack(result);
                }else {
                    callBack(null);
                }
                
            }

            // 接下来connection已经无法使用，它已经被返回到连接池中
            connection.release();
        })
    });
}

/**
 * @desc 获取用户信息
*/
exports.getUserInfo = function (req, callBack) {
    pool.getConnection(function(err, connection){
        if(err) {
            callBack(null, err);
            // throw err;
        }
        connection.query('SELECT id,username,email,tel,usertype FROM `h5ds_user` WHERE `id`=?', req.session.user.id, function(err, result){
            if(err) {
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