const path = require('path');

const resolve = url => path.resolve(__dirname, url);

module.exports = {
  theme: {},
  rootPath: (...args) => path.join(__dirname, '..', ...args),
  resolve,
  webPath: resolve('../src'),
  version: '5.0.0'
};
