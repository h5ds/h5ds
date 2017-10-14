var { upload, uploadBase64 } = require('./action/upload.js');
var { login, getUser, logout } = require('./action/login.js');
var { register } = require('./action/register.js');
var { authorize } = require('./lib/filter');
var { limitReq } = require('./lib/limitRequest');
var { getSysMp3 } = require('./action/sysMp3.js'); // mp3
var { getSysImgs, getSysImgTypes } = require('./action/sysImgs.js'); // 系统图片
var { getSysSvgs } = require('./action/sysSvgs.js'); // 系统svg
var { getSysTpls, getSysTplsTypes } = require('./action/sysTpls.js'); // 系统模板
var { getUserImgs, delUserImgs } = require('./action/userImgs.js'); // 用户图片
var { getUserTpls, delUserTpls, addUserTpls } = require('./action/userTpls.js'); // 用户模板
var { saveData } = require('./action/saveData.js'); // 保存app 
var { getUserApps, getUserApp, delApp, addData } = require('./action/userApp.js'); // 
var { imgCode } = require('./action/imgCode.js'); // 验证码

var { getH5 } = require('./action/getH5'); // SEO专用

// 路由
function router(app, express) {
    // 静态模块
    app.use('/assets', express.static('assets')); // 静态资源
    app.use('/upload', express.static('upload')); // 上传图片
    app.use('/json', express.static('json')); // 存放测试 json
    app.use('/mp3', express.static('mp3')); // 存放mp3
    app.use('/apps', express.static('apps')); // 存放app
    app.use('/images', express.static('images')); // 存放爬取的图片

    // 接口文件
    // app.get('/api/AESPassword', require('./action/AESPassword').AESPassword); // 更新所有的密码
    app.get('/api/imgCode', imgCode); // 验证码
    app.get('/api/logout', logout); // 退出
    app.post('/api/login', limitReq, login); // 登录
    app.post('/api/register', limitReq, register); // 注册

    app.post('/api/upload', authorize, upload); //上传图片
    app.post('/api/uploadBase64', authorize, uploadBase64); // base64 上传
    app.post('/api/getUser', authorize, getUser); // 获取用户信息

    // app.post('/api/getData', getData); // 获取app数据 @param: appid
    app.post('/api/getSysSvgs', authorize, getSysSvgs); // 获取系统svg素材 @param: type, key

    app.post('/api/getSysImgs', authorize, getSysImgs); // 获取系统图片素材 @param: type, key
    app.post('/api/getSysImgTypes', authorize, getSysImgTypes); // 获取系统图片素材分类

    app.post('/api/getUserImgs', authorize, getUserImgs); // 获取用户图片素材 @param: type
    app.post('/api/delUserImgs', authorize, delUserImgs); // 删除用户图片素材 @param: type

    app.post('/api/getMp3', authorize, getSysMp3); // 获取mp3素材 

    app.post('/api/getSysTpls', authorize, getSysTpls); // 获取系统模板素材 @param: type, key
    app.post('/api/getSysTplsTypes', authorize, getSysTplsTypes); // 获取系统模板分类

    app.post('/api/getUserTpls', authorize, getUserTpls); // 获取用户模板
    app.post('/api/delUserTpls', authorize, delUserTpls); // 删除用户模板
    app.post('/api/addUserTpls', authorize, addUserTpls); // 添加用户模板

    app.post('/api/getUserApp', authorize, getUserApp); // 获取用户app
    app.post('/api/getUserApps', authorize, getUserApps); // 获取用户app

    app.post('/api/saveData', authorize, saveData); // 保存APP @param: data
    app.post('/api/addData', authorize, limitReq, addData); // 添加APP @param: data
    app.post('/api/delApp', authorize, delApp); // 删除APP @param: data

    // url路由
    app.get('/', function (req, res) { res.sendfile('./tpl/index.html'); }); // 主页
    app.get('/h5', function (req, res) {
        getH5(req, res, function(data) {
            console.log(data);
            data = JSON.parse(data);
            res.render('h5.ejs', {
                list: data.rows,
                count: data.count
            });
        });
    }); // ui
    app.get('/ui', function (req, res) { res.sendfile('./tpl/ui.html'); }); // ui
    app.get('/login', function (req, res) { res.sendfile('./tpl/login.html'); }); // 登录
    app.get('/register', function (req, res) { res.sendfile('./tpl/register.html'); }); // 注册
    app.get('/help', function (req, res) { res.sendfile('./tpl/help.html'); }); // 帮助
    app.get('/plus', function (req, res) { res.sendfile('./tpl/plus.html'); }); // 插件
    app.get('/license', function (req, res) { res.sendfile('./tpl/license.html'); }); // 插件

    app.get('/case', authorize, function (req, res) { res.sendfile('./tpl/case.html'); }); // 案例
    app.get('/edit', authorize, function (req, res) { res.sendfile('./tpl/edit.html'); }); // 编辑器

    app.get('*', function (req, res) { res.sendfile('./tpl/404.html'); }); // 404

    return app;
}

module.exports = router;
// export default router;