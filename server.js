/**
 * 监听
 *
 * @author  WeiJun_Xiang <xiangweijun@jimistore.com>
 * @date    2018/01/25
 */

const path      = require('path');
const express   = require('express');
const constants = require('./constants');
const app       = express();

app.use(express.static(path.join(__dirname, 'dist')));
app.listen(constants.PORT, () => console.log(`Listening on ${constants.PORT}`));
