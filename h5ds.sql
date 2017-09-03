/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50625
Source Host           : localhost:3306
Source Database       : h5ds

Target Server Type    : MYSQL
Target Server Version : 50625
File Encoding         : 65001

Date: 2017-09-04 00:18:51
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for `h5ds_apps`
-- ----------------------------
DROP TABLE IF EXISTS `h5ds_apps`;
CREATE TABLE `h5ds_apps` (
  `id` int(50) NOT NULL AUTO_INCREMENT,
  `owner` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL COMMENT 'app名字',
  `url` varchar(255) DEFAULT NULL COMMENT 'app链接地址',
  `pic` varchar(255) DEFAULT NULL COMMENT 'app 主图',
  `des` varchar(255) DEFAULT NULL COMMENT '描述信息',
  `date` varchar(100) DEFAULT NULL COMMENT '日期',
  `data` longtext NOT NULL COMMENT 'app json数据',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8 COMMENT='用户的APP';

-- ----------------------------
-- Records of h5ds_apps
-- ----------------------------
INSERT INTO `h5ds_apps` VALUES ('1', '1', '我的APP应用', '/apps/1/1/index.html', '/upload\\upload_c784635aa2887ecc308a46fb9a653013.jpg', 'APP的描述信息！', '2017/08/25 02:56', '{\"name\":\"我的APP应用\",\"info\":\"APP的描述信息！\",\"img\":\"/upload\\\\upload_c784635aa2887ecc308a46fb9a653013.jpg\",\"mp3\":{\"name\":\"李玉刚 - 刚好遇见你\",\"url\":\"/mp3/李玉刚 - 刚好遇见你.mp3\"},\"loading\":\"1\",\"slider\":{\"animate\":1,\"lock\":false,\"autoplay\":false,\"time\":5},\"style\":{\"background-image\":\"/upload/upload_c784635aa2887ecc308a46fb9a653013.jpg\",\"background-color\":\"initial\",\"background-repeat\":\"no-repeat\",\"background-size\":\"cover\"},\"pagesize\":2,\"pages\":[{\"name\":\"空白页面\",\"style\":{\"background-color\":\"rgba(255,0,128,0.33)\"},\"layers\":[{\"animate\":[{\"name\":\"slideInLeft\",\"type\":\"em\",\"style\":\"slideInLeft 2s ease 0s 1 normal forwards running\"}],\"data\":{\"data\":\"\\n                \\n                <div>成都FCC 技术分享大会</div><div>2017-08-27</div>\\n            \\n            \",\"fontStyle\":\"text-align: center; font-weight: bolder; color: rgb(255, 255, 255); font-size: 24px;\"},\"estyle\":{},\"style\":{\"width\":\"281px\",\"height\":\"68px\",\"top\":\"130px\",\"left\":\"22px\",\"zIndex\":9999,\"z-index\":9999},\"ue\":null,\"type\":\"text\",\"typename\":\"文本\"},{\"animate\":[{\"name\":\"flipInY\",\"type\":\"em\",\"style\":\"flipInY 1s ease 1s 1 normal forwards running\"},{\"name\":\"fade in\",\"type\":\"in\",\"style\":\"fadeIn 0s ease 1s 1 normal forwards running\"}],\"data\":{\"data\":\"\\n                \\n                <div>HTML5 Design Software</div><div><br></div><div>中文：点石H5</div><div><br></div><div>主讲：董涛</div>\\n            \\n            \",\"fontStyle\":\"color: rgb(255, 255, 0); font-weight: bolder; font-size: 13px; text-align: left;\"},\"estyle\":{\"background-color\":\"rgba(255,128,0,0.27)\",\"opacity\":\"0.00\"},\"style\":{\"width\":\"200px\",\"height\":\"90px\",\"top\":\"210px\",\"left\":\"68px\",\"zIndex\":9999,\"z-index\":9998},\"ue\":null,\"type\":\"text\",\"typename\":\"文本\"},{\"animate\":[{\"name\":\"tada\",\"type\":\"em\",\"style\":\"tada 31s ease 0s 24 normal forwards running\"}],\"data\":{\"src\":\"/upload/upload_8c6643ab11cc4898421e4bc390f22fdf.png\"},\"estyle\":{\"opacity\":\"0.60\"},\"style\":{\"width\":\"520px\",\"height\":\"582px\",\"top\":\"-69px\",\"left\":\"-111px\",\"z-index\":9997},\"type\":\"img\",\"color\":\"none\",\"ue\":null,\"typename\":\"图片\"}],\"slider\":{\"animate\":1,\"autoplay\":false,\"lock\":false,\"time\":5},\"index\":0},{\"name\":\"空白页面\",\"style\":{\"background-color\":\"rgba(0,128,255,0.33)\"},\"layers\":[{\"animate\":[{\"name\":\"zoomInDown\",\"type\":\"em\",\"style\":\"zoomInDown 2s ease 1s 1 normal forwards running\"},{\"name\":\"fade in\",\"type\":\"em\",\"style\":\"fadeIn 1s ease 2s 1 normal forwards running\"}],\"data\":{\"data\":\"\\n                \\n                \\n                \\n                \\n                <div><br></div><div>一次改变<br></div><div>世界的机会</div>\\n            \\n            \\n            \\n            \\n            \",\"fontStyle\":\"text-align: center; font-weight: bolder; color: rgb(255, 255, 255); font-size: 24px;\"},\"estyle\":{\"opacity\":\"0.00\"},\"style\":{\"width\":\"281px\",\"height\":\"120px\",\"top\":\"125px\",\"left\":\"18px\",\"zIndex\":9999,\"z-index\":9999},\"ue\":null,\"type\":\"text\",\"typename\":\"文本\"},{\"animate\":[{\"name\":\"fade in\",\"type\":\"em\",\"style\":\"fadeIn 1s ease 0s 1 normal forwards running\"},{\"name\":\"roll one\",\"type\":\"em\",\"style\":\"rollOneCount 10s linear 0s 9999 normal forwards running\"}],\"data\":{\"data\":\"\\n                \\n                <div><br></div>\\n            \\n            \",\"fontStyle\":\"letter-spacing: 0px;\"},\"estyle\":{\"background-color\":\"rgba(255,128,0,0.29)\",\"border-radius\":\"140px\",\"border\":\"10px dotted rgba(255,255,0,0.60)\"},\"style\":{\"width\":\"200px\",\"height\":\"200px\",\"top\":\"92px\",\"left\":\"59px\",\"zIndex\":9999,\"z-index\":9998},\"ue\":null,\"type\":\"text\",\"typename\":\"文本\"}],\"slider\":{\"animate\":1,\"autoplay\":false,\"lock\":false,\"time\":5},\"index\":1},{\"name\":\"空白页面\",\"style\":{\"background-color\":\"rgba(255,0,128,0.33)\"},\"layers\":[{\"animate\":[{\"name\":\"zoomInDown\",\"type\":\"em\",\"style\":\"zoomInDown 2s ease 1s 1 normal forwards running\"},{\"name\":\"fade in\",\"type\":\"em\",\"style\":\"fadeIn 1s ease 2s 1 normal forwards running\"}],\"data\":{\"data\":\"\\n                \\n                \\n                \\n                \\n                \\n                \\n                <div><br></div><div>一次H5市场</div><div>的革命</div>\\n            \\n            \\n            \\n            \\n            \\n            \\n            \",\"fontStyle\":\"text-align: center; font-weight: bolder; color: rgb(255, 255, 255); font-size: 24px;\"},\"estyle\":{\"opacity\":\"0.00\"},\"style\":{\"width\":\"281px\",\"height\":\"120px\",\"top\":\"125px\",\"left\":\"18px\",\"zIndex\":9999,\"z-index\":9999},\"ue\":null,\"type\":\"text\",\"typename\":\"文本\"},{\"animate\":[{\"name\":\"fade in\",\"type\":\"em\",\"style\":\"fadeIn 1s ease 0s 1 normal forwards running\"},{\"name\":\"roll one\",\"type\":\"em\",\"style\":\"rollOneCount 10s linear 0s 9999 normal forwards running\"}],\"data\":{\"data\":\"\\n                \\n                <div><br></div>\\n            \\n            \",\"fontStyle\":\"letter-spacing: 0px;\"},\"estyle\":{\"background-color\":\"rgba(255,128,0,0.29)\",\"border-radius\":\"140px\",\"border\":\"10px dotted rgba(0,255,255,0.60)\"},\"style\":{\"width\":\"200px\",\"height\":\"200px\",\"top\":\"92px\",\"left\":\"59px\",\"zIndex\":9999,\"z-index\":9998},\"ue\":null,\"type\":\"text\",\"typename\":\"文本\"}],\"slider\":{\"animate\":1,\"autoplay\":false,\"lock\":false,\"time\":5},\"index\":2},{\"name\":\"空白页面\",\"style\":{\"background-color\":\"rgba(128,0,255,0.33)\"},\"layers\":[{\"animate\":[{\"name\":\"zoomInDown\",\"type\":\"em\",\"style\":\"zoomInDown 2s ease 1s 1 normal forwards running\"},{\"name\":\"fadeIn\",\"type\":\"em\",\"style\":\"fadeIn 1s ease 2s 1 normal forwards running\"}],\"data\":{\"data\":\"\\n                \\n                \\n                \\n                \\n                \\n                \\n                \\n                <div><br></div><div>程序员</div><div>用工具改变世界</div>\\n            \\n            \\n            \\n            \\n            \\n            \\n            \\n            \",\"fontStyle\":\"text-align: center; font-weight: bolder; color: rgb(255, 255, 255); font-size: 24px;\"},\"estyle\":{\"opacity\":\"0.00\"},\"style\":{\"width\":\"281px\",\"height\":\"120px\",\"top\":\"125px\",\"left\":\"18px\",\"zIndex\":9999,\"z-index\":9999},\"ue\":null,\"type\":\"text\",\"typename\":\"文本\"},{\"animate\":[{\"name\":\"fade in\",\"type\":\"em\",\"style\":\"fadeIn 1s ease 0s 1 normal forwards running\"},{\"name\":\"roll one\",\"type\":\"em\",\"style\":\"rollOneCount 10s linear 0s 9999 normal forwards running\"}],\"data\":{\"data\":\"\\n                \\n                <div><br></div>\\n            \\n            \",\"fontStyle\":\"letter-spacing: 0px;\"},\"estyle\":{\"background-color\":\"rgba(255,128,0,0.29)\",\"border-radius\":\"140px\",\"border\":\"10px dotted rgba(255,0,0,0.60)\"},\"style\":{\"width\":\"200px\",\"height\":\"200px\",\"top\":\"92px\",\"left\":\"59px\",\"zIndex\":9999,\"z-index\":9998},\"ue\":null,\"type\":\"text\",\"typename\":\"文本\"}],\"slider\":{\"animate\":1,\"autoplay\":false,\"lock\":false,\"time\":5},\"index\":3}]}');
INSERT INTO `h5ds_apps` VALUES ('22', '1', '点石H5', null, '/assets/images/app.png', '点石H5，官方网站h5ds.com', '2017/08/25 11:40:18', '{\"img\":\"/assets/images/app.png\",\"info\":\"点石H5，官方网站h5ds.com\",\"loading\":\"1\",\"mp3\":{\"name\":\"\",\"url\":\"\"},\"name\":\"点石H5\",\"pages\":[],\"pagesize\":0,\"slider\":{\"animate\":1,\"lock\":false,\"autoplay\":false,\"time\":5},\"style\":{\"background-image\":\"\",\"background-color\":\"\",\"background-repeat\":\"\",\"background-size\":\"\"}}');
INSERT INTO `h5ds_apps` VALUES ('27', '1', '点石H5', null, '/assets/images/app.png', '点石H5，官方网站h5ds.com', '2017/08/25 11:40:19', '{\"img\":\"/assets/images/app.png\",\"info\":\"点石H5，官方网站h5ds.com\",\"loading\":\"1\",\"mp3\":{\"name\":\"\",\"url\":\"\"},\"name\":\"点石H5\",\"pages\":[],\"pagesize\":0,\"slider\":{\"animate\":1,\"lock\":false,\"autoplay\":false,\"time\":5},\"style\":{\"background-image\":\"\",\"background-color\":\"\",\"background-repeat\":\"\",\"background-size\":\"\"}}');
INSERT INTO `h5ds_apps` VALUES ('28', '1', '点石H5', null, '/assets/images/app.png', '点石H5，官方网站h5ds.com', '2017/08/25 11:40:19', '{\"img\":\"/assets/images/app.png\",\"info\":\"点石H5，官方网站h5ds.com\",\"loading\":\"1\",\"mp3\":{\"name\":\"\",\"url\":\"\"},\"name\":\"点石H5\",\"pages\":[],\"pagesize\":0,\"slider\":{\"animate\":1,\"lock\":false,\"autoplay\":false,\"time\":5},\"style\":{\"background-image\":\"\",\"background-color\":\"\",\"background-repeat\":\"\",\"background-size\":\"\"}}');
INSERT INTO `h5ds_apps` VALUES ('30', '1', '点石H5', null, '/assets/images/app.png', '点石H5，官方网站h5ds.com', '2017/08/25 11:40:20', '{\"img\":\"/assets/images/app.png\",\"info\":\"点石H5，官方网站h5ds.com\",\"loading\":\"1\",\"mp3\":{\"name\":\"\",\"url\":\"\"},\"name\":\"点石H5\",\"pages\":[],\"pagesize\":0,\"slider\":{\"animate\":1,\"lock\":false,\"autoplay\":false,\"time\":5},\"style\":{\"background-image\":\"\",\"background-color\":\"\",\"background-repeat\":\"\",\"background-size\":\"\"}}');
INSERT INTO `h5ds_apps` VALUES ('31', '1', '点石H5', null, '/assets/images/app.png', '点石H5，官方网站h5ds.com', '2017/08/25 11:40:20', '{\"img\":\"/assets/images/app.png\",\"info\":\"点石H5，官方网站h5ds.com\",\"loading\":\"1\",\"mp3\":{\"name\":\"\",\"url\":\"\"},\"name\":\"点石H5\",\"pages\":[],\"pagesize\":0,\"slider\":{\"animate\":1,\"lock\":false,\"autoplay\":false,\"time\":5},\"style\":{\"background-image\":\"\",\"background-color\":\"\",\"background-repeat\":\"\",\"background-size\":\"\"}}');
INSERT INTO `h5ds_apps` VALUES ('32', '1', '点石H5', null, '/assets/images/app.png', '点石H5，官方网站h5ds.com', '2017/08/25 11:40:20', '{\"img\":\"/assets/images/app.png\",\"info\":\"点石H5，官方网站h5ds.com\",\"loading\":\"1\",\"mp3\":{\"name\":\"\",\"url\":\"\"},\"name\":\"点石H5\",\"pages\":[],\"pagesize\":0,\"slider\":{\"animate\":1,\"lock\":false,\"autoplay\":false,\"time\":5},\"style\":{\"background-image\":\"\",\"background-color\":\"\",\"background-repeat\":\"\",\"background-size\":\"\"}}');
INSERT INTO `h5ds_apps` VALUES ('33', '1', '点石H5', null, '/assets/images/app.png', '点石H5，官方网站h5ds.com', '2017/08/25 11:40:21', '{\"img\":\"/assets/images/app.png\",\"info\":\"点石H5，官方网站h5ds.com\",\"loading\":\"1\",\"mp3\":{\"name\":\"\",\"url\":\"\"},\"name\":\"点石H5\",\"pages\":[],\"pagesize\":0,\"slider\":{\"animate\":1,\"lock\":false,\"autoplay\":false,\"time\":5},\"style\":{\"background-image\":\"\",\"background-color\":\"\",\"background-repeat\":\"\",\"background-size\":\"\"}}');
INSERT INTO `h5ds_apps` VALUES ('45', '1', '点石H5', '/apps/1/45/index.html', '/upload\\upload_eca212a2325bdd0e9c7baa487316d93c.jpg', '点石H5，官方网站h5ds.com', '2017/08/25 13:51:51', '{\"img\":\"/upload\\\\upload_eca212a2325bdd0e9c7baa487316d93c.jpg\",\"info\":\"点石H5，官方网站h5ds.com\",\"loading\":\"1\",\"mp3\":{\"name\":\"\",\"url\":\"\"},\"name\":\"点石H5\",\"pages\":[{\"name\":\"空白页面\",\"style\":{\"background-color\":\"rgba(255,0,128,0.33)\"},\"layers\":[{\"animate\":[{\"name\":\"slideInLeft\",\"type\":\"em\",\"style\":\"slideInLeft 2s ease 0s 1 normal forwards running\"}],\"data\":{\"data\":\"\\n                \\n                <div>成都FCC 技术分享大会</div><div>2017-08-27</div>\\n            \\n            \",\"fontStyle\":\"text-align: center; font-weight: bolder; color: rgb(255, 255, 255); font-size: 24px;\"},\"estyle\":{},\"style\":{\"width\":\"281px\",\"height\":\"68px\",\"top\":\"130px\",\"left\":\"22px\",\"zIndex\":9999,\"z-index\":9999},\"ue\":null,\"type\":\"text\",\"typename\":\"文本\"},{\"animate\":[{\"name\":\"flipInY\",\"type\":\"em\",\"style\":\"flipInY 1s ease 1s 1 normal forwards running\"},{\"name\":\"fade in\",\"type\":\"in\",\"style\":\"fadeIn 1s ease 2s 1 normal forwards running\"}],\"data\":{\"data\":\"\\n                \\n                <div>HTML5 Design Software</div><div><br></div><div>中文：点石H5</div><div><br></div><div>主讲：董涛</div>\\n            \\n            \",\"fontStyle\":\"color: rgb(255, 255, 0); font-weight: bolder; font-size: 13px; text-align: left;\"},\"estyle\":{\"background-color\":\"rgba(255,128,0,0.27)\",\"opacity\":\"0.00\"},\"style\":{\"width\":\"200px\",\"height\":\"90px\",\"top\":\"210px\",\"left\":\"68px\",\"zIndex\":9999,\"z-index\":9998},\"ue\":null,\"type\":\"text\",\"typename\":\"文本\"},{\"animate\":[{\"name\":\"tada\",\"type\":\"em\",\"style\":\"tada 31s ease 0s 24 normal forwards running\"}],\"data\":{\"src\":\"/upload/upload_8c6643ab11cc4898421e4bc390f22fdf.png\"},\"estyle\":{\"opacity\":\"0.60\"},\"style\":{\"width\":\"520px\",\"height\":\"582px\",\"top\":\"-69px\",\"left\":\"-111px\",\"z-index\":9997},\"type\":\"img\",\"color\":\"none\",\"ue\":null,\"typename\":\"图片\"}],\"slider\":{\"animate\":1,\"autoplay\":false,\"lock\":false,\"time\":5},\"index\":0},{\"name\":\"空白页面\",\"style\":{\"background-color\":\"rgba(0,128,64,0.33)\"},\"layers\":[{\"animate\":[{\"name\":\"zoomInDown\",\"type\":\"em\",\"style\":\"zoomInDown 2s ease 1s 1 normal forwards running\"},{\"name\":\"fade in\",\"type\":\"em\",\"style\":\"fadeIn 1s ease 2s 1 normal forwards running\"}],\"data\":{\"data\":\"\\n                \\n                \\n                \\n                \\n                \\n                \\n                <div><br></div><div>一次H5市场</div><div>的革命</div>\\n            \\n            \\n            \\n            \\n            \\n            \\n            \",\"fontStyle\":\"text-align: center; font-weight: bolder; color: rgb(255, 255, 255); font-size: 24px;\"},\"estyle\":{\"opacity\":\"0.00\"},\"style\":{\"width\":\"281px\",\"height\":\"120px\",\"top\":\"125px\",\"left\":\"18px\",\"zIndex\":9999,\"z-index\":9999},\"ue\":null,\"type\":\"text\",\"typename\":\"文本\"},{\"animate\":[{\"name\":\"fade in\",\"type\":\"em\",\"style\":\"fadeIn 1s ease 0s 1 normal forwards running\"},{\"name\":\"roll one\",\"type\":\"em\",\"style\":\"rollOneCount 10s linear 0s 9999 normal forwards running\"}],\"data\":{\"data\":\"\\n                \\n                <div><br></div>\\n            \\n            \",\"fontStyle\":\"letter-spacing: 0px;\"},\"estyle\":{\"background-color\":\"rgba(255,128,0,0.29)\",\"border-radius\":\"140px\",\"border\":\"10px dotted rgba(0,255,255,0.60)\"},\"style\":{\"width\":\"200px\",\"height\":\"200px\",\"top\":\"92px\",\"left\":\"59px\",\"zIndex\":9999,\"z-index\":9998},\"ue\":null,\"type\":\"text\",\"typename\":\"文本\"}],\"slider\":{\"animate\":1,\"autoplay\":false,\"lock\":false,\"time\":5},\"index\":1}],\"pagesize\":0,\"slider\":{\"animate\":1,\"lock\":false,\"autoplay\":false,\"time\":5},\"style\":{\"background-image\":\"/upload/upload_c784635aa2887ecc308a46fb9a653013.jpg\",\"background-color\":\"\",\"background-repeat\":\"\",\"background-size\":\"\"}}');
INSERT INTO `h5ds_apps` VALUES ('46', '1', '点石H5', null, '/assets/images/app.png', '点石H5，官方网站h5ds.com', '2017/08/25 14:07:27', '{\"img\":\"/assets/images/app.png\",\"info\":\"点石H5，官方网站h5ds.com\",\"loading\":\"1\",\"mp3\":{\"name\":\"\",\"url\":\"\"},\"name\":\"点石H5\",\"pages\":[],\"pagesize\":0,\"slider\":{\"animate\":1,\"lock\":false,\"autoplay\":false,\"time\":5},\"style\":{\"background-image\":\"\",\"background-color\":\"\",\"background-repeat\":\"\",\"background-size\":\"\"}}');
INSERT INTO `h5ds_apps` VALUES ('47', '1', '点石H5', null, '/assets/images/app.png', '点石H5，官方网站h5ds.com', '2017/08/25 14:07:30', '{\"img\":\"/assets/images/app.png\",\"info\":\"点石H5，官方网站h5ds.com\",\"loading\":\"1\",\"mp3\":{\"name\":\"\",\"url\":\"\"},\"name\":\"点石H5\",\"pages\":[],\"pagesize\":0,\"slider\":{\"animate\":1,\"lock\":false,\"autoplay\":false,\"time\":5},\"style\":{\"background-image\":\"\",\"background-color\":\"\",\"background-repeat\":\"\",\"background-size\":\"\"}}');
INSERT INTO `h5ds_apps` VALUES ('48', '1', '点石H5', null, '/assets/images/app.png', '点石H5，官方网站h5ds.com', '2017/08/25 14:07:31', '{\"img\":\"/assets/images/app.png\",\"info\":\"点石H5，官方网站h5ds.com\",\"loading\":\"1\",\"mp3\":{\"name\":\"\",\"url\":\"\"},\"name\":\"点石H5\",\"pages\":[],\"pagesize\":0,\"slider\":{\"animate\":1,\"lock\":false,\"autoplay\":false,\"time\":5},\"style\":{\"background-image\":\"\",\"background-color\":\"\",\"background-repeat\":\"\",\"background-size\":\"\"}}');
INSERT INTO `h5ds_apps` VALUES ('49', '1', '点石H5', null, '/assets/images/app.png', '点石H5，官方网站h5ds.com', '2017/08/25 14:09:19', '{\"img\":\"/assets/images/app.png\",\"info\":\"点石H5，官方网站h5ds.com\",\"loading\":\"1\",\"mp3\":{\"name\":\"\",\"url\":\"\"},\"name\":\"点石H5\",\"pages\":[],\"pagesize\":0,\"slider\":{\"animate\":1,\"lock\":false,\"autoplay\":false,\"time\":5},\"style\":{\"background-image\":\"\",\"background-color\":\"\",\"background-repeat\":\"\",\"background-size\":\"\"}}');
INSERT INTO `h5ds_apps` VALUES ('50', '1', '点石H5', null, '/assets/images/app.png', '点石H5，官方网站h5ds.com', '2017/08/25 14:09:22', '{\"img\":\"/assets/images/app.png\",\"info\":\"点石H5，官方网站h5ds.com\",\"loading\":\"1\",\"mp3\":{\"name\":\"\",\"url\":\"\"},\"name\":\"点石H5\",\"pages\":[],\"pagesize\":0,\"slider\":{\"animate\":1,\"lock\":false,\"autoplay\":false,\"time\":5},\"style\":{\"background-image\":\"\",\"background-color\":\"\",\"background-repeat\":\"\",\"background-size\":\"\"}}');
INSERT INTO `h5ds_apps` VALUES ('51', '1', '点石H5', null, '/assets/images/app.png', '点石H5，官方网站h5ds.com', '2017/08/25 14:09:25', '{\"img\":\"/assets/images/app.png\",\"info\":\"点石H5，官方网站h5ds.com\",\"loading\":\"1\",\"mp3\":{\"name\":\"\",\"url\":\"\"},\"name\":\"点石H5\",\"pages\":[],\"pagesize\":0,\"slider\":{\"animate\":1,\"lock\":false,\"autoplay\":false,\"time\":5},\"style\":{\"background-image\":\"\",\"background-color\":\"\",\"background-repeat\":\"\",\"background-size\":\"\"}}');
INSERT INTO `h5ds_apps` VALUES ('52', '1', '点石H5', null, '/assets/images/app.png', '点石H5，官方网站h5ds.com', '2017/08/25 14:13:35', '{\"img\":\"/assets/images/app.png\",\"info\":\"点石H5，官方网站h5ds.com\",\"loading\":\"1\",\"mp3\":{\"name\":\"\",\"url\":\"\"},\"name\":\"点石H5\",\"pages\":[],\"pagesize\":0,\"slider\":{\"animate\":1,\"lock\":false,\"autoplay\":false,\"time\":5},\"style\":{\"background-image\":\"\",\"background-color\":\"\",\"background-repeat\":\"\",\"background-size\":\"\"}}');
INSERT INTO `h5ds_apps` VALUES ('53', '1', '点石H5', null, '/assets/images/app.png', '点石H5，官方网站h5ds.com', '2017/08/25 14:13:48', '{\"img\":\"/assets/images/app.png\",\"info\":\"点石H5，官方网站h5ds.com\",\"loading\":\"1\",\"mp3\":{\"name\":\"\",\"url\":\"\"},\"name\":\"点石H5\",\"pages\":[],\"pagesize\":0,\"slider\":{\"animate\":1,\"lock\":false,\"autoplay\":false,\"time\":5},\"style\":{\"background-image\":\"\",\"background-color\":\"\",\"background-repeat\":\"\",\"background-size\":\"\"}}');
INSERT INTO `h5ds_apps` VALUES ('54', '1', '点石H5', '/apps/1/54/index.html', '/assets/images/app.png', '点石H5，官方网站h5ds.com', '2017/08/25 18:56:28', '{\"img\":\"/assets/images/app.png\",\"info\":\"点石H5，官方网站h5ds.com\",\"loading\":\"1\",\"mp3\":{\"name\":\"\",\"url\":\"\"},\"name\":\"点石H5\",\"pages\":[{\"name\":\"空白页面\",\"style\":{\"background-color\":\"rgba(255,0,128,0.33)\"},\"layers\":[{\"animate\":[{\"name\":\"slideInLeft\",\"type\":\"em\",\"style\":\"slideInLeft 2s ease 0s 1 normal forwards running\"}],\"data\":{\"data\":\"\\n                \\n                <div>成都FCC 技术分享大会</div><div>2017-08-27</div>\\n            \\n            \",\"fontStyle\":\"text-align: center; font-weight: bolder; color: rgb(255, 255, 255); font-size: 24px;\"},\"estyle\":{},\"style\":{\"width\":\"281px\",\"height\":\"68px\",\"top\":\"130px\",\"left\":\"22px\",\"zIndex\":9999,\"z-index\":9999},\"ue\":null,\"type\":\"text\",\"typename\":\"文本\"},{\"animate\":[{\"name\":\"flipInY\",\"type\":\"em\",\"style\":\"flipInY 1s ease 1s 1 normal forwards running\"},{\"name\":\"fade in\",\"type\":\"in\",\"style\":\"fadeIn 1s ease 2s 1 normal forwards running\"}],\"data\":{\"data\":\"\\n                \\n                <div>HTML5 Design Software</div><div><br></div><div>中文：点石H5</div><div><br></div><div>主讲：董涛</div>\\n            \\n            \",\"fontStyle\":\"color: rgb(255, 255, 0); font-weight: bolder; font-size: 13px; text-align: left;\"},\"estyle\":{\"background-color\":\"rgba(255,128,0,0.27)\",\"opacity\":\"0.00\"},\"style\":{\"width\":\"200px\",\"height\":\"90px\",\"top\":\"210px\",\"left\":\"68px\",\"zIndex\":9999,\"z-index\":9998},\"ue\":null,\"type\":\"text\",\"typename\":\"文本\"},{\"animate\":[{\"name\":\"tada\",\"type\":\"em\",\"style\":\"tada 31s ease 0s 24 normal forwards running\"}],\"data\":{\"src\":\"/upload/upload_8c6643ab11cc4898421e4bc390f22fdf.png\"},\"estyle\":{\"opacity\":\"0.60\"},\"style\":{\"width\":\"520px\",\"height\":\"582px\",\"top\":\"-69px\",\"left\":\"-111px\",\"z-index\":9997},\"type\":\"img\",\"color\":\"none\",\"ue\":null,\"typename\":\"图片\"}],\"slider\":{\"animate\":1,\"autoplay\":false,\"lock\":false,\"time\":5},\"index\":0},{\"name\":\"空白页面\",\"style\":{\"background-color\":\"rgba(0,128,128,0.35)\"},\"layers\":[{\"animate\":[{\"name\":\"zoomInDown\",\"type\":\"em\",\"style\":\"zoomInDown 2s ease 1s 1 normal forwards running\"},{\"name\":\"fade in\",\"type\":\"em\",\"style\":\"fadeIn 1s ease 2s 1 normal forwards running\"}],\"data\":{\"data\":\"\\n                \\n                \\n                \\n                \\n                \\n                \\n                <div><br></div><div>一次H5市场</div><div>的革命</div>\\n            \\n            \\n            \\n            \\n            \\n            \\n            \",\"fontStyle\":\"text-align: center; font-weight: bolder; color: rgb(255, 255, 255); font-size: 24px;\"},\"estyle\":{\"opacity\":\"0.00\"},\"style\":{\"width\":\"281px\",\"height\":\"120px\",\"top\":\"125px\",\"left\":\"18px\",\"zIndex\":9999,\"z-index\":9999},\"ue\":null,\"type\":\"text\",\"typename\":\"文本\"},{\"animate\":[{\"name\":\"fade in\",\"type\":\"em\",\"style\":\"fadeIn 1s ease 0s 1 normal forwards running\"},{\"name\":\"roll one\",\"type\":\"em\",\"style\":\"rollOneCount 10s linear 0s 9999 normal forwards running\"}],\"data\":{\"data\":\"\\n                \\n                <div><br></div>\\n            \\n            \",\"fontStyle\":\"letter-spacing: 0px;\"},\"estyle\":{\"background-color\":\"rgba(255,128,0,0.29)\",\"border-radius\":\"140px\",\"border\":\"10px dotted rgba(0,255,255,0.60)\"},\"style\":{\"width\":\"200px\",\"height\":\"200px\",\"top\":\"92px\",\"left\":\"59px\",\"zIndex\":9999,\"z-index\":9998},\"ue\":null,\"type\":\"text\",\"typename\":\"文本\"}],\"slider\":{\"animate\":1,\"autoplay\":false,\"lock\":false,\"time\":5},\"index\":1},{\"name\":\"空白页面\",\"style\":{\"background-color\":\"rgba(255,128,0,0.35)\"},\"layers\":[{\"animate\":[{\"name\":\"zoomInDown\",\"type\":\"em\",\"style\":\"zoomInDown 2s ease 1s 1 normal forwards running\"},{\"name\":\"fade in\",\"type\":\"em\",\"style\":\"fadeIn 1s ease 2s 1 normal forwards running\"}],\"data\":{\"data\":\"\\n                \\n                \\n                \\n                \\n                \\n                \\n                \\n                <div><br></div><div>一次H5市场</div><div>的22</div>\\n            \\n            \\n            \\n            \\n            \\n            \\n            \\n            \",\"fontStyle\":\"text-align: center; font-weight: bolder; color: rgb(255, 255, 255); font-size: 24px;\"},\"estyle\":{\"opacity\":\"0.00\"},\"style\":{\"width\":\"281px\",\"height\":\"120px\",\"top\":\"125px\",\"left\":\"18px\",\"zIndex\":9999,\"z-index\":9999},\"ue\":null,\"type\":\"text\",\"typename\":\"文本\"},{\"animate\":[{\"name\":\"fade in\",\"type\":\"em\",\"style\":\"fadeIn 1s ease 0s 1 normal forwards running\"},{\"name\":\"roll one\",\"type\":\"em\",\"style\":\"rollOneCount 10s linear 0s 9999 normal forwards running\"}],\"data\":{\"data\":\"\\n                \\n                <div><br></div>\\n            \\n            \",\"fontStyle\":\"letter-spacing: 0px;\"},\"estyle\":{\"background-color\":\"rgba(255,128,0,0.29)\",\"border-radius\":\"140px\",\"border\":\"10px dotted rgba(0,255,255,0.60)\"},\"style\":{\"width\":\"200px\",\"height\":\"200px\",\"top\":\"92px\",\"left\":\"59px\",\"zIndex\":9999,\"z-index\":9998},\"ue\":null,\"type\":\"text\",\"typename\":\"文本\"}],\"slider\":{\"animate\":1,\"autoplay\":false,\"lock\":false,\"time\":5},\"index\":2}],\"pagesize\":0,\"slider\":{\"animate\":1,\"lock\":false,\"autoplay\":false,\"time\":5},\"style\":{\"background-image\":\"/upload/upload_c784635aa2887ecc308a46fb9a653013.jpg\",\"background-color\":\"\",\"background-repeat\":\"repeat-y\",\"background-size\":\"cover\"}}');
INSERT INTO `h5ds_apps` VALUES ('55', '8', '点石H5APP', '/apps/8/55/index.html', '/upload\\upload_8e0d97058efc8c9e474a1f64f2ee5790.jpg', '点石H5，官方网站h5ds.com', '2017/08/25 18:48:07', '{\"img\":\"/upload\\\\upload_8e0d97058efc8c9e474a1f64f2ee5790.jpg\",\"info\":\"点石H5，官方网站h5ds.com\",\"loading\":\"1\",\"mp3\":{\"name\":\"\",\"url\":\"\"},\"name\":\"点石H5APP\",\"pages\":[{\"name\":\"page3\",\"style\":{\"background-color\":\"rgba(0,255,0,0.49)\"},\"layers\":[{\"type\":\"img\",\"typename\":\"图片\",\"data\":{\"src\":\"/upload/upload_683579dc0466410bce4a0343b121c6d3.png\"},\"style\":{\"width\":\"146px\",\"height\":\"100px\",\"transform\":\"rotate(20deg)\",\"left\":\"99px\",\"top\":\"143px\",\"z-index\":9999},\"estyle\":{}}],\"slider\":{\"animate\":1,\"lock\":false,\"autoplay\":false,\"time\":5},\"index\":0}],\"pagesize\":0,\"slider\":{\"animate\":1,\"lock\":false,\"autoplay\":false,\"time\":5},\"style\":{\"background-image\":\"\",\"background-color\":\"\",\"background-repeat\":\"\",\"background-size\":\"\"}}');
INSERT INTO `h5ds_apps` VALUES ('56', '1', '点石H5asdasd', '/apps/1/56/index.html', '/upload\\upload_9d6cec720c5e1f5f43b05f52bd6e0863.jpg', '点石H5，官方网站h5ds.com', '2017/08/25 18:54:48', '{\"img\":\"/upload\\\\upload_9d6cec720c5e1f5f43b05f52bd6e0863.jpg\",\"info\":\"点石H5，官方网站h5ds.com\",\"loading\":\"1\",\"mp3\":{\"name\":\"\",\"url\":\"\"},\"name\":\"点石H5asdasd\",\"pages\":[{\"name\":\"空白页面\",\"style\":{\"background-color\":\"rgba(255,0,128,0.33)\",\"background-image\":\"/upload/upload_c784635aa2887ecc308a46fb9a653013.jpg\",\"background-repeat\":\"no-repeat\",\"background-size\":\"cover\"},\"layers\":[{\"animate\":[{\"name\":\"slideInLeft\",\"type\":\"em\",\"style\":\"slideInLeft 2s ease 0s 1 normal forwards running\"}],\"data\":{\"data\":\"\\n                \\n                <div>成都FCC 技术分享大会</div><div>2017-08-27</div>\\n            \\n            \",\"fontStyle\":\"text-align: center; font-weight: bolder; color: rgb(255, 255, 255); font-size: 24px;\"},\"estyle\":{},\"style\":{\"width\":\"281px\",\"height\":\"68px\",\"top\":\"130px\",\"left\":\"22px\",\"zIndex\":9999,\"z-index\":9999},\"ue\":null,\"type\":\"text\",\"typename\":\"文本\"},{\"animate\":[{\"name\":\"flipInY\",\"type\":\"em\",\"style\":\"flipInY 1s ease 1s 1 normal forwards running\"},{\"name\":\"fade in\",\"type\":\"in\",\"style\":\"fadeIn 1s ease 2s 1 normal forwards running\"}],\"data\":{\"data\":\"\\n                \\n                <div>HTML5 Design Software</div><div><br></div><div>中文：点石H5</div><div><br></div><div>主讲：董涛</div>\\n            \\n            \",\"fontStyle\":\"color: rgb(255, 255, 0); font-weight: bolder; font-size: 13px; text-align: left;\"},\"estyle\":{\"background-color\":\"rgba(255,128,0,0.27)\",\"opacity\":\"0.00\"},\"style\":{\"width\":\"200px\",\"height\":\"90px\",\"top\":\"210px\",\"left\":\"68px\",\"zIndex\":9999,\"z-index\":9998},\"ue\":null,\"type\":\"text\",\"typename\":\"文本\"},{\"animate\":[{\"name\":\"tada\",\"type\":\"em\",\"style\":\"tada 31s ease 0s 24 normal forwards running\"}],\"data\":{\"src\":\"/upload/upload_8c6643ab11cc4898421e4bc390f22fdf.png\"},\"estyle\":{\"opacity\":\"0.60\"},\"style\":{\"width\":\"520px\",\"height\":\"582px\",\"top\":\"-69px\",\"left\":\"-111px\",\"z-index\":9997},\"type\":\"img\",\"color\":\"none\",\"ue\":null,\"typename\":\"图片\"}],\"slider\":{\"animate\":1,\"autoplay\":false,\"lock\":false,\"time\":5},\"index\":0},{\"name\":\"空白页面\",\"style\":{\"background-color\":\"rgba(255,0,128,0.33)\",\"background-image\":\"/upload/upload_c784635aa2887ecc308a46fb9a653013.jpg\",\"background-repeat\":\"no-repeat\",\"background-size\":\"cover\"},\"layers\":[{\"animate\":[{\"name\":\"flipInY\",\"type\":\"em\",\"style\":\"flipInY 1s ease 1s 1 normal forwards running\"},{\"name\":\"fade in\",\"type\":\"in\",\"style\":\"fadeIn 1s ease 2s 1 normal forwards running\"}],\"data\":{\"data\":\"\\n                \\n                <div>HTML5 Design Software</div><div><br></div><div>中文：点石H5</div><div><br></div><div>主讲：董涛</div>\\n            \\n            \",\"fontStyle\":\"color: rgb(255, 255, 0); font-weight: bolder; font-size: 13px; text-align: left;\"},\"estyle\":{\"background-color\":\"rgba(255,128,0,0.27)\",\"opacity\":\"0.00\"},\"style\":{\"width\":\"200px\",\"height\":\"90px\",\"top\":\"250px\",\"left\":\"71px\",\"zIndex\":9999,\"z-index\":9999},\"ue\":null,\"type\":\"text\",\"typename\":\"文本\"},{\"animate\":[{\"name\":\"slideInLeft\",\"type\":\"em\",\"style\":\"slideInLeft 2s ease 0s 1 normal forwards running\"}],\"data\":{\"data\":\"\\n                \\n                <div>成都FCC 技术分享大会</div><div>2017-08-27</div>\\n            \\n            \",\"fontStyle\":\"text-align: center; font-weight: bolder; color: rgb(255, 255, 255); font-size: 24px;\"},\"estyle\":{},\"style\":{\"width\":\"281px\",\"height\":\"68px\",\"top\":\"147px\",\"left\":\"15px\",\"zIndex\":9999,\"z-index\":9998},\"ue\":null,\"type\":\"text\",\"typename\":\"文本\"},{\"animate\":[{\"name\":\"tada\",\"type\":\"em\",\"style\":\"tada 31s ease 0s 24 normal forwards running\"}],\"data\":{\"src\":\"/upload/upload_8c6643ab11cc4898421e4bc390f22fdf.png\"},\"estyle\":{\"opacity\":\"0.60\"},\"style\":{\"width\":\"520px\",\"height\":\"582px\",\"top\":\"-69px\",\"left\":\"-111px\",\"z-index\":9997},\"type\":\"img\",\"color\":\"none\",\"ue\":null,\"typename\":\"图片\"}],\"slider\":{\"animate\":1,\"autoplay\":false,\"lock\":false,\"time\":5},\"index\":1}],\"pagesize\":0,\"slider\":{\"animate\":1,\"lock\":false,\"autoplay\":false,\"time\":5},\"style\":{\"background-image\":\"\",\"background-color\":\"\",\"background-repeat\":\"\",\"background-size\":\"\"}}');

-- ----------------------------
-- Table structure for `h5ds_apps_sys`
-- ----------------------------
DROP TABLE IF EXISTS `h5ds_apps_sys`;
CREATE TABLE `h5ds_apps_sys` (
  `id` int(50) NOT NULL AUTO_INCREMENT,
  `type` int(50) NOT NULL COMMENT '分类id',
  `name` varchar(100) NOT NULL COMMENT 'app名字',
  `url` varchar(255) NOT NULL COMMENT 'app链接地址',
  `pic` varchar(255) DEFAULT NULL COMMENT 'app 主图',
  `des` varchar(255) DEFAULT NULL COMMENT '描述信息',
  `data` longtext NOT NULL COMMENT 'app json数据',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='系统的app';

-- ----------------------------
-- Records of h5ds_apps_sys
-- ----------------------------

-- ----------------------------
-- Table structure for `h5ds_apps_type`
-- ----------------------------
DROP TABLE IF EXISTS `h5ds_apps_type`;
CREATE TABLE `h5ds_apps_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL COMMENT '类型名称',
  `del` int(2) unsigned zerofill NOT NULL COMMENT '删除标记，0表示正常，1表示删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='系统app 分类';

-- ----------------------------
-- Records of h5ds_apps_type
-- ----------------------------
INSERT INTO `h5ds_apps_type` VALUES ('1', '素材1', '00');
INSERT INTO `h5ds_apps_type` VALUES ('2', '素材2', '00');

-- ----------------------------
-- Table structure for `h5ds_imgs_sys`
-- ----------------------------
DROP TABLE IF EXISTS `h5ds_imgs_sys`;
CREATE TABLE `h5ds_imgs_sys` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `url` varchar(255) NOT NULL,
  `size` varchar(50) NOT NULL COMMENT '图片大小',
  `type` varchar(50) DEFAULT NULL COMMENT '图片分类',
  `owner` varchar(50) DEFAULT NULL COMMENT '拥有者',
  `del` int(1) unsigned zerofill NOT NULL COMMENT '删除标记，0表示正常，1表示删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='系统图库';

-- ----------------------------
-- Records of h5ds_imgs_sys
-- ----------------------------
INSERT INTO `h5ds_imgs_sys` VALUES ('1', '图片1', '/upload/crop_1490755199098.jpg', '226', '1', '1', '0');
INSERT INTO `h5ds_imgs_sys` VALUES ('2', '图片2', '/upload/crop_1490755310185.jpg', '226', '1', '1', '0');

-- ----------------------------
-- Table structure for `h5ds_imgs_type`
-- ----------------------------
DROP TABLE IF EXISTS `h5ds_imgs_type`;
CREATE TABLE `h5ds_imgs_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL COMMENT '类型名称',
  `del` int(2) unsigned zerofill NOT NULL COMMENT '删除标记，0表示正常，1表示删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='系统图库类型';

-- ----------------------------
-- Records of h5ds_imgs_type
-- ----------------------------
INSERT INTO `h5ds_imgs_type` VALUES ('1', '素材1', '00');
INSERT INTO `h5ds_imgs_type` VALUES ('2', '素材2', '00');

-- ----------------------------
-- Table structure for `h5ds_imgs_user`
-- ----------------------------
DROP TABLE IF EXISTS `h5ds_imgs_user`;
CREATE TABLE `h5ds_imgs_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `url` varchar(255) NOT NULL,
  `size` varchar(50) NOT NULL COMMENT '图片大小',
  `type` varchar(50) DEFAULT NULL COMMENT '分类',
  `owner` varchar(50) DEFAULT NULL COMMENT '拥有者',
  `del` int(2) unsigned zerofill NOT NULL DEFAULT '00' COMMENT '删除标记，0表示正常，1表示删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8 COMMENT='用户上传的图片';

-- ----------------------------
-- Records of h5ds_imgs_user
-- ----------------------------
INSERT INTO `h5ds_imgs_user` VALUES ('31', 'add2.jpg', '/upload\\upload_01cbf00f547ad5605d15576663835017.jpg', '25733', 'image/jpeg', '1', '00');
INSERT INTO `h5ds_imgs_user` VALUES ('32', 'add5.jpg', '/upload\\upload_692fadcc1b6e970651272ed005f2696c.jpg', '31683', 'image/jpeg', '1', '00');
INSERT INTO `h5ds_imgs_user` VALUES ('33', 'add1.jpg', '/upload\\upload_a19477a423fc8654b8b7433d1f8374be.jpg', '29207', 'image/jpeg', '1', '00');
INSERT INTO `h5ds_imgs_user` VALUES ('34', 'add3.jpg', '/upload\\upload_175ef9229449dfbf9b34856e2ea86aee.jpg', '23565', 'image/jpeg', '1', '00');
INSERT INTO `h5ds_imgs_user` VALUES ('35', 'add6.jpg', '/upload\\upload_502c311ae24e6d1b0a2a3cbb33046291.jpg', '30651', 'image/jpeg', '1', '00');
INSERT INTO `h5ds_imgs_user` VALUES ('36', 'add4.jpg', '/upload\\upload_be581bb5eff9df86b33f5a916252941c.jpg', '27872', 'image/jpeg', '1', '00');
INSERT INTO `h5ds_imgs_user` VALUES ('37', 'add8.jpg', '/upload\\upload_77bd41d9bbecdc83c0bd49d4a9c1a049.jpg', '40415', 'image/jpeg', '1', '00');
INSERT INTO `h5ds_imgs_user` VALUES ('38', 'add7.jpg', '/upload\\upload_7c3db8065fbb81d2fdb6761b4540a053.jpg', '25601', 'image/jpeg', '1', '00');
INSERT INTO `h5ds_imgs_user` VALUES ('39', '未标题-1.jpg', '/upload\\upload_4dfc8cf32e00ebf73beab28003a50f27.jpg', '39860', 'image/jpeg', '1', '00');
INSERT INTO `h5ds_imgs_user` VALUES ('40', '338289932822.jpg', '/upload\\upload_c784635aa2887ecc308a46fb9a653013.jpg', '118240', 'image/jpeg', '1', '00');
INSERT INTO `h5ds_imgs_user` VALUES ('42', 'app.png', '/upload\\upload_3131c898778f0cb6f5031ce88a2ee092.png', '29065', 'image/png', '1', '00');
INSERT INTO `h5ds_imgs_user` VALUES ('43', '未标题-1_02.png', '/upload\\upload_8c6643ab11cc4898421e4bc390f22fdf.png', '291140', 'image/png', '1', '00');
INSERT INTO `h5ds_imgs_user` VALUES ('44', '1277522.jpg', '/upload\\upload_eca212a2325bdd0e9c7baa487316d93c.jpg', '186088', 'image/jpeg', '1', '00');
INSERT INTO `h5ds_imgs_user` VALUES ('45', '57c7e9753146b.png', '/upload\\upload_683579dc0466410bce4a0343b121c6d3.png', '313812', 'image/png', '8', '00');
INSERT INTO `h5ds_imgs_user` VALUES ('46', '1277522.jpg', '/upload\\upload_8e0d97058efc8c9e474a1f64f2ee5790.jpg', '186088', 'image/jpeg', '8', '00');
INSERT INTO `h5ds_imgs_user` VALUES ('47', '1279708.jpg', '/upload\\upload_9d6cec720c5e1f5f43b05f52bd6e0863.jpg', '200483', 'image/jpeg', '1', '00');

-- ----------------------------
-- Table structure for `h5ds_mp3`
-- ----------------------------
DROP TABLE IF EXISTS `h5ds_mp3`;
CREATE TABLE `h5ds_mp3` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL COMMENT '音乐名字',
  `url` varchar(255) NOT NULL COMMENT '音乐url',
  `des` varchar(255) DEFAULT NULL COMMENT '音乐描述',
  `size` varchar(255) DEFAULT NULL COMMENT '大小',
  `type` varchar(255) DEFAULT NULL COMMENT '类型',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='系统的mp3';

-- ----------------------------
-- Records of h5ds_mp3
-- ----------------------------
INSERT INTO `h5ds_mp3` VALUES ('1', '林中鸟', '/mp3/葛林 - 林中鸟.mp3', null, '3.5M', '1');
INSERT INTO `h5ds_mp3` VALUES ('2', '逆流成河', '/mp3/金南玲 - 逆流成河.mp3', null, '1.91M', '1');

-- ----------------------------
-- Table structure for `h5ds_mp3_type`
-- ----------------------------
DROP TABLE IF EXISTS `h5ds_mp3_type`;
CREATE TABLE `h5ds_mp3_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL COMMENT '类型名称',
  `del` int(2) unsigned zerofill NOT NULL COMMENT '删除标记，0表示正常，1表示删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='mp3分类';

-- ----------------------------
-- Records of h5ds_mp3_type
-- ----------------------------
INSERT INTO `h5ds_mp3_type` VALUES ('1', 'all', '00');

-- ----------------------------
-- Table structure for `h5ds_tpls_sys`
-- ----------------------------
DROP TABLE IF EXISTS `h5ds_tpls_sys`;
CREATE TABLE `h5ds_tpls_sys` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `pic` varchar(255) NOT NULL,
  `data` text NOT NULL,
  `type` varchar(50) NOT NULL COMMENT '所属分类',
  `des` varchar(255) DEFAULT NULL COMMENT '描述信息',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='系统的模板';

-- ----------------------------
-- Records of h5ds_tpls_sys
-- ----------------------------
INSERT INTO `h5ds_tpls_sys` VALUES ('1', '模板1', '/assets/images/pic2.jpg', '{\"name\":\"page3\",\"style\":{\"background-color\":\"rgba(0,255,0,0.49)\"},\"layers\":[{\"type\":\"img\",\"typename\":\"图片\",\"data\":{\"src\":\"assets/images/pic.jpg\"},\"style\":{\"width\":\"50px\",\"height\":\"100px\",\"transform\":\"rotate(20deg)\",\"left\":\"60px\",\"top\":\"40px\",\"z-index\":9999},\"estyle\":{}}],\"slider\":{\"animate\":1,\"lock\":false,\"autoplay\":false,\"time\":5},\"index\":2}', '1', null);

-- ----------------------------
-- Table structure for `h5ds_tpls_type`
-- ----------------------------
DROP TABLE IF EXISTS `h5ds_tpls_type`;
CREATE TABLE `h5ds_tpls_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL COMMENT '类型名称',
  `del` int(2) unsigned zerofill NOT NULL COMMENT '删除标记，0表示正常，1表示删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='系统模板分类';

-- ----------------------------
-- Records of h5ds_tpls_type
-- ----------------------------
INSERT INTO `h5ds_tpls_type` VALUES ('1', '模板1', '00');

-- ----------------------------
-- Table structure for `h5ds_tpls_user`
-- ----------------------------
DROP TABLE IF EXISTS `h5ds_tpls_user`;
CREATE TABLE `h5ds_tpls_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `pic` varchar(255) NOT NULL,
  `data` text NOT NULL,
  `owner` varchar(50) NOT NULL COMMENT '所属用户',
  `des` varchar(255) DEFAULT NULL COMMENT '描述信息 50 字',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='用户的模板';

-- ----------------------------
-- Records of h5ds_tpls_user
-- ----------------------------
INSERT INTO `h5ds_tpls_user` VALUES ('2', '空白页面', '/upload/h2c_1503597211984.png', '{\"name\":\"空白页面\",\"style\":{\"background-color\":\"rgba(255,0,128,0.33)\"},\"layers\":[{\"animate\":[{\"name\":\"slideInLeft\",\"type\":\"em\",\"style\":\"slideInLeft 2s ease 0s 1 normal forwards running\"}],\"data\":{\"data\":\"\\n                \\n                <div>成都FCC 技术分享大会</div><div>2017-08-27</div>\\n            \\n            \",\"fontStyle\":\"text-align: center; font-weight: bolder; color: rgb(255, 255, 255); font-size: 24px;\"},\"estyle\":{},\"style\":{\"width\":\"281px\",\"height\":\"68px\",\"top\":\"130px\",\"left\":\"22px\",\"zIndex\":9999,\"z-index\":9999},\"ue\":null,\"type\":\"text\",\"typename\":\"文本\"},{\"animate\":[{\"name\":\"flipInY\",\"type\":\"em\",\"style\":\"flipInY 1s ease 1s 1 normal forwards running\"},{\"name\":\"fade in\",\"type\":\"in\",\"style\":\"fadeIn 1s ease 2s 1 normal forwards running\"}],\"data\":{\"data\":\"\\n                \\n                <div>HTML5 Design Software</div><div><br></div><div>中文：点石H5</div><div><br></div><div>主讲：董涛</div>\\n            \\n            \",\"fontStyle\":\"color: rgb(255, 255, 0); font-weight: bolder; font-size: 13px; text-align: left;\"},\"estyle\":{\"background-color\":\"rgba(255,128,0,0.27)\",\"opacity\":\"0.00\"},\"style\":{\"width\":\"200px\",\"height\":\"90px\",\"top\":\"210px\",\"left\":\"68px\",\"zIndex\":9999,\"z-index\":9998},\"ue\":null,\"type\":\"text\",\"typename\":\"文本\"},{\"animate\":[{\"name\":\"tada\",\"type\":\"em\",\"style\":\"tada 31s ease 0s 24 normal forwards running\"}],\"data\":{\"src\":\"/upload/upload_8c6643ab11cc4898421e4bc390f22fdf.png\"},\"estyle\":{\"opacity\":\"0.60\"},\"style\":{\"width\":\"520px\",\"height\":\"582px\",\"top\":\"-69px\",\"left\":\"-111px\",\"z-index\":9997},\"type\":\"img\",\"color\":\"none\",\"ue\":null,\"typename\":\"图片\"}],\"slider\":{\"animate\":1,\"autoplay\":false,\"lock\":false,\"time\":5}}', '1', null);
INSERT INTO `h5ds_tpls_user` VALUES ('3', '空白页面', '/upload/h2c_1503597219097.png', '{\"name\":\"空白页面\",\"style\":{\"background-color\":\"rgba(255,0,128,0.33)\"},\"layers\":[{\"animate\":[{\"name\":\"zoomInDown\",\"type\":\"em\",\"style\":\"zoomInDown 2s ease 1s 1 normal forwards running\"},{\"name\":\"fade in\",\"type\":\"em\",\"style\":\"fadeIn 1s ease 2s 1 normal forwards running\"}],\"data\":{\"data\":\"\\n                \\n                \\n                \\n                \\n                \\n                \\n                <div><br></div><div>一次H5市场</div><div>的革命</div>\\n            \\n            \\n            \\n            \\n            \\n            \\n            \",\"fontStyle\":\"text-align: center; font-weight: bolder; color: rgb(255, 255, 255); font-size: 24px;\"},\"estyle\":{\"opacity\":\"0.00\"},\"style\":{\"width\":\"281px\",\"height\":\"120px\",\"top\":\"125px\",\"left\":\"18px\",\"zIndex\":9999,\"z-index\":9999},\"ue\":null,\"type\":\"text\",\"typename\":\"文本\"},{\"animate\":[{\"name\":\"fade in\",\"type\":\"em\",\"style\":\"fadeIn 1s ease 0s 1 normal forwards running\"},{\"name\":\"roll one\",\"type\":\"em\",\"style\":\"rollOneCount 10s linear 0s 9999 normal forwards running\"}],\"data\":{\"data\":\"\\n                \\n                <div><br></div>\\n            \\n            \",\"fontStyle\":\"letter-spacing: 0px;\"},\"estyle\":{\"background-color\":\"rgba(255,128,0,0.29)\",\"border-radius\":\"140px\",\"border\":\"10px dotted rgba(0,255,255,0.60)\"},\"style\":{\"width\":\"200px\",\"height\":\"200px\",\"top\":\"92px\",\"left\":\"59px\",\"zIndex\":9999,\"z-index\":9998},\"ue\":null,\"type\":\"text\",\"typename\":\"文本\"}],\"slider\":{\"animate\":1,\"autoplay\":false,\"lock\":false,\"time\":5}}', '1', null);

-- ----------------------------
-- Table structure for `h5ds_user`
-- ----------------------------
DROP TABLE IF EXISTS `h5ds_user`;
CREATE TABLE `h5ds_user` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT '' COMMENT '用户名',
  `password` varchar(50) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `usertype` int(2) unsigned zerofill NOT NULL DEFAULT '00' COMMENT '用户类型。0普通用户，1管理员',
  `tel` varchar(20) NOT NULL COMMENT '电话',
  PRIMARY KEY (`id`,`tel`),
  UNIQUE KEY `tel` (`tel`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8 COMMENT='用户列表';

-- ----------------------------
-- Records of h5ds_user
-- ----------------------------
INSERT INTO `h5ds_user` VALUES ('1', '馒头', '123456', '676015863@qq.com', '01', '13551301693');
