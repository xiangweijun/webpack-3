/**
 * @author  WeiJun_Xiang <xwjune@163.com>
 * @date    2018/01/25
 */

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const constants = require('./constants');

const loaders = [
    {
        test: /src.*\.js$/,
        use: [
            'babel-loader',
            'eslint-loader',
        ],
    }, {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
                {
                    loader: 'css-loader',
                    options: {
                        minimize: process.env.NODE_ENV == 'production', // 生产环境压缩
                        sourceMap: process.env.NODE_ENV != 'production', // 非生产环境生成sourceMap
                    },
                }, {
                    loader: 'postcss-loader',
                    options: {
                        config: {
                            path: 'postcss.config.js',
                        },
                        // plugins: [
                        //     require('autoprefixer')({ /* ...options */ })
                        // ]
                    },
                },
            ],
        }),
    }, {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
                {
                    loader: 'css-loader',
                    options: {
                        minimize: process.env.NODE_ENV == 'production',
                        sourceMap: process.env.NODE_ENV != 'production',
                    },
                }, {
                    loader: 'postcss-loader',
                    options: {
                        config: {
                            path: 'postcss.config.js',
                        },
                    },
                },
                'sass-loader',
            ],
        }),
    }, {
        test: /\.html$/,
        use: 'html-loader',
    }, {
        test: /^[^http].+\.(png|jpg|jpeg|gif)$/,
        use: [
            'image-webpack-loader',
            {
                loader: 'url-loader',
                options: {
                    limit: 10 * 1024, // 10k以内转成base64
                    name: `${process.env.NODE_ENV == 'development' ? '' : '/'}${constants.PROJECT}/${constants.version}/assets/img/[name]-[hash:8].[ext]`,
                },
            },
        ],
    }, {
        test: /\.(ttf|eot|svg|woff(2)?)$/,
        use: {
            loader: 'file-loader',
            options: {
                name: `${process.env.NODE_ENV == 'development' ? '' : '/'}${constants.PROJECT}/${constants.version}/assets/font/[name]-[hash:8].[ext]`,
            },
        },
    },
];

// 生产环境移除console代码
if (process.env.NODE_ENV === 'production' && ENV === 'prod') {
    loaders.push({
        test: /\.js$/,
        use: {
            loader: 'webpack-strip',
            options: {
                strip: ['console.log', 'console.info', 'console.debug'],
            },
        },
    });
}

module.exports = loaders;
