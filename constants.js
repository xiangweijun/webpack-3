/**
 * 环境配置
 *
 * @author  WeiJun_Xiang <xwjune@163.com>
 * @date    2018/01/25
 */

// 端口
const PORT = process.env.PORT || 3000;
// 环境变量
const ENV = process.env.ENV || 'dev';
// 版本号
const VERSION = '1.0.0';
// 基于根目录的项目路径【AA/BB/CC】
const PATHS = process.env.PATHS || '';
// 用户接口域名
const API_USER = {
    dev: 'http://user.dev.jimistore.com',
    test: 'http://user.test.jimistore.com',
    prod: 'https://user-api.jimistore.com',
}[ENV];

exports.PORT = PORT;
exports.ENV = ENV;
exports.VERSION = VERSION;
exports.PATHS = PATHS;
exports.API_USER = API_USER;
