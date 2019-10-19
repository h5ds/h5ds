const path = require('path');
const resolve = url => path.resolve(__dirname, url);

module.exports = {
  resolve,
  port: 7701,
  host: '127.0.0.1',
  distPath: resolve('../dist'),
  version: '1.0.0',
  theme: {}
};
