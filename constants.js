/**
 * 环境配置
 *
 * @author  WeiJun_Xiang <xiangweijun@jimistore.com>
 * @date    2018/01/25
 */

exports.PORT     = process.env.PORT || 3000;
exports.JIMI_ENV = process.env.JIMI_ENV || 'test';
exports.PROJECT  = 'test';
exports.version  = '1.0.0';

//用户
exports.API_USER = {
    'dev': 'http://user.dev.jimistore.com',
    'test': 'http://user.test.jimistore.com',
    'prod': 'https://user-api.jimistore.com'
}[exports.JIMI_ENV];
