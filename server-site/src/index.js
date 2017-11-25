const path = require('path');
var express = require('express');
var events = require('events');
var bodyParser = require('body-parser'); // 中间键读取post数据解析
var session = require('express-session');
var cookieParser = require('cookie-parser');
var compress = require('compression');
var ejs = require('ejs');
const expressArtTemplate = require('express-art-template');

const { util } = require('./common');
const config = require('./config');
// express
const app = express();

// 设置模板引擎

// set template engine
const rules = expressArtTemplate.template.defaults.rules;
rules.shift();
rules[0].test = new RegExp(rules[0].test.source.replace('{{', '\\[\\[').replace('}}', '\\]\\]'));
app.set('view options', {
    debug: process.env.NODE_ENV !== 'production'
});
app.engine('.html', expressArtTemplate);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use(compress()); // gzip  + nginx gzip
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
app.use(bodyParser.json());

const staticResources = [
    'assets', // 静态资源
    'upload', // 上传图片
    'json', // 存放测试 json
    'mp3', // 存放mp3
    'apps', // 存放app
    'images' // 存放爬取的图片
];
staticResources.forEach(name => {
    console.log(name, util.root(name));
    app.use(`/${name}`, express.static(util.root(name)));
});

// 使用session
app.use(cookieParser());
app.use(session({
    resave: true, // don't save session if unmodified  
    saveUninitialized: false, // don't create session until something stored  
    secret: 'h5ds'
}));



// 设置路由
util.loadRoutes(app, config.routeFolder);

const server = app.listen(config.port, config.host, err => {
    const addr = server.address();
    console.log('服务器启动，监听 port：', addr.port, ' running~');
});
