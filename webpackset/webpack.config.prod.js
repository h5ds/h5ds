const { resolve, theme } = require('./config');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const baseConfig = require('./webpack.config.base');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = webpackMerge(baseConfig('src', 'dist'), {
  // devtool: 'source-map',
  entry: {
    main: resolve('../src/index.js') // 主网站入口
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        include: [resolve('../node_modules'), resolve('../src')],
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
            warnings: false, // 去除warning警告
            // drop_debugger: true,// 发布时去除debugger语句
            // drop_console: true, // 发布时去除console语句
            pure_funcs: ['console.log'] // 配置发布时，不被打包的函数，只去掉console.log
          }
        }
      })
    ],
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'common',
          priority: 10,
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          minChunks: 3 // 引用3次就要打包出来
        }
      }
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `assets/css/[name].css`
    }),
    new CleanWebpackPlugin({
      root: __dirname.replace('webpackset', 'dist')
    }),
    new webpack.DefinePlugin({
      __DEV__: false
    })
  ]
});
