
/**
 * @desc 返回参数
*/
exports.result = function (req, res, {
    code = 200,
    data = null,
    count = null,
    msg = '成功',
    success = true
}) {
    var result = {
        code: code,
        data: data,
        msg: msg,
        count: count,
        success: success
    }
    res.writeHead(200, { 'content-type': 'text/json; charset=UTF-8' });
    res.write(JSON.stringify(result));
    res.end();
}