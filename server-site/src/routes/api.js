const router = require('express').Router();

var { upload, uploadBase64 } = require('../action/upload.js');
var { login, getUser, logout } = require('../action/login.js');
var { register } = require('../action/register.js');
var { authorize } = require('../lib/filter');
var { limitReq } = require('../lib/limitRequest');
var { getSysMp3 } = require('../action/sysMp3.js'); // mp3
var { getSysImgs, getSysImgTypes } = require('../action/sysImgs.js'); // 系统图片
var { getSysSvgs, getSysSvgTypes } = require('../action/sysSvgs.js'); // 系统svg
var { getSysTpls, getSysTplsTypes } = require('../action/sysTpls.js'); // 系统模板
var { getUserImgs, delUserImgs } = require('../action/userImgs.js'); // 用户图片
var { getUserTpls, delUserTpls, addUserTpls } = require('../action/userTpls.js'); // 用户模板
var { saveData } = require('../action/saveData.js'); // 保存app 
var { getUserApps, getUserApp, delApp, addData } = require('../action/userApp.js'); // 
var { imgCode } = require('../action/imgCode.js'); // 验证码

var { getH5 } = require('../action/getH5'); // SEO专用

  // 接口文件
  // router.get('/api/AESPassword', require('./action/AESPassword').AESPassword); // 更新所有的密码
  router.get('/api/imgCode', imgCode); // 验证码
  router.get('/api/logout', logout); // 退出
  router.post('/api/login', limitReq, login); // 登录
  router.post('/api/register', limitReq, register); // 注册

  router.post('/api/upload', authorize, upload); //上传图片
  router.post('/api/uploadBase64', authorize, uploadBase64); // base64 上传
  router.post('/api/getUser', authorize, getUser); // 获取用户信息

  // router.post('/api/getData', getData); // 获取app数据 @param: appid
  router.post('/api/getSysSvgs', authorize, getSysSvgs); // 获取系统svg素材 @param: type, key
  router.post('/api/getSysSvgTypes', authorize, getSysSvgTypes); // 获取系统svg素材 @param: type, key

  router.post('/api/getSysImgs', authorize, getSysImgs); // 获取系统图片素材 @param: type, key
  router.post('/api/getSysImgTypes', authorize, getSysImgTypes); // 获取系统图片素材分类

  router.post('/api/getUserImgs', authorize, getUserImgs); // 获取用户图片素材 @param: type
  router.post('/api/delUserImgs', authorize, delUserImgs); // 删除用户图片素材 @param: type

  router.post('/api/getMp3', authorize, getSysMp3); // 获取mp3素材 

  router.post('/api/getSysTpls', authorize, getSysTpls); // 获取系统模板素材 @param: type, key
  router.post('/api/getSysTplsTypes', authorize, getSysTplsTypes); // 获取系统模板分类

  router.post('/api/getUserTpls', authorize, getUserTpls); // 获取用户模板
  router.post('/api/delUserTpls', authorize, delUserTpls); // 删除用户模板
  router.post('/api/addUserTpls', authorize, addUserTpls); // 添加用户模板

  router.post('/api/getUserApp', authorize, getUserApp); // 获取用户app
  router.post('/api/getUserApps', authorize, getUserApps); // 获取用户app

  router.post('/api/saveData', authorize, saveData); // 保存APP @param: data
  router.post('/api/addData', authorize, limitReq, addData); // 添加APP @param: data
  router.post('/api/delApp', authorize, delApp); // 删除APP @param: data

module.exports = {
    router
};
