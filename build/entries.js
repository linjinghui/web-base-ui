// 获取组件信息
const path = require('path');
var fs = require('fs');
var fileContent = fs.readFileSync(path.resolve(__dirname, '../packages/index.js'), {encoding: 'utf-8'});

// 匹配出所有的组件信息
var reg = /import ([\S]+) from '([\S]+)'/;
var result = {};
fileContent.match(new RegExp(reg, 'g')).forEach(function (item) {
  var r = item.match(reg);
  var key = r[1].replace(/[{}]/g, '').toLowerCase();
  var src = '../packages' + r[2].replace('.', '');
  result[key] = path.resolve(__dirname, src);
});

module.exports = result