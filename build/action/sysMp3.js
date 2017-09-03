var { result } = require('../lib/result');
var { readSQL } = require('../sql/readSQL');

/**
 * @desc 获取系统图片
*/
exports.getSysMp3 = function (req, res) {

    // 获取系统图片，name = ''
    let obj = {
        name: req.body.name || '',
        type: req.body.type || ''
    };
    readSQL({
        req: req,
        obj: obj,
        table: 'h5ds_mp3',
        like: true,
        callBack: (ret) => {
            if (ret) {
                result(req, res, {
                    code: 200,
                    data: ret[0],
                    count: ret[1],
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
        }
    });
}