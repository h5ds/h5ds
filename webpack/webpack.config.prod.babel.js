import { dist, resolve, src } from "./conf";

import CleanWebpackPlugin from "clean-webpack-plugin";
import ExtractTextPlugin from "extract-text-webpack-plugin";
import baseConfig from "./webpack.config.base";
import { theme } from "./theme.js";
import webpack from "webpack";
import webpackMerge from "webpack-merge";

const extractMTUI = new ExtractTextPlugin("assets/css/mtui.css");
const extractStyle = new ExtractTextPlugin(`assets/css/[name].[hash:8].css`);

export default webpackMerge(baseConfig, {
  devtool: "source-map",
  entry: {
    main: resolve(src + "/index.jsx"), // 主网站入口
    common: ["react", "react-dom", "react-router"]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: resolve(src),
        use: ["babel-loader"]
      },
      {
        test: /\.(css|less)$/,
        include: /node_modules/,
        use: extractMTUI.extract([
          "css-loader",
          "postcss-loader",
          `less-loader?{javascriptEnabled: true, modifyVars: ${JSON.stringify(
            theme
          )}}`
        ])
      },
      {
        test: /\.(css|less)$/,
        include: resolve(src),
        use: extractStyle.extract([
          "css-loader",
          "postcss-loader",
          `less-loader?{javascriptEnabled: true, modifyVars: ${JSON.stringify(
            theme
          )}}`
        ])
      }
    ]
  },
  plugins: [
    extractMTUI,
    extractStyle,
    new CleanWebpackPlugin([dist.replace("../", "") + "/assets"], {
      root: __dirname.replace("webpack", "")
    }),
    // 提取主页面和魔盒页面共享的公共模块
    new webpack.optimize.CommonsChunkPlugin("common"),
    new webpack.DefinePlugin({
      // 配置全局变量
      "process.env.NODE_ENV": JSON.stringify("production"),
      __DEV__: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_debugger: true,
        drop_console: true
      }
    })
  ]
});
