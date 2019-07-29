const { version, resolve, webPath, theme } = require('./config');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.config.base');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const internalIp = require('internal-ip');

const ip = internalIp.v4.sync();
console.log('当前ip地址：', ip);

const host = '127.0.0.1';
const port = 9000;

module.exports = webpackMerge(baseConfig, {
  entry: [
    'webpack-dev-server/client?http://' + host + ':' + port, //  为webpack-dev-server的环境打包好运行代码
    'webpack/hot/only-dev-server', // 为热替换（HMR）打包好运行代码,//  only- 意味着只有成功更新运行代码才会执行热替换（HMR）
    resolve('../src/index.js')
  ],
  output: {
    publicPath: '/',
    path: resolve('../dist'),
    filename: `assets/js/[name].${version}.js`
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        include: [webPath, resolve('../lib'), resolve('../node_modules')],
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: { sourceMap: false } },
          { loader: 'postcss-loader', options: { sourceMap: false } },
          { loader: 'less-loader', options: { sourceMap: false, javascriptEnabled: true, modifyVars: theme } }
        ]
      }
    ]
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new CopyWebpackPlugin([
      {
        from: resolve('../src/assets'),
        to: resolve('../dist/assets'),
        toType: 'dir'
      }
    ]),
    new HtmlWebpackPlugin({
      hash: false,
      template: resolve('../src/index.html'),
      filename: 'index.html'
    }),
    new webpack.DefinePlugin({
      DEV_HOST: JSON.stringify(ip)
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    host,
    port,
    inline: true,
    hot: true,
    disableHostCheck: true,
    historyApiFallback: true, // using html5 router.
    contentBase: resolve('../dist')
  }
});
