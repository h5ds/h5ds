var { result } = require('../lib/result');
var { createSQL } = require('../sql/createSQL');
var Sequelize = require('sequelize');
var sd = require('silly-datetime');
var { aesEncrypt } = require('../lib/md5');

exports.register = function(req, res) {

    // 验证
    if(!/^0?(13|15|18|14|17)[0-9]{9}$/.test(req.body.tel)) {
        result(req, res, {
            code: 500,
            data: ret,
            msg: "手机号错误",
            success: false
        });
        return;
    }

    // 验证码验证码
    if(req.session.code != req.body.code) {
        result(req, res, {
            code: 500,
            data: null,
            msg: "验证码错误！",
            success: false
        })
        return;
    }

    createSQL({
        obj: {
            tel: req.body.tel,
            password: aesEncrypt(req.body.password),
            updateTime: sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
        },
        sequeObj: {
            id: { type: Sequelize.INTEGER, primaryKey: true },
            username: { type: Sequelize.STRING },
            password: { type: Sequelize.STRING },
            email: { type: Sequelize.STRING },
            tel: { type: Sequelize.STRING },
            updateTime: { type: Sequelize.STRING},
            usertype: { type: Sequelize.INTEGER }
        },
        table: 'h5ds_user',
        callBack: function(ret) {
            console.log(ret);
            if(ret) {
                // // 自动登录一次
                // req.session.user = Object.assign({
                //     id: ret['null']
                // }, obj);
                // 返回值
                result(req, res, {
                    code: 200,
                    data: null,
                    msg: "成功！",
                    success: true
                });
            }else {
                result(req, res, {
                    code: 500,
                    data: ret,
                    msg: "用户名重复",
                    success: false
                });
            }
        }
    })

}