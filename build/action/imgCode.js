var captchapng = require('captchapng');

// 获取验证码
exports.imgCode = function (req, res) {
  var code = parseInt(Math.random() * 9000 + 1000, 10);
  req.session['code'] = code;
  var p = new captchapng(80, 30, code); // width,height,numeric captcha 
  p.color(255, 84, 2, 255); // First color: background (red, green, blue, alpha) 
  p.color(255, 124, 67, 255); // Second color: paint (red, green, blue, alpha) 
  var img = p.getBase64();
  var imgbase64 = new Buffer(img, 'base64');
  res.writeHead(200, {
    'Content-Type': 'image/png'
  });
  res.end(imgbase64);

}
