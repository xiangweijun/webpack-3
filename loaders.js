/**
 * @author xwjun <xwjune@163.com>
 * @date 2018/01/25
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
        test: /[^module]\.css$/,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
                {
                    loader: 'css-loader',
                    options: {
                        minimize: process.env.NODE_ENV === 'production', // 生产环境压缩
                        sourceMap: process.env.NODE_ENV !== 'production', // 非生产环境生成sourceMap
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
        test: /\.module.css$/,
        use: [
            'style-loader',
            {
                loader: 'css-loader',
                options: {
                    modules: true,
                    localIdentName: process.env.NODE_ENV === 'production' ? '[local]___[hash:base64:5]' : '[name]__[local]___[hash:base64:5]',
                },
            }, {
                loader: 'postcss-loader',
                options: {
                    config: {
                        path: 'postcss.config.js',
                    },
                },
            },
        ],
    }, {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
                {
                    loader: 'css-loader',
                    options: {
                        minimize: process.env.NODE_ENV === 'production',
                        sourceMap: process.env.NODE_ENV !== 'production',
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
                    name: 'assets/[name].[hash:8].[ext]',
                },
            },
        ],
    }, {
        test: /\.(ttf|eot|svg|woff(2)?)$/,
        use: {
            loader: 'file-loader',
            options: {
                name: 'assets/[name].[hash:8].[ext]',
            },
        },
    },
];

// 生产环境
if (process.env.NODE_ENV === 'production') {
    loaders[0].use.pop(); // 生成环境去除eslint-loader
    if (constants.APPENV === 'prod') {
    // 生产环境移除console
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
}

module.exports = loaders;
