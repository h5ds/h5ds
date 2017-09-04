/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50625
Source Host           : localhost:3306
Source Database       : h5ds

Target Server Type    : MYSQL
Target Server Version : 50625
File Encoding         : 65001

Date: 2017-09-04 02:41:03
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
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8 COMMENT='用户的APP';

-- ----------------------------
-- Records of h5ds_apps
-- ----------------------------
INSERT INTO `h5ds_apps` VALUES ('57', '1', '点石H5', '/apps/1/57/index.html', '/assets/images/app.png', '点石H5，官方网站h5ds.com', '2017/09/04 02:39:08', '{\"img\":\"/assets/images/app.png\",\"info\":\"点石H5，官方网站h5ds.com\",\"loading\":\"1\",\"mp3\":{\"name\":\"\",\"url\":\"\"},\"name\":\"点石H5\",\"pages\":[{\"name\":\"空白页面\",\"style\":{\"background-color\":\"rgba(0,128,255,1)\"},\"layers\":[{\"animate\":[{\"name\":\"zoomInDown\",\"type\":\"em\",\"style\":\"zoomInDown 2s ease 0s 1 normal forwards running\"}],\"data\":{\"data\":\"\\n                \\n                <div>请输入文本内容</div>\\n            \\n            \",\"fontStyle\":\"font-size: 32px; text-align: center; font-weight: bolder; color: rgb(255, 255, 255);\"},\"estyle\":{},\"style\":{\"width\":\"342px\",\"height\":\"66px\",\"top\":\"220px\",\"left\":\"-10px\",\"zIndex\":9999,\"z-index\":9999},\"ue\":null,\"type\":\"text\",\"typename\":\"文本\"},{\"animate\":[{\"name\":\"bounceIn\",\"type\":\"em\",\"style\":\"bounceIn 2s ease 0s 1 normal forwards running\"}],\"data\":{\"data\":\"\\n                <div><br></div>\\n            \",\"fontStyle\":\"\"},\"estyle\":{\"background-color\":\"rgba(128,0,255,0.64)\",\"border-radius\":\"500px\"},\"style\":{\"width\":\"87px\",\"height\":\"87px\",\"top\":\"76px\",\"left\":\"47px\",\"zIndex\":9999,\"z-index\":9998,\"transform\":\"rotate(0deg)\"},\"ue\":null,\"type\":\"text\",\"typename\":\"文本\"},{\"animate\":[{\"name\":\"bounceIn\",\"type\":\"em\",\"style\":\"bounceIn 2s ease 0.6s 1 normal forwards running\"}],\"data\":{\"data\":\"\\n                <div><br></div>\\n            \",\"fontStyle\":\"\"},\"estyle\":{\"background-color\":\"rgba(255,128,0,0.64)\",\"border-radius\":\"500px\",\"opacity\":\"0.00\"},\"style\":{\"width\":\"282px\",\"height\":\"282px\",\"top\":\"177px\",\"left\":\"88px\",\"zIndex\":9999,\"z-index\":9997,\"transform\":\"rotate(0deg)\"},\"ue\":null,\"type\":\"text\",\"typename\":\"文本\"},{\"animate\":[{\"name\":\"bounceIn\",\"type\":\"em\",\"style\":\"bounceIn 2s ease 0.2s 1 normal forwards running\"}],\"data\":{\"data\":\"\\n                <div><br></div>\\n            \",\"fontStyle\":\"\"},\"estyle\":{\"background-color\":\"rgba(0,255,0,0.64)\",\"border-radius\":\"500px\",\"opacity\":\"0.00\"},\"style\":{\"width\":\"200px\",\"height\":\"200px\",\"top\":\"58px\",\"left\":\"88px\",\"zIndex\":9999,\"z-index\":9996,\"transform\":\"rotate(0deg)\"},\"ue\":null,\"type\":\"text\",\"typename\":\"文本\"},{\"animate\":[{\"name\":\"bounceIn\",\"type\":\"em\",\"style\":\"bounceIn 2s ease 0.4s 1 normal forwards running\"}],\"data\":{\"data\":\"\\n                <div><br></div>\\n            \",\"fontStyle\":\"\"},\"estyle\":{\"background-color\":\"rgba(255,0,128,0.64)\",\"border-radius\":\"500px\",\"opacity\":\"0.00\"},\"style\":{\"width\":\"238px\",\"height\":\"238px\",\"top\":\"141px\",\"left\":\"-55px\",\"zIndex\":9999,\"z-index\":9995,\"transform\":\"rotate(0deg)\"},\"ue\":null,\"type\":\"text\",\"typename\":\"文本\"}],\"slider\":{\"animate\":1,\"autoplay\":false,\"lock\":false,\"time\":5},\"index\":0}],\"pagesize\":0,\"slider\":{\"animate\":1,\"lock\":false,\"autoplay\":false,\"time\":5},\"style\":{\"background-image\":\"\",\"background-color\":\"\",\"background-repeat\":\"\",\"background-size\":\"\"}}');

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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='系统的模板';

