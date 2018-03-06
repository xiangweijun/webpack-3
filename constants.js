/**
 * 环境配置
 *
 * @author  WeiJun_Xiang <xwjune@163.com>
 * @date    2018/01/25
 */

exports.PORT = process.env.PORT || 3000;
exports.ENV = process.env.ENV || 'test';
exports.version = '1.0.0';

// 用户
exports.API_USER = {
    dev: 'http://user.dev.jimistore.com',
    test: 'http://user.test.jimistore.com',
    prod: 'https://user-api.jimistore.com',
}[exports.ENV];
