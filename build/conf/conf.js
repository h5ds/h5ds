// 基本配置
exports.conf = {};

// 数据库配置
exports.dbConf = {
    user: 'root',
    password: '123456',
    host: '127.0.0.1',
    port: '3306',
    database: 'h5ds',
    multipleStatements: true // 否许一个query中有多个MySQL语句
};

// 全局变量 , 主域，端口
exports.HOST = 'http://127.0.0.1';
exports.PORT = '8090';