var captchapng = require('captchapng');

// /*
// ** randomWord 产生任意长度随机字母数字组合
// ** randomFlag-是否任意长度 min-任意长度最小位[固定位数] max-任意长度最大位
// ** xuanfeng 2014-08-28
// */
// function randomWord(randomFlag, min, max) {
//     var str = "",
//         range = min,
//         arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

//     // 随机产生
//     if (randomFlag) {
//         range = Math.round(Math.random() * (max - min)) + min;
//     }
//     for (var i = 0; i < range; i++) {
//         var pos = Math.round(Math.random() * (arr.length - 1));
//         console.log(pos);
//         str += arr[pos];
//     }
//     return str;
// }

// 获取验证码
exports.imgCode = function (req, res) {
    var code = parseInt(Math.random()*9000+1000);
    req.session.code = code;
    var p = new captchapng(80, 30, code); // width,height,numeric captcha 
    p.color(255, 84, 2, 255);  // First color: background (red, green, blue, alpha) 
    p.color(255, 124, 67, 255); // Second color: paint (red, green, blue, alpha) 
    var img = p.getBase64();
    var imgbase64 = new Buffer(img, 'base64');
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    res.end(imgbase64);

}