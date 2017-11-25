var {
  result
} = require('../lib/result');
var {
  checkUser,
  getUserInfo
} = require('../sql/checkUser');

// 退出登录
exports.logout = function (req, res) {
  req.session.user = null;
  res.redirect('/');
  res.end();
}

exports.login = function (req, res) {

  // 验证码验证码
  // console.log(req.session.code);
  if (req.session.code != req.body.code) {
    result(req, res, {
      code: 500,
      data: null,
      msg: "验证码错误！",
      success: false
    })
    return;
  }

  // sql 验证登录
  checkUser(req, function (ret) {
    if (ret) {
      req.session.user = ret[0];
      result(req, res, {
        code: 200,
        data: ret[0],
        msg: "登录成功！",
        success: true
      });
    } else {
      // 返回值
      result(req, res, {
        code: 500,
        data: null,
        msg: "用户或密码不正确！",
        success: false
      })
    }
  });
}

/**
 * @desc 获取用户信息，维持session
 */
exports.getUser = function (req, res) {
  getUserInfo(req, ret => {
    // ret[0].password = null; // 不返回密码
    if (ret) {
      req.session.user = ret[0];
      result(req, res, {
        code: 200,
        data: ret[0],
        msg: "登录成功！",
        success: true
      });
    } else {
      // 返回值
      result(req, res, {
        code: 500,
        data: ret[0],
        msg: "手机或密码错误！",
        success: false
      })
    }
  });
}
