import { dist, resolve, src, version } from './conf';

import CleanWebpackPlugin from 'clean-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import baseConfig from './webpack.config.base';
import { theme } from './theme';
import webpack from 'webpack';
import webpackMerge from 'webpack-merge';

// const extractAntd = new ExtractTextPlugin('assets/css/h5ds.ui.css'); // antd 的 css
const extractStyle = new ExtractTextPlugin(`assets/css/[name].${version}.css`);

export default webpackMerge(baseConfig, {
    devtool: 'source-map',
    entry: {
        ['h5ds']: resolve('../src/app.js'), // 主网站入口
        ['h5ds.plus']: [resolve('../src/pages/home/layers/plus.js')]
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: resolve(src),
                use: ['babel-loader']
            },
            {
                test: /\.(css|less)$/,
                include: [resolve('../node_modules'), resolve(src)],
                use: extractStyle.extract([
                    'css-loader',
                    'postcss-loader',
                    `less-loader?{javascriptEnabled: true, modifyVars: ${JSON.stringify(theme)}}`
                ])
            }
        ]
    },
    plugins: [
        // extractAntd,
        extractStyle,
        new HtmlWebpackPlugin({
            chunks: ['h5ds'],
            template: resolve(src + '/index.html'),
            filename: 'index.html'
        }),
        new CleanWebpackPlugin([dist.replace('../', '') + '/assets'], {
            root: __dirname.replace('webpack', '')
        }),
        new webpack.DefinePlugin({
            // 配置全局变量
            'process.env.NODE_ENV': JSON.stringify('production'),
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
