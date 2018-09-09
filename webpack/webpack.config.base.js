// webpack 配置文档

import { dist, resolve, src, version } from "./conf";

import CopyWebpackPlugin from "copy-webpack-plugin";
import ExtractTextPlugin from "extract-text-webpack-plugin"; // css样式从js文件中分离出来

// import webpack from "webpack";

const sassExt = new ExtractTextPlugin(`assets/css/[name].${version}.css`);

export default {
  output: {
    publicPath: "/",
    path: resolve(dist),
    filename: `assets/js/[name].${version}.js`
  },
  resolve: {
    extensions: [".js", ".jsx", ".scss", ".css", ".less"],
    alias: {
      "@": resolve(src),
      conf: resolve(src + "/conf")
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: resolve(src),
        use: ["babel-loader"]
      },
      {
        test: /\.(woff|eot|ttf|svg)$/,
        include: resolve(src),
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10,
              name: "assets/fonts/[name].[ext]"
            }
          }
        ]
      },
      {
        test: /\.html$/,
        loader: "html-loader?minimize=false"
      },
      {
        // 图片加载处理
        test: /\.(png|jpg|jpeg|gif|ico|svg)$/,
        include: resolve(src),
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 1,
              name: "assets/images/[name].[ext]"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    sassExt, // 提取出来的样式放在css-文件中
    new CopyWebpackPlugin([
      {
        from: resolve(src + "/assets"),
        to: resolve(dist + "/assets"),
        toType: "dir"
      }
    ])
  ]
};
