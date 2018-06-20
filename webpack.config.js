/**
 * 开发环境配置文件
 *
 * @author  WeiJun_Xiang <xwjune@163.com>
 * @date    2018/01/25
 */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const constants = require('./constants');

module.exports = {
    entry: path.resolve(__dirname, 'src/index.js'),
    devtool: 'source-map',
    output: {
        filename: '[name].[chunkhash:8].js',
        publicPath: '/',
    },
    module: {
        rules: require('./loaders'),
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        // hot: true, // 告诉 dev-server 我们在用 HMR
        // hotOnly: true, // 指定如果热加载失败了禁止刷新页面 (这是 webpack 的默认行为)，这样便于我们知道失败是因为何种错误
        port: constants.PORT,
        progress: true,
        inline: true,
    },
    resolve: {
        alias: {
            element: path.resolve(__dirname, 'src/element.js'),
        },
    },
    plugins: [
        new webpack.DefinePlugin({
            API_USER: JSON.stringify(constants.API_USER),
            APP_VERSION: JSON.stringify(constants.VERSION),
            APP_ENV: JSON.stringify(constants.ENV),
        }),
        // 提供公共代码
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: '[name].[chunkhash:8].js',
        }),
        new ExtractTextPlugin('[name].[contenthash:8].css'),
        new CopyWebpackPlugin([
            { from: 'static', to: 'static' }
        ]),
        // new webpack.HotModuleReplacementPlugin(),  // 启用热替换
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'index.html'),
        }),
    ],
};
