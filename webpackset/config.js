const path = require('path');
const resolve = url => path.resolve(__dirname, url);

module.exports = {
  rootPath: (...args) => path.join(__dirname, '..', ...args),
  packSpecifiedPlugins: false, // 插件打包配置选项；如果是false打包src/plugins 全部插件，如果是['demo'] 打包指定的插件
  resolve,
  port: 7701,
  host: '127.0.0.1',
  distPath: resolve('../dist'),
  version: '1.0.0',
  theme: {}
};
