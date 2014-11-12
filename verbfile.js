'use strict';

var verb = require('verb');
var escape = require('./lib/middleware/escape');

verb.data('package.json');
verb.data({foo: 'bar'});

verb.before(/\.*/, escape.before(verb));
verb.after(/\.*/, escape.after(verb));

verb.task('default', function() {
  verb.src('delims.md')
    .pipe(verb.dest('./actual'));
});

