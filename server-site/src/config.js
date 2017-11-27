const path = require('path');

module.exports = {
    conf: {},
    dbConf: {
        host: '192.168.1.200',
        port: '3308',
        database: 'h5ds_db',
        user: 'root',
        password: 'humin',
        poolMaxCount: 5,
        consoleLog: false // 是否打印sql
    },
    routeFolder: path.join(__dirname, 'routes'),
    host: '127.0.0.1',
    port: 8090
};
