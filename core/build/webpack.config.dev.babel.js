import path from 'path';
import webpack from 'webpack';
import webpackMerge from 'webpack-merge';
import baseConfig from './webpack.config.base';

const PORT = 8000; // 服务器端口
const HOST = '0.0.0.0'; // '127.0.0.1';

export default webpackMerge(baseConfig, {
    devtool: 'cheap-source-map',
    plugins: [
        // 出错不终止插件
        new webpack.NoEmitOnErrorsPlugin(),
        // 配置全局变量
        new webpack.DefinePlugin({
            __DEV__: true
        })
        // new webpack.HotModuleReplacementPlugin()//热加载插件
    ]
});
