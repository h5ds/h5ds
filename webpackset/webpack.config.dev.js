const { distPath, host, port, resolve } = require('./config');

const baseConfig = require('./webpack.config.base');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

module.exports = webpackMerge(baseConfig(`src`, `dist`), {
  entry: [
    'webpack-dev-server/client?http://' + host + ':' + port, //  为webpack-dev-server的环境打包好运行代码
    'webpack/hot/only-dev-server', // 为热替换（HMR）打包好运行代码,//  only- 意味着只有成功更新运行代码才会执行热替换（HMR）
    resolve(`../src/index.js`)
  ],
  mode: 'development',
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: true
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    host,
    port,
    inline: true,
    hot: true,
    disableHostCheck: true,
    historyApiFallback: true, // using html5 router.
    contentBase: distPath
  }
});
