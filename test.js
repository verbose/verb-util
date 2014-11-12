/*!
 * verb-util <https://github.com/jonschlinkert/verb-util>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var assert = require('assert');
var should = require('should');
var utils = require('./');

describe('utils', function () {
  describe('.headings()', function () {
    it('should skip fenced code blocks:', function () {
      utils.headings('```js\n# Foo\n```\n# Bar').should.eql('```js\n# Foo\n```\n\n## Bar');
    });

    it('should add one heading level:', function () {
      utils.headings('# Bar').should.eql('## Bar');
      utils.headings('## Bar').should.eql('### Bar');
      utils.headings('### Bar').should.eql('#### Bar');
    });

    it('should add the specified number of heading levels:', function () {
      utils.headings('# Bar', 1).should.eql('## Bar');
      utils.headings('# Bar', 2).should.eql('### Bar');
      utils.headings('# Bar', 3).should.eql('#### Bar');
      utils.headings('# Bar', 4).should.eql('##### Bar');
    });
  });
});

