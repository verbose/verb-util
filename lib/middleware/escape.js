'use strict';

var path = require('path');
var EscapeDelims = require('escape-delims');
var escapeDelims = new EscapeDelims();

/**
 * Escape delimiters if specified in the options
 */

exports.before = function (app) {
  return function (file, next) {
    var delims = app.options.escapeDelims;
    if (delims) {
      file.content = escapeDelims.escape(file.content, delims.from);
    }
    next();
  };
};

/**
 * Un-escape delimiters if specified in the options
 */

exports.after = function (app) {
  return function (file, next) {
    var delims = app.options.escapeDelims;
    if (delims) {
      file.content = escapeDelims.unescape(file.content, delims.to);
    }
    next();
  };
};
