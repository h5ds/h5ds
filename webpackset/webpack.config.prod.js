const { resolve, webPath, theme, version } = require('./config');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.config.base');
// const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const Uglifyjs = require('uglifyjs-webpack-plugin');

module.exports = webpackMerge(baseConfig, {
  // devtool: 'source-map',
  entry: {
    main: resolve('../src/index.js') // 主网站入口
  },
  output: {
    publicPath: '/',
    path: resolve('../dist'),
    filename: `assets/js/[name].js`
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        include: [resolve('../node_modules'), webPath, resolve('../lib')],
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
      new OptimizeCSSAssetsPlugin({}),
      new TerserPlugin({
        sourceMap: true, // Must be set to true if using source-maps in production
        terserOptions: {
          compress: {
            drop_console: true
          }
        }
      })
    ],
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'common', // 和build:editor保持路径一致，引用才不会出错
          priority: 10, // 优先级
          // test: /react|mobx|antd|moment/,
          test: /node_modules/,
          chunks: 'initial',
          // minSize: 0, // 默认小于30kb不会打包
          minChunks: 4 // 引用1次就要打包出来， 只需要单独打包react，mobx，antd
        }
      }
    }
  },
  plugins: [
    new Uglifyjs(),
    new MiniCssExtractPlugin({
      filename: `assets/css/[name].${version}.css`
    }),
    new CleanWebpackPlugin({
      root: __dirname.replace('webpackset', 'dist')
    }),
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
    })
  ]
});
