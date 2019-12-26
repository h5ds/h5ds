const { resolve, theme } = require('./config');
// const nodeExternals = require('webpack-node-externals');
// webpack 配置文档
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');
// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = webpackMerge(baseConfig(`src`, `dist`), {
  mode: 'production',
  // mode: 'development',
  entry: {
    editor: resolve('../src/h5ds-core/h5dsEditorSDK.js'), // lib入口
    swiper: resolve('../src/h5ds-core/h5ds-app-preview/index.js') // 插件入口
  },
  output: {
    publicPath: '/',
    path: resolve('../libs'),
    filename: `[name]/index.js`,
    // library: ['plugins', '[name]'],
    libraryExport: 'default',
    libraryTarget: 'umd'
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    'react-router': 'ReactRouter',
    'react-router-dom': 'ReactRouterDOM',
    PubSub: 'PubSub',
    mobx: 'mobx',
    lodash: '_',
    antd: 'antd', // 这个是直接引用的
    moment: 'moment' // 这个是直接引用的
  },
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        include: [resolve('../src'), resolve('../node_modules')],
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          `less-loader?{javascriptEnabled: true, modifyVars: ${JSON.stringify(theme)}}`
        ]
      }
    ]
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        sourceMap: false, // Must be set to true if using source-maps in production
        terserOptions: {
          compress: {
            warnings: false, // 去除warning警告
            // drop_debugger: true,// 发布时去除debugger语句
            // drop_console: true, // 发布时去除console语句
            pure_funcs: ['console.log'] // 配置发布时，不被打包的函数
          }
        }
      })
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `[name]/style.css`
    }),
    new CaseSensitivePathsPlugin(),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [__dirname.replace('webpackset', 'libs')]
    })
  ]
});
