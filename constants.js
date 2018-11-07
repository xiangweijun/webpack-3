/**
 * 环境配置
 *
 * @author  WeiJun_Xiang <xwjune@163.com>
 * @date    2018/01/25
 */

// 端口
const PORT = process.env.PORT || 3000;
// 环境变量
const APPENV = process.env.APPENV || 'dev';
// 版本号
const APPVER = '1.0.0';
// 基于根目录的项目路径【AA/BB】
const PATHS = process.env.PATHS || '';
// 用户接口域名
const API = {
    dev: 'http://user.dev.jun.com',
    test: 'http://user.test.jun.com',
    prod: 'https://user-api.jun.com',
}[APPVER];

exports.PORT = PORT;
exports.APPENV = APPENV;
exports.APPVER = APPVER;
exports.PATHS = PATHS;
exports.API = API;
