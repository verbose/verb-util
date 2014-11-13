'use strict';

var gulp = require('gulp');
var dest = require('./lib/dest');

gulp.task('default', function() {
  gulp.src('test/fixtures/path*.md')
    .pipe(dest('foo.blah'))
    .pipe(gulp.dest('./test/actual'));
});