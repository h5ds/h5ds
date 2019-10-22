const fs = require('fs');
const { resolve, theme, packSpecifiedPlugins, rootPath } = require('./config');
// webpack 配置文档
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
let plugins = packSpecifiedPlugins ? packSpecifiedPlugins : fs.readdirSync(rootPath('./src/plugins'));
const pluginConf = {
  mode: 'production',
  entry: {},
  output: {
    publicPath: '/',
    path: resolve('../dist-plugins'),
    filename: `plugins/[name]/index.js`,
    libraryTarget: 'umd'
  },
  // externals: [nodeExternals()],
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    'react-router': 'ReactRouter',
    'react-router-dom': 'ReactRouterDOM',
    mobx: 'mobx',
    PubSub: 'PubSub',
    lodash: '_',
    antd: 'antd',
    moment: 'moment'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.esm', '.css', '.less'],
    alias: {}
  },
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({}),
      new TerserPlugin({
        sourceMap: true, // Must be set to true if using source-maps in production
        terserOptions: {
          compress: {
            warnings: false, // 去除warning警告
            // drop_debugger: true,// 发布时去除debugger语句
            // drop_console: true, // 发布时去除console语句
            pure_funcs: ['console.log'] // 配置发布时，不被打包的函数
          }
        }
      })
    ],
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'common/editor',
          priority: 10, // 优先级
          test: /react|mobx|antd|moment/,
          chunks: 'initial',
          minSize: 0, // 默认小于30kb不会打包
          minChunks: 9999999999999 // 引用1次就要打包出来， 只需要单独打包react，mobx，antd
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [resolve('../src')],
        use: ['babel-loader']
      },
      {
        test: /\.(css|less)$/,
        include: [resolve('../src')],
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          `less-loader?{javascriptEnabled: true, modifyVars: ${JSON.stringify(theme)}}`
        ]
      },
      {
        test: /\.(woff|eot|ttf|svg)$/,
        include: resolve('../src'),
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
        test: /\.html$/,
        loader: 'html-loader?minimize=false'
      },
      {
        // 图片加载处理
        test: /\.(png|jpg|jpeg|gif|ico|svg)$/,
        include: resolve('../src'),
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1,
              name: 'assets/images/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `plugins/[name]/style.css`
    }),
    new CaseSensitivePathsPlugin()
  ]
};
plugins.forEach(name => {
  console.log(name);
  pluginConf.entry[`${name}/editor`] = rootPath(`./src/plugins/${name}/index.js`);
});
module.exports = pluginConf;
