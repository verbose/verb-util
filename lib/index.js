'use strict';

var fs = require('fs');
var path = require('path');

fs.readdirSync(__dirname).forEach(function (name) {
  var base = path.basename(name, path.extname(name));
  var fp = path.resolve(__dirname, name);

  if (!/index/.test(fp) && fs.statSync(fp).isFile()) {
    exports[base] = require(fp);
  }
});
