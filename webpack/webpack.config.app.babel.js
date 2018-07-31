import { resolve, src, version } from './conf';

import ExtractTextPlugin from 'extract-text-webpack-plugin';
import baseConfig from './webpack.config.base';
import { theme } from './theme';
import webpack from 'webpack';
import webpackMerge from 'webpack-merge';

//  只打包APP页面的js

const extractStyle = new ExtractTextPlugin(`assets/css/[name].${version}.css`);

export default webpackMerge(baseConfig, {
  devtool: 'source-map',
  entry: {
    plus: [resolve('../src/pages/home/layers/plus.js')] // 第三方插件的附带方法
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [resolve(src)],
        use: ['babel-loader']
      },
      {
        test: /\.(css|less)$/,
        include: [resolve(src)],
        use: extractStyle.extract([
          'css-loader',
          'postcss-loader',
          `less-loader?{javascriptEnabled: true, modifyVars: ${JSON.stringify(theme)}}`
        ])
      }
    ]
  },
  plugins: [
    extractStyle,
    new webpack.DefinePlugin({
      // 配置全局变量
      'process.env.NODE_ENV': JSON.stringify('production'),
      __DEV__: false
    })
    // new webpack.optimize.UglifyJsPlugin({})
  ]
});
