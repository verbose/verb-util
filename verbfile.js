'use strict';

var verb = require('verb');
var dest = require('./lib/dest');

var escape = require('./lib/middleware/escape');
verb.route(/\.*/).before(escape.before(verb));
verb.route(/\.*/).after(escape.after(verb));
verb.data({foo: 'bar'});

verb.task('default', function() {
  verb.src('test/fixtures/path*.md')
    .pipe(dest('foo.blah'))
    .pipe(verb.dest('./test/actual'));
    // .pipe(verb.dest(function(fp) {
    //   return 'test/actual/foo';
    // }));
});

// verb.task('readme', function() {
//   verb.src('.verb.md')
//     .pipe(verb.dest('./'));
// });

// verb.task('default', ['tests', 'readme']);