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

const ROOT_PATH = path.resolve(__dirname);
const DEV_PATH = path.join(__dirname, 'dev/assets');
const sassExt = new ExtractTextPlugin('assets/css/[name].css');
// const appExt = new ExtractTextPlugin('assets/css/[name].css');

export default {
    entry: {
        h5ds: ['./dev/assets/h5ds/h5ds.js'],
        ui: ['babel-polyfill', './dev/assets/js/ui.js'],
        app: ['babel-polyfill', './dev/assets/app/js/h5ds.init.js'],
        case: ['./dev/assets/js/case.js'],
        main: [
            './dev/assets/js/index.js',
            './dev/assets/js/help.js',
            './dev/assets/js/login.js',
            './dev/assets/js/plus.js',
            './dev/assets/js/register.js',
            './dev/assets/js/noFind.js'
        ]
    },
    output: {
        publicPath: '/',
        path: path.resolve(__dirname, 'build'),
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
        },
        {
            test: /\.html$/,
            loader: 'html-loader?minimize=false'
        },
        {  // 项目scss加载处理
            test: /\.(css|scss)$/,
            include: DEV_PATH,
            use: sassExt.extract(['css-loader', 'postcss-loader', 'sass-loader'])
        },
        { // 图片加载处理
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
        new HtmlWebpackPlugin({
            hash: true,
            chunks: ['app', 'h5ds'],
            template: './dev/html/edit.html', // 当前目录下
            filename: 'tpl/edit.html' // 生成到build目录
        }),
        new HtmlWebpackPlugin({
            hash: true,
            chunks: ['main'],
            template: './dev/html/index.html', // 当前目录下
            filename: 'tpl/index.html' // 生成到build目录
        }),
        new HtmlWebpackPlugin({
            hash: true,
            chunks: ['case'],
            template: './dev/html/case.html', // 当前目录下
            filename: 'tpl/case.html' // 生成到build目录
        }),
        new HtmlWebpackPlugin({
            hash: true,
            chunks: ['main'],
            template: './dev/html/login.html', // 当前目录下
            filename: 'tpl/login.html' // 生成到build目录
        }),
        new HtmlWebpackPlugin({
            hash: true,
            chunks: ['main'],
            template: './dev/html/plus.html', // 当前目录下
            filename: 'tpl/plus.html' // 生成到build目录
        }),
        new HtmlWebpackPlugin({
            hash: true,
            chunks: ['main'],
            template: './dev/html/register.html', // 当前目录下
            filename: 'tpl/register.html' // 生成到build目录
        }),
        new HtmlWebpackPlugin({
            hash: true,
            chunks: ['ui'],
            template: './dev/html/ui.html', // 当前目录下
            filename: 'tpl/ui.html' // 生成到build目录
        }),
        new HtmlWebpackPlugin({
            hash: true,
            chunks: ['main'],
            template: './dev/html/noFind.html', // 当前目录下
            filename: 'tpl/noFind.html' // 生成到build目录
        }),
        new HtmlInjectPlugin({ // html 拆分
            bodys: [{
                flagname: 'meta',
                template: path.resolve(__dirname, './dev/html/common/meta.html')
            }, {
                flagname: 'footer',
                template: path.resolve(__dirname, './dev/html/common/footer.html')
            }, {
                flagname: 'header',
                template: path.resolve(__dirname, './dev/html/common/header.html')
            }]
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, './dev/assets/plugin'),
                to: path.resolve(__dirname, './build/assets/plugin'),
                toType: 'dir'
            },
            {
                from: path.resolve(__dirname, './dev/assets/font'),
                to: path.resolve(__dirname, './build/assets/font'),
                toType: 'dir'
            },
            {
                from: path.resolve(__dirname, './dev/assets/images'),
                to: path.resolve(__dirname, './build/assets/images'),
                toType: 'dir'
            }
        ])
    ]
};