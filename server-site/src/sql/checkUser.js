var Sequelize = require('sequelize');
var {
  sequelize
} = require('../lib/mysql');
var { crypto } = require('../common');

exports.checkUser = function (req, callBack) {

    var Task = sequelize.define('h5ds_user', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        username: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        tel: {
            type: Sequelize.STRING
        },
        usertype: {
            type: Sequelize.INTEGER
        }
    }, {
            timestamps: false,
            freezeTableName: true
        });

    Task.findAll({
        where: {
            tel: req.body.tel,
            password: crypto.aesEncrypt(req.body.password)
        }
    }).then(result => {
        if (result.length !== 0) {
            callBack(result);
        } else {
            callBack(null);
        }
    }).catch(err => {
        callBack(null, err);
    });

}

/**
 * @desc 获取用户信息
 */
exports.getUserInfo = function (req, callBack) {
    var Task = sequelize.define('h5ds_user', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        username: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        tel: {
            type: Sequelize.STRING
        },
        usertype: {
            type: Sequelize.INTEGER
        }
    }, {
            timestamps: false,
            freezeTableName: true
        });

    Task.findAll({
        where: {
            id: req.session.user.id
        }
    }).then(result => {
        callBack(result);
    }).catch(err => {
        callBack(null, err);
    });
}
