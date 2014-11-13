'use strict';

/**
 * Module dependencies.
 */

var path = require("path");
var gutil = require('gulp-util');
var through = require('through2');
var parsepath = require('parse-filepath');

/**
 * dest plugin
 */

module.exports = function dest(options) {
  options = options || {};

  return through.obj(function (file, enc, cb) {
    if (file.isNull()) {
      this.push(file);
      return cb();
    }

    if (file.isStream()) {
      this.emit('error', new gutil.PluginError('dest plugin', 'streaming not supported'));
      return cb();
    }

    try {
      var o = parsepath(file.relative);
      o.base = options.base || file.base;
      o.cwd = options.cwd || file.cwd;
      var res;

      if (typeof options === 'string' && options !== '') {
        res = options;
      } else if (typeof options === 'function') {
        var fp = options(o) || o;
        res = path.join(fp.dirname, fp.basename + fp.extname);
      } else {
        var opts = _.extend({}, o, options);
        var dirname = opts.dirname;
        var basename = opts.basename;
        var ext = opts.ext || opts.extname;
        res = path.join(dirname, basename + ext);
      }

      if (typeof res === 'string') {
        file.path = path.join(file.base, res);
      }

      this.push(file);
    } catch (err) {
      this.emit('error', new gutil.PluginError('dest plugin', err));
      cb();
    }
  });
};
