// 登录过滤
exports.authorize = function (req, res, next) {
    req.session.user = {id: 1};
    next();
    // if (!req.session.user) {
    //     res.redirect('/login');
    // } else {
    //     next();
    // }
}