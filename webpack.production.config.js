/**
 * 生产环境配置文件
 *
 * @author  WeiJun_Xiang <xwjune@163.com>
 * @date    2018/01/25
 */

const path               = require('path');
const webpack            = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin  = require('html-webpack-plugin');
const ExtractTextPlugin  = require('extract-text-webpack-plugin');
const CopyWebpackPlugin  = require('copy-webpack-plugin');
const constants          = require('./constants');

module.exports = {
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        filename: `${constants.PROJECT}/${constants.version}/[name].[hash:8].js`,
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: require('./loaders')
    },
    plugins: [
        new CleanWebpackPlugin(path.join(__dirname, 'dist')),
        new webpack.DefinePlugin({
            'API_USER':    JSON.stringify(constants.API_USER),
            'PROJECT':     JSON.stringify(constants.PROJECT),
            'APP_VERSION': JSON.stringify(constants.version)
        }),
        // new CopyWebpackPlugin([
        //     { from: 'src/static', to: `${constants.PROJECT}/static` }
        // ]),
        new ExtractTextPlugin(`${constants.PROJECT}/${constants.version}/[name].[hash:8].css`),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false // 注释
            },
            mangle: false,
            compressor: {
                pure_getters: true,
                unsafe: true,
                unsafe_comps: true,
                warnings: false
            }
        }),
        new webpack.BannerPlugin(`v${constants.version} | Copyright © ${new Date().getFullYear()}年 jimistore. All rights reserved.`),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'index.html'),
            project: constants.PROJECT
        })
    ]
}
