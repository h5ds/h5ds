var express = require('express');
var events = require('events');
var bodyParser = require('body-parser'); // 中间键读取post数据解析
var session = require('express-session');
var cookieParser = require('cookie-parser');
var compress = require('compression');
var ejs = require('ejs');

var { PORT } = require('./conf/conf.js');
var router = require('./router.js');

// express
const app = express();

app.engine('ejs', ejs.renderFile);
app.set('views', __dirname + '/tplEjs');

app.use(compress()); // gzip  + nginx gzip
//限制3M
//app.use(express.limit(1048576 * 3));  //1048576b = 1M
//app.use(express.json({limit: '50mb'}));
// 添加 body-parser 中间件，就可以req接收客户端返回的数据
// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }))
// parse application/json 
app.use(bodyParser.json())

// 使用session
app.use(cookieParser());
app.use(session({  
    resave: true, // don't save session if unmodified  
    saveUninitialized: false, // don't create session until something stored  
    secret: 'h5ds'  
}));

// 设置路由
router(app, express);

app.listen(PORT, function() {
    console.log('服务器启动，监听 port： ' + PORT + '  running~');
});