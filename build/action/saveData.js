var { result } = require('../lib/result');
var fs = require('fs');
var path = require('path');
var { updateSQL } = require('../sql/updateSQL');
var { createSQL } = require('../sql/createSQL');
var sd = require('silly-datetime');
var Sequelize = require('sequelize');

/***
 * @desc 循环创建目录
 * @param dirpath 路径 
 * @param mode 权限 0777 
 * @param callback 回调函数 
*/
function mkdirs(dirpath, mode, callback) {
    fs.exists(dirpath, function (exists) {
        if (exists) {
            callback(dirpath);
        } else {
            //尝试创建父目录，然后再创建当前目录
            mkdirs(path.dirname(dirpath), mode, function () {
                fs.mkdir(dirpath, mode, callback);
            });
        }
    });
}

// 保存文件
function saveToHtmlFile(shtml, ph) {
    // 保存
    fs.writeFile(process.cwd() + ph + '/index.html', shtml, function (error){
        if(error) throw error ;
        // console.log('成功') ;
    });
}

// 保存app
exports.saveData = function(req, res) {
    let uid = req.session.user.id;
    let appid = parseInt(req.body.id, 10);
    let ph = `/apps/${uid}/${appid}`;

    // 创建目录
    mkdirs(`${process.cwd()}/apps/${uid}/${appid}`, '0777', (d) => {

        // 保存文件
        saveToHtmlFile(req.body.shtml, ph);

        // 保存sql
        updateSQL('h5ds_apps', {
            id: { type: Sequelize.INTEGER, primaryKey: true },
            name: { type: Sequelize.CHAR },
            url: { type: Sequelize.CHAR },
            pic: { type: Sequelize.CHAR },
            des: { type: Sequelize.CHAR },
            date: { type: Sequelize.CHAR },
            data: { type: Sequelize.TEXT('long') }
        }, {
            name: req.body.name,
            url: ph + '/index.html',
            pic: req.body.pic,
            des: req.body.des,
            date: sd.format(new Date(), 'YYYY/MM/DD HH:mm:ss'),
            data: req.body.data
        }, {owner: uid, id: appid}, (ret) => {
            if (ret) {
                result(req, res, {
                    code: 200,
                    data: ph + '/index.html',
                    msg: "成功",
                    success: true
                });
            } else {
                // 返回值
                result(req, res, {
                    code: 500,
                    data: ret,
                    msg: "失败",
                    success: false
                })
            }
        });
    });

}