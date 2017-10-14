var { HOST } = require('../conf/conf.js');
var formidable = require('formidable');
var fs = require('fs'); // 用于处理本地文件
var { createSQL } = require('../sql/createSQL');
var { result } = require('../lib/result');
var Sequelize = require('sequelize');

// 文件上传
exports.upload = function (req, res) {
    //创建表单上传
    var form = new formidable.IncomingForm();
    //设置编辑
    form.encoding = 'utf-8';
    //设置文件存储路径
    form.uploadDir = "upload/";
    //保留后缀
    form.keepExtensions = true;
    //设置单文件大小限制    
    form.maxFieldsSize = 2 * 1024 * 1024;
    //form.maxFields = 1000;  设置所以文件的大小总和
    form.parse(req, function (err, fields, files) {
        var file = null;
        for (var key in files) {
            file = files[key];
        }
        let data = {
            url: '/' + file.path,
            name: file.name,
            size: file.size,
            type: file.type,
            owner: req.session.user.id
        };
        createSQL({
            obj: data,
            table: 'h5ds_imgs_user',
            sequeObj: {
                name: { type: Sequelize.CHAR },
                size: { type: Sequelize.CHAR },
                type: { type: Sequelize.CHAR },
                owner: { type: Sequelize.CHAR },
                url: { type: Sequelize.CHAR }
            },
            callBack: (ret) => {
                if (ret) {
                    result(req, res, {
                        code: 200,
                        data: data,
                        msg: "成功",
                        success: true,
                        count: ret[1]
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
            }
        });
    });
}

// 文件上传
exports.uploadBase64 = function (req, res) {
    //接收前台POST过来的base64
    var imgData = req.body.imgData;
    //过滤data:URL
    var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
    var dataBuffer = new Buffer(base64Data, 'base64');
    var name = req.body.name || 'h2c_' + +new Date();
    fs.writeFile("upload/" + name + '.png', dataBuffer, function (err) {
        if (err) {
            res.send(err);
        } else {
            result(req, res, {
                code: 200,
                data: {
                    src: "/upload/" + name + ".png"
                },
                msg: "成功！",
                success: true
            });
        }
    });
}