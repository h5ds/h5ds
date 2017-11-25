// 登录过滤
exports.authorize = function (req, res, next) {
  req.session.user = {
    id: 2,
    username: '',
    email: null,
    tel: '123',
    usertype: 0
  };
  next();
  // if (!req.session.user) {
  //     res.redirect('/login');
  // } else {
  //     next();
  // }
}
