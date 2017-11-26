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
const DEV_PATH = util.root('assets');
const sassExt = new ExtractTextPlugin('assets/css/[name].css');

export default {
    entry: {
        h5ds: ['./assets/h5ds/h5ds.js'],
        ui: ['babel-polyfill', './assets/js/ui.js'],
        app: ['babel-polyfill', './assets/app/js/h5ds.init.js'],
        case: ['./assets/js/case.js'],
        main: [
            './assets/js/index.js',
            './assets/js/help.js',
            './assets/js/login.js',
            './assets/js/plus.js',
            './assets/js/register.js',
            './assets/js/noFind.js'
        ]
    },
    output: {
        publicPath: '/',
        path: util.root('dist'),
        filename: 'assets/js/[name].js'
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
                    name: 'assets/images/[name].[ext]'
                }
            }]
        }]
    },
    plugins: [
        sassExt, // 提取出来的样式放在css-文件中
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, '../assets/plugin'),
            to: path.resolve(__dirname, '../../server-site/dist/assets/plugin'),
            toType: 'dir'
        }, {
            from: path.resolve(__dirname, '../assets/font'),
            to: path.resolve(__dirname, '../../server-site/dist/assets/font'),
            toType: 'dir'
        }, {
            from: path.resolve(__dirname, '../assets/images'),
            to: path.resolve(__dirname, '../../server-site/dist/assets/images'),
            toType: 'dir'
        }])
    ]
};
