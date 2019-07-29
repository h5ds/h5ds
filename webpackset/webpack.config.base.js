const { webPath } = require('./config');

// webpack 配置文档
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.esm', '.css', '.less'],
    alias: {}
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|esm)$/,
        include: [webPath],
        use: ['babel-loader']
      },
      {
        test: /\.(woff|eot|ttf|svg)$/,
        include: [webPath],
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
        include: [webPath],
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
  plugins: [new CaseSensitivePathsPlugin()]
};
