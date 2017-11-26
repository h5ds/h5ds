// webpack 配置文档
import webpack from 'webpack';
import path from 'path';
import precss from 'precss';
import autoprefixer from 'autoprefixer';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin'; // css样式从js文件中分离出来
import HtmlInjectPlugin from 'html-inject-webpack-plugin/src/index'; // include html
import CopyWebpackPlugin from 'copy-webpack-plugin';
// import CleanWebpackPlugin from 'clean-webpack-plugin';
const util = require('./util');

const ROOT_PATH = util.root();
const DEV_PATH = util.root('src');
const sassExt = new ExtractTextPlugin('css/[name].css');

export default {
    entry: {
        h5ds: ['./src/h5ds/h5ds.js'],
        ui: ['babel-polyfill', './src/js/ui.js'],
        app: ['babel-polyfill', './src/app/js/h5ds.init.js'],
        case: ['./src/js/case.js'],
        main: [
            './src/js/index.js',
            './src/js/help.js',
            './src/js/login.js',
            './src/js/plus.js',
            './src/js/register.js',
            './src/js/noFind.js'
        ]
    },
    stats: 'minimal',
    output: {
        publicPath: '/',
        path: util.root('dist'),
        filename: 'js/[name].js'
    },
    resolve: {
        extensions: ['.js', '.scss', '.css']
    },
    module: {
        rules: [{
            test: /\.js$/,
            include: DEV_PATH,
            use: ['babel-loader']
        }, {
            test: /\.html$/,
            loader: 'html-loader?minimize=false'
        }, {
            test: /\.(css|scss)$/,
            include: DEV_PATH,
            use: sassExt.extract(['css-loader', 'postcss-loader', 'sass-loader'])
        }, {
            test: /\.(png|jpg|jpeg|gif|ico|svg)$/,
            include: DEV_PATH,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 1,
                    name: 'images/[name].[ext]'
                }
            }]
        }]
    },
    plugins: [
        sassExt, // 提取出来的样式放在css-文件中
        new CopyWebpackPlugin([{
            from: util.root('src/plugin'),
            to: util.root('dist/plugin'),
            toType: 'dir'
        }, {
            from: util.root('src/font'),
            to: util.root('dist/font'),
            toType: 'dir'
        }, {
            from: util.root('src/images'),
            to: util.root('dist/images'),
            toType: 'dir'
        }])
    ]
};
