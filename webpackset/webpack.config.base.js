const { resolve, theme, version } = require('./config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// webpack 配置文档
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (src, dist) => {
  const distPath = resolve(`../${dist}`);
  const srcPath = resolve(`../${src}`);
  return {
    output: {
      publicPath: '/',
      path: distPath,
      filename: `assets/js/[name].${version}.js`
    },
    externals: ['React', 'ReactDOM', 'ReactRouter', 'ReactRouterDOM', 'mobx', '_', 'antd', 'PubSub', 'moment'],
    resolve: {
      extensions: ['.js', '.jsx', '.es', '.css', '.less'],
      alias: {
        '@': resolve('../src')
      }
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          include: [srcPath],
          use: ['babel-loader']
        },
        {
          test: /\.(css|less)$/,
          include: [srcPath, resolve('../node_modules')],
          use: [
            { loader: 'style-loader', options: {} },
            { loader: 'css-loader', options: { sourceMap: true } },
            { loader: 'postcss-loader', options: { sourceMap: true } },
            { loader: 'less-loader', options: { sourceMap: true, javascriptEnabled: true, modifyVars: theme } }
          ]
        },
        {
          test: /\.(woff|eot|ttf|svg)$/,
          include: [srcPath],
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10,
                name: 'assets/fonts/[name].[ext]'
              }
            }
          ]
        },
        {
          // 图片加载处理
          test: /\.(png|jpg|jpeg|gif|ico|svg)$/,
          include: [srcPath],
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 1,
                name: 'assets/images/[name].[ext]'
              }
            }
          ]
        },
        {
          test: /\.html$/,
          loader: 'html-loader?minimize=false'
        }
      ]
    },
    plugins: [
      new CaseSensitivePathsPlugin(),
      new HtmlWebpackPlugin({
        hash: false,
        template: resolve(`../${src}/index.html`),
        filename: 'index.html'
      }),
      new CopyWebpackPlugin([
        {
          from: resolve(`../${src}/assets`),
          to: resolve(`../${dist}/assets`),
          toType: 'dir'
        }
      ])
    ]
  };
};
