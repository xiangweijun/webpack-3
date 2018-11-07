/**
 * 生产环境配置文件
 *
 * @author xwjun <xwjune@163.com>
 * @date 2018/01/25
 */

const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const loaders = require('./loaders');
const constants = require('./constants');

let publicPath = `/${constants.APPVER}/`;
if (constants.PATHS !== '') {
    publicPath = `/${constants.PATHS}/${constants.APPVER}/`;
}

module.exports = {
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        filename: '[name].[chunkhash:8].js',
        path: path.join(__dirname, `dist/${constants.APPVER}`),
        publicPath,
    },
    module: {
        rules: loaders,
    },
    resolve: {
        alias: {
            element: path.resolve(__dirname, 'src/element.js'),
        },
    },
    plugins: [
        new CleanWebpackPlugin(path.join(__dirname, 'dist')),
        new webpack.DefinePlugin({
            API: JSON.stringify(constants.API),
            APPVER: JSON.stringify(constants.APPVER),
            APPENV: JSON.stringify(constants.APPENV),
        }),
        // 提供公共代码
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: '[name].[chunkhash:8].js',
        }),
        new ExtractTextPlugin('[name].[contenthash:8].css'),
        new CopyWebpackPlugin([
            { from: 'static', to: 'static' },
        ]),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            output: {
                comments: false, // 注释
            },
            mangle: false,
            compressor: {
                pure_getters: true,
                unsafe: true,
                unsafe_comps: true,
                warnings: false,
            },
        }),
        new webpack.BannerPlugin(`v${constants.APPVER} | Copyright © ${new Date().getFullYear()} xwjun-Inc. All rights reserved.`),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'index.html'),
            filename: '../index.html',
        }),
    ],
};
