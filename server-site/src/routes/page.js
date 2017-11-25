const router = new require('express').Router();
var { authorize } = require('../lib/filter');
const { pageBiz } = require('../bizs');

// url路由
router.get('/', pageBiz.renderIndex); // 主页
router.get('/h5', pageBiz.renderH5); // ui
router.get('/ui', pageBiz.renderUI); // ui
router.get('/login', pageBiz.renderLogin); // 登录
router.get('/register', pageBiz.renderRegister); // 注册
router.get('/help', pageBiz.renderHelp); // 帮助
router.get('/plus', pageBiz.renderPlugin); // 插件
router.get('/license', pageBiz.renderLicense); // 插件

router.get('/case', authorize, pageBiz.renderCase); // 案例
router.get('/edit', authorize, pageBiz.renderH5Editor); // 编辑器

router.get('*', pageBiz.renderNotFound); // 404

module.exports = {
    router
};
