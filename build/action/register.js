var { result } = require('../lib/result');
var { createSQL } = require('../sql/createSQL');

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
            email: req.body.email,
            password: req.body.password
        },
        table: 'h5ds_user',
        callBack: function(ret) {
            console.log('>>>>>>', ret);
            if(ret) {
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
                    msg: "邮箱重复",
                    success: false
                });
            }
        }
    })

}