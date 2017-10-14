/**
 * @desc 临时批量对密码进行AES加密，用过之后就没用了
*/
var Sequelize = require('sequelize');
var { sequelize } = require('../lib/mysql');
var { aesEncrypt } = require('../lib/md5');
var { result } = require('../lib/result');

var getUsers = function (Task) {
    return new Promise( (resolve, reject) => {
        Task.findAll().then(result => {
            resolve(result);
        }).catch(err => {
            resolve([]);
        });
    })
}

exports.AESPassword = function (req, res) {
    var Task = sequelize.define('h5ds_user', {
        id: { type: Sequelize.INTEGER, primaryKey: true },
        password: { type: Sequelize.STRING }
    }, {
        timestamps: false,
        freezeTableName: true
    });

    getUsers(Task).then(arr => {
        // 更新数据
        var i = 0;
        var updatePas = function (obj) {
            console.log('当前进度：', i / arr.length * 100 + '%', obj)
            if (!obj) {
                result(req, res, {
                    code: 200,
                    msg: "完成" + arr.length + '条数据',
                    success: false
                });
                return;
            }
            obj = obj.dataValues;
            Task.update({
                password: aesEncrypt(obj.password)
            }, {
                where: {
                    id: obj.id
                }
            }).then(result => {
                // next
                i++;
                updatePas(arr[i]);
            }).catch(err => {
                // next
                i++;
                updatePas(arr[i]);
            });
        }
        updatePas(arr[i]);

    });
}