-- ----------------------------
-- Records of h5ds_tpls_sys
-- ----------------------------
INSERT INTO `h5ds_tpls_sys` VALUES ('2', '酷炫效果', '/assets/tplImg/2.jpg', '{\"name\":\"空白页面\",\"style\":{\"background-color\":\"rgba(128,0,255,1)\"},\"layers\":[{\"animate\":[{\"name\":\"zoomIn\",\"type\":\"em\",\"style\":\"zoomIn 0.5s ease 1.6s 1 normal forwards running\"}],\"data\":{\"data\":\"\\n                \\n                \\n                \\n                \\n                <div>的体验</div>\\n            \\n            \\n            \\n            \\n            \",\"fontStyle\":\"font-size: 46px; font-weight: bolder; color: rgb(255, 255, 255); text-align: center;\"},\"estyle\":{\"opacity\":\"0.00\"},\"style\":{\"width\":\"200px\",\"height\":\"69px\",\"top\":\"193px\",\"left\":\"63px\",\"zIndex\":9999,\"z-index\":9999},\"ue\":null,\"type\":\"text\",\"typename\":\"文本\"},{\"animate\":[{\"name\":\"zoomIn\",\"type\":\"em\",\"style\":\"zoomIn 0.3s ease 1.4s 1 normal forwards running\"}],\"data\":{\"data\":\"\\n                \\n                \\n                \\n                \\n                <div>不一样</div>\\n            \\n            \\n            \\n            \\n            \",\"fontStyle\":\"font-size: 60px; font-weight: bolder; color: rgb(255, 255, 255); text-align: center;\"},\"estyle\":{\"opacity\":\"0.00\",\"background-color\":\"initial\",\"border-radius\":\"300px\"},\"style\":{\"width\":\"202px\",\"height\":\"76px\",\"top\":\"98px\",\"left\":\"62px\",\"zIndex\":9999,\"z-index\":9998},\"ue\":null,\"type\":\"text\",\"typename\":\"文本\"},{\"animate\":[{\"name\":\"flipInY\",\"type\":\"em\",\"style\":\"flipInY 1s ease 1.2s 1 normal forwards running\"}],\"data\":{\"data\":\"\\n                <div><br></div>\\n            \",\"fontStyle\":\"\"},\"estyle\":{\"background-color\":\"rgba(128,0,255,0.79)\",\"opacity\":\"0.00\"},\"style\":{\"width\":\"223px\",\"height\":\"400px\",\"top\":\"33px\",\"left\":\"50px\",\"zIndex\":9999,\"z-index\":9997},\"ue\":null,\"type\":\"text\",\"typename\":\"文本\"},{\"animate\":[{\"name\":\"slideInLeft\",\"type\":\"em\",\"style\":\"slideInLeft 1s ease 1.6s 1 normal forwards running\"}],\"data\":{\"data\":\"\\n                <div><br></div>\\n            \",\"fontStyle\":\"\"},\"estyle\":{\"background-color\":\"rgba(0,0,0,0.62)\",\"opacity\":\"0.00\"},\"style\":{\"width\":\"695px\",\"height\":\"37px\",\"top\":\"123px\",\"left\":\"61px\",\"zIndex\":9999,\"z-index\":9996,\"transform\":\"rotate(221deg)\"},\"ue\":null,\"type\":\"text\",\"typename\":\"文本\"},{\"animate\":[{\"name\":\"slideInLeft\",\"type\":\"em\",\"style\":\"slideInLeft 1s ease 1.4s 1 normal forwards running\"}],\"data\":{\"data\":\"\\n                <div><br></div>\\n            \",\"fontStyle\":\"\"},\"estyle\":{\"background-color\":\"rgba(0,0,0,0.62)\",\"opacity\":\"0.00\"},\"style\":{\"width\":\"695px\",\"height\":\"37px\",\"top\":\"147px\",\"left\":\"0px\",\"zIndex\":9999,\"z-index\":9995,\"transform\":\"rotate(221deg)\"},\"ue\":null,\"type\":\"text\",\"typename\":\"文本\"},{\"animate\":[{\"name\":\"slideInLeft\",\"type\":\"em\",\"style\":\"slideInLeft 1s ease 1.2s 1 normal forwards running\"}],\"data\":{\"data\":\"\\n                <div><br></div>\\n            \",\"fontStyle\":\"\"},\"estyle\":{\"background-color\":\"rgba(0,0,0,0.62)\",\"opacity\":\"0.00\"},\"style\":{\"width\":\"695px\",\"height\":\"37px\",\"top\":\"161px\",\"left\":\"-68px\",\"zIndex\":9999,\"z-index\":9994,\"transform\":\"rotate(221deg)\"},\"ue\":null,\"type\":\"text\",\"typename\":\"文本\"},{\"animate\":[{\"name\":\"slideInLeft\",\"type\":\"em\",\"style\":\"slideInLeft 1s ease 1s 1 normal forwards running\"}],\"data\":{\"data\":\"\\n                <div><br></div>\\n            \",\"fontStyle\":\"\"},\"estyle\":{\"background-color\":\"rgba(0,0,0,0.62)\",\"opacity\":\"0.00\"},\"style\":{\"width\":\"695px\",\"height\":\"37px\",\"top\":\"195px\",\"left\":\"-113px\",\"zIndex\":9999,\"z-index\":9993,\"transform\":\"rotate(221deg)\"},\"ue\":null,\"type\":\"text\",\"typename\":\"文本\"},{\"animate\":[{\"name\":\"slideInLeft\",\"type\":\"em\",\"style\":\"slideInLeft 1s ease 0.8s 1 normal forwards running\"}],\"data\":{\"data\":\"\\n                <div><br></div>\\n            \",\"fontStyle\":\"\"},\"estyle\":{\"background-color\":\"rgba(0,0,0,0.62)\",\"opacity\":\"0.00\"},\"style\":{\"width\":\"695px\",\"height\":\"37px\",\"top\":\"235px\",\"left\":\"-151px\",\"zIndex\":9999,\"z-index\":9992,\"transform\":\"rotate(221deg)\"},\"ue\":null,\"type\":\"text\",\"typename\":\"文本\"},{\"animate\":[{\"name\":\"slideInLeft\",\"type\":\"em\",\"style\":\"slideInLeft 1s ease 0.6s 1 normal forwards running\"}],\"data\":{\"data\":\"\\n                <div><br></div>\\n            \",\"fontStyle\":\"\"},\"estyle\":{\"background-color\":\"rgba(0,0,0,0.62)\",\"opacity\":\"0.00\"},\"style\":{\"width\":\"695px\",\"height\":\"37px\",\"top\":\"271px\",\"left\":\"-194px\",\"zIndex\":9999,\"z-index\":9991,\"transform\":\"rotate(221deg)\"},\"ue\":null,\"type\":\"text\",\"typename\":\"文本\"},{\"animate\":[{\"name\":\"slideInLeft\",\"type\":\"em\",\"style\":\"slideInLeft 1s ease 0.4s 1 normal forwards running\"}],\"data\":{\"data\":\"\\n                <div><br></div>\\n            \",\"fontStyle\":\"\"},\"estyle\":{\"background-color\":\"rgba(0,0,0,0.62)\",\"opacity\":\"0.00\"},\"style\":{\"width\":\"695px\",\"height\":\"37px\",\"top\":\"315px\",\"left\":\"-234px\",\"zIndex\":9999,\"z-index\":9990,\"transform\":\"rotate(221deg)\"},\"ue\":null,\"type\":\"text\",\"typename\":\"文本\"},{\"animate\":[{\"name\":\"slideInLeft\",\"type\":\"em\",\"style\":\"slideInLeft 1s ease 0.2s 1 normal forwards running\"}],\"data\":{\"data\":\"\\n                <div><br></div>\\n            \",\"fontStyle\":\"\"},\"estyle\":{\"background-color\":\"rgba(0,0,0,0.62)\",\"opacity\":\"0.00\"},\"style\":{\"width\":\"695px\",\"height\":\"37px\",\"top\":\"359px\",\"left\":\"-267px\",\"zIndex\":9999,\"z-index\":9989,\"transform\":\"rotate(221deg)\"},\"ue\":null,\"type\":\"text\",\"typename\":\"文本\"},{\"animate\":[{\"name\":\"slideInLeft\",\"type\":\"em\",\"style\":\"slideInLeft 1s ease 0s 1 normal forwards running\"}],\"data\":{\"data\":\"\\n                <div><br></div>\\n            \",\"fontStyle\":\"\"},\"estyle\":{\"background-color\":\"rgba(0,0,0,0.62)\",\"opacity\":\"0.00\"},\"style\":{\"width\":\"695px\",\"height\":\"37px\",\"top\":\"414px\",\"left\":\"-292px\",\"zIndex\":9999,\"z-index\":9988,\"transform\":\"rotate(221deg)\"},\"ue\":null,\"type\":\"text\",\"typename\":\"文本\"},{\"animate\":[{\"name\":\"slideInLeft\",\"type\":\"em\",\"style\":\"slideInLeft 1s ease 1.2s 1 normal forwards running\"}],\"data\":{\"data\":\"\\n                <div><br></div>\\n            \",\"fontStyle\":\"\"},\"estyle\":{\"background-color\":\"rgba(0,0,0,0.62)\",\"opacity\":\"0.00\"},\"style\":{\"width\":\"695px\",\"height\":\"37px\",\"top\":\"373px\",\"left\":\"-82px\",\"zIndex\":9999,\"z-index\":9987,\"transform\":\"rotate(309deg)\"},\"ue\":null,\"type\":\"text\",\"typename\":\"文本\"},{\"animate\":[{\"name\":\"slideInLeft\",\"type\":\"em\",\"style\":\"slideInLeft 1s ease 1.0s 1 normal forwards running\"}],\"data\":{\"data\":\"\\n                <div><br></div>\\n            \",\"fontStyle\":\"\"},\"estyle\":{\"background-color\":\"rgba(0,0,0,0.62)\",\"opacity\":\"0.00\"},\"style\":{\"width\":\"695px\",\"height\":\"37px\",\"top\":\"333px\",\"left\":\"-126px\",\"zIndex\":9999,\"z-index\":9986,\"transform\":\"rotate(309deg)\"},\"ue\":null,\"type\":\"text\",\"typename\":\"文本\"},{\"animate\":[{\"name\":\"slideInLeft\",\"type\":\"em\",\"style\":\"slideInLeft 1s ease 0.8s 1 normal forwards running\"}],\"data\":{\"data\":\"\\n                <div><br></div>\\n            \",\"fontStyle\":\"\"},\"estyle\":{\"background-color\":\"rgba(0,0,0,0.62)\",\"opacity\":\"0.00\"},\"style\":{\"width\":\"695px\",\"height\":\"37px\",\"top\":\"300px\",\"left\":\"-178px\",\"zIndex\":9999,\"z-index\":9985,\"transform\":\"rotate(309deg)\"},\"ue\":null,\"type\":\"text\",\"typename\":\"文本\"},{\"animate\":[{\"name\":\"slideInLeft\",\"type\":\"em\",\"style\":\"slideInLeft 1s ease 0.6s 1 normal forwards running\"}],\"data\":{\"data\":\"\\n                <div><br></div>\\n            \",\"fontStyle\":\"\"},\"estyle\":{\"background-color\":\"rgba(0,0,0,0.62)\",\"opacity\":\"0.00\"},\"style\":{\"width\":\"695px\",\"height\":\"37px\",\"top\":\"251px\",\"left\":\"-214px\",\"zIndex\":9999,\"z-index\":9984,\"transform\":\"rotate(309deg)\"},\"ue\":null,\"type\":\"text\",\"typename\":\"文本\"},{\"animate\":[{\"name\":\"slideInLeft\",\"type\":\"em\",\"style\":\"slideInLeft 1s ease 0.4s 1 normal forwards running\"}],\"data\":{\"data\":\"\\n                <div><br></div>\\n            \",\"fontStyle\":\"\"},\"estyle\":{\"background-color\":\"rgba(0,0,0,0.62)\",\"opacity\":\"0.00\"},\"style\":{\"width\":\"695px\",\"height\":\"37px\",\"top\":\"219px\",\"left\":\"-264px\",\"zIndex\":9999,\"z-index\":9983,\"transform\":\"rotate(309deg)\"},\"ue\":null,\"type\":\"text\",\"typename\":\"文本\"},{\"animate\":[{\"name\":\"slideInLeft\",\"type\":\"em\",\"style\":\"slideInLeft 1s ease 0.2s 1 normal forwards running\"}],\"data\":{\"data\":\"\\n                <div><br></div>\\n            \",\"fontStyle\":\"\"},\"estyle\":{\"background-color\":\"rgba(0,0,0,0.62)\",\"opacity\":\"0.00\"},\"style\":{\"width\":\"695px\",\"height\":\"37px\",\"top\":\"207px\",\"left\":\"-330px\",\"zIndex\":9999,\"z-index\":9982,\"transform\":\"rotate(309deg)\"},\"ue\":null,\"type\":\"text\",\"typename\":\"文本\"},{\"animate\":[{\"name\":\"slideInLeft\",\"type\":\"em\",\"style\":\"slideInLeft 1s ease 0s 1 normal forwards running\"}],\"data\":{\"data\":\"\\n                <div><br></div>\\n            \",\"fontStyle\":\"\"},\"estyle\":{\"background-color\":\"rgba(0,0,0,0.62)\",\"opacity\":\"0.00\"},\"style\":{\"width\":\"695px\",\"height\":\"37px\",\"top\":\"128px\",\"left\":\"-342px\",\"zIndex\":9999,\"z-index\":9981,\"transform\":\"rotate(309deg)\"},\"ue\":null,\"type\":\"text\",\"typename\":\"文本\"}],\"slider\":{\"animate\":1,\"autoplay\":false,\"lock\":false,\"time\":5},\"index\":1}', '1', '');
INSERT INTO `h5ds_tpls_sys` VALUES ('3', '气泡效果', '/assets/tplImg/1.jpg', '{\"name\":\"空白页面\",\"style\":{\"background-color\":\"rgba(0,128,255,1)\"},\"layers\":[{\"animate\":[{\"name\":\"zoomInDown\",\"type\":\"em\",\"style\":\"zoomInDown 2s ease 0s 1 normal forwards running\"}],\"data\":{\"data\":\"\\n                \\n                <div>请输入文本内容</div>\\n            \\n            \",\"fontStyle\":\"font-size: 32px; text-align: center; font-weight: bolder; color: rgb(255, 255, 255);\"},\"estyle\":{},\"style\":{\"width\":\"342px\",\"height\":\"66px\",\"top\":\"220px\",\"left\":\"-10px\",\"zIndex\":9999,\"z-index\":9999},\"ue\":null,\"type\":\"text\",\"typename\":\"文本\"},{\"animate\":[{\"name\":\"bounceIn\",\"type\":\"em\",\"style\":\"bounceIn 2s ease 0s 1 normal forwards running\"}],\"data\":{\"data\":\"\\n                <div><br></div>\\n            \",\"fontStyle\":\"\"},\"estyle\":{\"background-color\":\"rgba(128,0,255,0.64)\",\"border-radius\":\"500px\"},\"style\":{\"width\":\"87px\",\"height\":\"87px\",\"top\":\"76px\",\"left\":\"47px\",\"zIndex\":9999,\"z-index\":9998,\"transform\":\"rotate(0deg)\"},\"ue\":null,\"type\":\"text\",\"typename\":\"文本\"},{\"animate\":[{\"name\":\"bounceIn\",\"type\":\"em\",\"style\":\"bounceIn 2s ease 0.6s 1 normal forwards running\"}],\"data\":{\"data\":\"\\n                <div><br></div>\\n            \",\"fontStyle\":\"\"},\"estyle\":{\"background-color\":\"rgba(255,128,0,0.64)\",\"border-radius\":\"500px\",\"opacity\":\"0.00\"},\"style\":{\"width\":\"282px\",\"height\":\"282px\",\"top\":\"177px\",\"left\":\"88px\",\"zIndex\":9999,\"z-index\":9997,\"transform\":\"rotate(0deg)\"},\"ue\":null,\"type\":\"text\",\"typename\":\"文本\"},{\"animate\":[{\"name\":\"bounceIn\",\"type\":\"em\",\"style\":\"bounceIn 2s ease 0.2s 1 normal forwards running\"}],\"data\":{\"data\":\"\\n                <div><br></div>\\n            \",\"fontStyle\":\"\"},\"estyle\":{\"background-color\":\"rgba(0,255,0,0.64)\",\"border-radius\":\"500px\",\"opacity\":\"0.00\"},\"style\":{\"width\":\"200px\",\"height\":\"200px\",\"top\":\"58px\",\"left\":\"88px\",\"zIndex\":9999,\"z-index\":9996,\"transform\":\"rotate(0deg)\"},\"ue\":null,\"type\":\"text\",\"typename\":\"文本\"},{\"animate\":[{\"name\":\"bounceIn\",\"type\":\"em\",\"style\":\"bounceIn 2s ease 0.4s 1 normal forwards running\"}],\"data\":{\"data\":\"\\n                <div><br></div>\\n            \",\"fontStyle\":\"\"},\"estyle\":{\"background-color\":\"rgba(255,0,128,0.64)\",\"border-radius\":\"500px\",\"opacity\":\"0.00\"},\"style\":{\"width\":\"238px\",\"height\":\"238px\",\"top\":\"141px\",\"left\":\"-55px\",\"zIndex\":9999,\"z-index\":9995,\"transform\":\"rotate(0deg)\"},\"ue\":null,\"type\":\"text\",\"typename\":\"文本\"}],\"slider\":{\"animate\":1,\"autoplay\":false,\"lock\":false,\"time\":5}}', '1', '');
INSERT INTO `h5ds_tpls_sys` VALUES ('4', '格子背景', '/assets/tplImg/3.jpg', '{\"name\":\"空白页面\",\"style\":{\"background-color\":\"rgba(147,0,63,1)\"},\"layers\":[{\"animate\":[{\"name\":\"zoomIn\",\"type\":\"em\",\"style\":\"zoomIn 1s ease 0s 1 normal forwards running\"}],\"data\":{\"data\":\"\\n                <div><br></div>\\n            \",\"fontStyle\":\"\"},\"estyle\":{\"background-color\":\"rgba(255,0,128,1)\"},\"style\":{\"width\":\"70px\",\"height\":\"70px\",\"top\":\"9px\",\"left\":\"7px\",\"zIndex\":9999,\"z-index\":9999},\"ue\":null,\"type\":\"text\",\"typename\":\"文本\"},{\"animate\":[{\"name\":\"zoomIn\",\"type\":\"em\",\"style\":\"zoomIn 1s ease 0.1s 1 normal forwards running\"}],\"data\":{\"data\":\"\\n                <div><br></div>\\n            \",\"fontStyle\":\"\"},\"estyle\":{\"background-color\":\"rgba(255,0,128,1)\",\"opacity\":\"0.00\"},\"style\":{\"width\":\"70px\",\"height\":\"70px\",\"top\":\"9px\",\"left\":\"84px\",\"zIndex\":9999,\"z-index\":9998},\"ue\":null,\"type\":\"text\",\"typename\":\"文本\"},{\"animate\":[{\"name\":\"zoomIn\",\"type\":\"em\",\"style\":\"zoomIn 1s ease 0.2s 1 normal forwards running\"}],\"data\":{\"data\":\"\\n                <div><br></div>\\n            \",\"fontStyle\":\"\"},\"estyle\":{\"background-color\":\"rgba(255,0,128,1)\",\"opacity\":\"0.00\"},\"style\":{\"width\":\"70px\",\"height\":\"70px\",\"top\":\"9px\",\"left\":\"162px\",\"zIndex\":9999,\"z-index\":9997},\"ue\":null,\"type\":\"text\",\"typename\":\"文本\"},{\"animate\":[{\"name\":\"zoomIn\",\"type\":\"em\",\"style\":\"zoomIn 1s ease 0.3s 1 normal forwards running\"}],\"data\":{\"data\":\"\\n                <div><br></div>\\n            \",\"fontStyle\":\"\"},\"estyle\":{\"background-color\":\"rgba(255,0,128,1)\",\"opacity\":\"0.00\"},\"style\":{\"width\":\"70px\",\"height\":\"70px\",\"top\":\"9px\",\"left\":\"241px\",\"zIndex\":9999,\"z-index\":9996},\"ue\":null,\"type\":\"text\",\"typename\":\"文本\"},{\"animate\":[{\"name\":\"zoomIn\",\"type\":\"em\",\"style\":\"zoomIn 1s ease 0.4s 1 normal forwards running\"}],\"data\":{\"data\":\"\\n                <div><br></div>\\n            \",\"fontStyle\":\"\"},\"estyle\":{\"background-color\":\"rgba(255,0,128,1)\",\"opacity\":\"0.00\"},\"style\":{\"width\":\"70px\",\"height\":\"70px\",\"top\":\"86px\",\"left\":\"241px\",\"zIndex\":9999,\"z-index\":9995},\"ue\":null,\"type\":\"text\",\"typename\":\"文本\"},{\"animate\":[{\"name\":\"zoomIn\",\"type\":\"em\",\"style\":\"zoomIn 1s ease 2.3s 1 normal forwards running\"}],\"data\":{\"data\":\"\\n                <div><br></div>\\n            \",\"fontStyle\":\"\"},\"estyle\":{\"background-color\":\"rgba(255,0,128,1)\",\"opacity\":\"0.00\"},\"style\":{\"width\":\"70px\",\"height\":\"70px\",\"top\":\"402px\",\"left\":\"7px\",\"zIndex\":9999,\"z-index\":9994},\"ue\":null,\"type\":\"text\",\"typename\":\"文本\"},{\"animate\":[{\"name\":\"zoomIn\",\"type\":\"em\",\"style\":\"zoomIn 1s ease 2.2s 1 normal forwards running\"}],\"data\":{\"data\":\"\\n                <div><br></div>\\n            \",\"fontStyle\":\"\"},\"estyle\":{\"background-color\":\"rgba(255,0,128,1)\",\"opacity\":\"0.00\"},\"style\":{\"width\":\"70px\",\"height\":\"70px\",\"top\":\"402px\",\"left\":\"84px\",\"zIndex\":9999,\"z-index\":9993},\"ue\":null,\"type\":\"text\",\"typename\":\"文本\"},{\"animate\":[{\"name\":\"zoomIn\",\"type\":\"em\",\"style\":\"zoomIn 1s ease 2.1s 1 normal forwards running\"}],\"data\":{\"data\":\"\\n                <div><br></div>\\n            \",\"fontStyle\":\"\"},\"estyle\":{\"background-color\":\"rgba(255,0,128,1)\",\"opacity\":\"0.00\"},\"style\":{\"width\":\"70px\",\"height\":\"70px\",\"top\":\"402px\",\"left\":\"163px\",\"zIndex\":9999,\"z-index\":9992},\"ue\":null,\"type\":\"text\",\"typename\":\"文本\"},{\"animate\":[{\"name\":\"zoomIn\",\"type\":\"em\",\"style\":\"zoomIn 1s ease 2s 1 normal forwards running\"}],\"data\":{\"data\":\"\\n                <div><br></div>\\n            \",\"fontStyle\":\"\"},\"estyle\":{\"background-color\":\"rgba(255,0,128,1)\",\"opacity\":\"0.00\"},\"style\":{\"width\":\"70px\",\"height\":\"70px\",\"top\":\"402px\",\"left\":\"241px\",\"zIndex\":9999,\"z-index\":9991},\"ue\":null,\"type\":\"text\",\"typename\":\"文本\"},{\"animate\":[{\"name\":\"zoomIn\",\"type\":\"em\",\"style\":\"zoomIn 1s ease 1.9s 1 normal forwards running\"}],\"data\":{\"data\":\"\\n                <div><br></div>\\n            \",\"fontStyle\":\"\"},\"estyle\":{\"background-color\":\"rgba(255,0,128,1)\",\"opacity\":\"0.00\"},\"style\":{\"width\":\"70px\",\"height\":\"70px\",\"top\":\"322px\",\"left\":\"241px\",\"zIndex\":9999,\"z-index\":9990},\"ue\":null,\"type\":\"text\",\"typename\":\"文本\"},{\"animate\":[{\"name\":\"zoomIn\",\"type\":\"em\",\"style\":\"zoomIn 1s ease 1.8s 1 normal forwards running\"}],\"data\":{\"data\":\"\\n                <div><br></div>\\n            \",\"fontStyle\":\"\"},\"estyle\":{\"background-color\":\"rgba(255,0,128,1)\",\"opacity\":\"0.00\"},\"style\":{\"width\":\"70px\",\"height\":\"70px\",\"top\":\"322px\",\"left\":\"163px\",\"zIndex\":9999,\"z-index\":9989},\"ue\":null,\"type\":\"text\",\"typename\":\"文本\"},{\"animate\":[{\"name\":\"zoomIn\",\"type\":\"em\",\"style\":\"zoomIn 1s ease 1.7s 1 normal forwards running\"}],\"data\":{\"data\":\"\\n                <div><br></div>\\n            \",\"fontStyle\":\"\"},\"estyle\":{\"background-color\":\"rgba(255,0,128,1)\",\"opacity\":\"0.00\"},\"style\":{\"width\":\"70px\",\"height\":\"70px\",\"top\":\"322px\",\"left\":\"84px\",\"zIndex\":9999,\"z-index\":9988},\"ue\":null,\"type\":\"text\",\"typename\":\"文本\"},{\"animate\":[{\"name\":\"zoomIn\",\"type\":\"em\",\"style\":\"zoomIn 1s ease 1.6s 1 normal forwards running\"}],\"data\":{\"data\":\"\\n                <div><br></div>\\n            \",\"fontStyle\":\"\"},\"estyle\":{\"background-color\":\"rgba(255,0,128,1)\",\"opacity\":\"0.00\"},\"style\":{\"width\":\"70px\",\"height\":\"70px\",\"top\":\"322px\",\"left\":\"7px\",\"zIndex\":9999,\"z-index\":9987},\"ue\":null,\"type\":\"text\",\"typename\":\"文本\"},{\"animate\":[{\"name\":\"zoomIn\",\"type\":\"em\",\"style\":\"zoomIn 1s ease 1.5s 1 normal forwards running\"}],\"data\":{\"data\":\"\\n                <div><br></div>\\n            \",\"fontStyle\":\"\"},\"estyle\":{\"background-color\":\"rgba(255,0,128,1)\",\"opacity\":\"0.00\"},\"style\":{\"width\":\"70px\",\"height\":\"70px\",\"top\":\"243px\",\"left\":\"7px\",\"zIndex\":9999,\"z-index\":9986},\"ue\":null,\"type\":\"text\",\"typename\":\"文本\"},{\"animate\":[{\"name\":\"zoomIn\",\"type\":\"em\",\"style\":\"zoomIn 1s ease 1.4s 1 normal forwards running\"}],\"data\":{\"data\":\"\\n                <div><br></div>\\n            \",\"fontStyle\":\"\"},\"estyle\":{\"background-color\":\"rgba(255,0,128,1)\",\"opacity\":\"0.00\"},\"style\":{\"width\":\"70px\",\"height\":\"70px\",\"top\":\"243px\",\"left\":\"84px\",\"zIndex\":9999,\"z-index\":9985},\"ue\":null,\"type\":\"text\",\"typename\":\"文本\"},{\"animate\":[{\"name\":\"zoomIn\",\"type\":\"em\",\"style\":\"zoomIn 1s ease 1.3s 1 normal forwards running\"}],\"data\":{\"data\":\"\\n                <div><br></div>\\n            \",\"fontStyle\":\"\"},\"estyle\":{\"background-color\":\"rgba(255,0,128,1)\",\"opacity\":\"0.00\"},\"style\":{\"width\":\"70px\",\"height\":\"70px\",\"top\":\"243px\",\"left\":\"163px\",\"zIndex\":9999,\"z-index\":9984},\"ue\":null,\"type\":\"text\",\"typename\":\"文本\"},{\"animate\":[{\"name\":\"zoomIn\",\"type\":\"em\",\"style\":\"zoomIn 1s ease 1.2s 1 normal forwards running\"}],\"data\":{\"data\":\"\\n                <div><br></div>\\n            \",\"fontStyle\":\"\"},\"estyle\":{\"background-color\":\"rgba(255,0,128,1)\",\"opacity\":\"0.00\"},\"style\":{\"width\":\"70px\",\"height\":\"70px\",\"top\":\"243px\",\"left\":\"241px\",\"zIndex\":9999,\"z-index\":9983},\"ue\":null,\"type\":\"text\",\"typename\":\"文本\"},{\"animate\":[{\"name\":\"zoomIn\",\"type\":\"em\",\"style\":\"zoomIn 1s ease 1.1s 1 normal forwards running\"}],\"data\":{\"data\":\"\\n                <div><br></div>\\n            \",\"fontStyle\":\"\"},\"estyle\":{\"background-color\":\"rgba(255,0,128,1)\",\"opacity\":\"0.00\"},\"style\":{\"width\":\"70px\",\"height\":\"70px\",\"top\":\"164px\",\"left\":\"241px\",\"zIndex\":9999,\"z-index\":9982},\"ue\":null,\"type\":\"text\",\"typename\":\"文本\"},{\"animate\":[{\"name\":\"zoomIn\",\"type\":\"em\",\"style\":\"zoomIn 1s ease 1s 1 normal forwards running\"}],\"data\":{\"data\":\"\\n                <div><br></div>\\n            \",\"fontStyle\":\"\"},\"estyle\":{\"background-color\":\"rgba(255,0,128,1)\",\"opacity\":\"0.00\"},\"style\":{\"width\":\"70px\",\"height\":\"70px\",\"top\":\"164px\",\"left\":\"163px\",\"zIndex\":9999,\"z-index\":9981},\"ue\":null,\"type\":\"text\",\"typename\":\"文本\"},{\"animate\":[{\"name\":\"zoomIn\",\"type\":\"em\",\"style\":\"zoomIn 1s ease 0.9s 1 normal forwards running\"}],\"data\":{\"data\":\"\\n                <div><br></div>\\n            \",\"fontStyle\":\"\"},\"estyle\":{\"background-color\":\"rgba(255,0,128,1)\",\"opacity\":\"0.00\"},\"style\":{\"width\":\"70px\",\"height\":\"70px\",\"top\":\"164px\",\"left\":\"84px\",\"zIndex\":9999,\"z-index\":9980},\"ue\":null,\"type\":\"text\",\"typename\":\"文本\"},{\"animate\":[{\"name\":\"zoomIn\",\"type\":\"em\",\"style\":\"zoomIn 1s ease 0.8s 1 normal forwards running\"}],\"data\":{\"data\":\"\\n                <div><br></div>\\n            \",\"fontStyle\":\"\"},\"estyle\":{\"background-color\":\"rgba(255,0,128,1)\",\"opacity\":\"0.00\"},\"style\":{\"width\":\"70px\",\"height\":\"70px\",\"top\":\"164px\",\"left\":\"7px\",\"zIndex\":9999,\"z-index\":9979},\"ue\":null,\"type\":\"text\",\"typename\":\"文本\"},{\"animate\":[{\"name\":\"zoomIn\",\"type\":\"em\",\"style\":\"zoomIn 1s ease 0.7s 1 normal forwards running\"}],\"data\":{\"data\":\"\\n                <div><br></div>\\n            \",\"fontStyle\":\"\"},\"estyle\":{\"background-color\":\"rgba(255,0,128,1)\",\"opacity\":\"0.00\"},\"style\":{\"width\":\"70px\",\"height\":\"70px\",\"top\":\"86px\",\"left\":\"7px\",\"zIndex\":9999,\"z-index\":9978},\"ue\":null,\"type\":\"text\",\"typename\":\"文本\"},{\"animate\":[{\"name\":\"zoomIn\",\"type\":\"em\",\"style\":\"zoomIn 1s ease 0.6s 1 normal forwards running\"}],\"data\":{\"data\":\"\\n                <div><br></div>\\n            \",\"fontStyle\":\"\"},\"estyle\":{\"background-color\":\"rgba(255,0,128,1)\",\"opacity\":\"0.00\"},\"style\":{\"width\":\"70px\",\"height\":\"70px\",\"top\":\"86px\",\"left\":\"84px\",\"zIndex\":9999,\"z-index\":9977},\"ue\":null,\"type\":\"text\",\"typename\":\"文本\"},{\"animate\":[{\"name\":\"zoomIn\",\"type\":\"em\",\"style\":\"zoomIn 1s ease 0.5s 1 normal forwards running\"}],\"data\":{\"data\":\"\\n                <div><br></div>\\n            \",\"fontStyle\":\"\"},\"estyle\":{\"background-color\":\"rgba(255,0,128,1)\",\"opacity\":\"0.00\"},\"style\":{\"width\":\"70px\",\"height\":\"70px\",\"top\":\"86px\",\"left\":\"163px\",\"zIndex\":9999,\"z-index\":9976},\"ue\":null,\"type\":\"text\",\"typename\":\"文本\"}],\"slider\":{\"animate\":1,\"autoplay\":false,\"lock\":false,\"time\":5}}', '1', '');

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
INSERT INTO `h5ds_user` VALUES ('1', '馒头', '123456', '676015863@qq.com', '01', '13555555555');
