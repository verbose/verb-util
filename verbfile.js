'use strict';

var verb = require('verb');
var escape = require('./lib/middleware/escape');

// temporary, need to get tests setup

verb.data('package.json');
verb.data({foo: 'bar'});

verb.before(/\.*/, escape.before(verb));
verb.after(/\.*/, escape.after(verb));

verb.task('tests', function() {
  verb.src('test/fixtures/*.md')
    .pipe(verb.dest('./test/actual'));
});

verb.task('readme', function() {
  verb.src('.verb.md')
    .pipe(verb.dest('./'));
});

verb.task('default', ['tests', 'readme']);