var { result } = require('./result');

// 限制条件
exports.limitReq = function (req, res, next) {

    var newTime = +new Date();
    var oldTime = req.session.times || 0;
    req.session.times = newTime; // 设置当前值
    newTime -= oldTime;
    // 如果3000内频繁去请求接口，就会提示太频繁了，请稍后再试
    if (newTime < 1000) {
        result(req, res, {
            code: 500,
            data: null,
            msg: "您请求太频繁了,休息一会儿！",
            success: false
        });
    } else {
        next();
    }
}