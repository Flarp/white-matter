/*!
 * gray-matter <https://github.com/jonschlinkert/gray-matter>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

var assert = require('assert');
var YAML = require('js-yaml');
var matter = require('..');

const fs = require('fs')
const read = filepath => {
  const str = fs.readFileSync(filepath, 'utf8');
  return matter(str);
}

describe('custom parser:', function() {
  it('should allow a custom parser to be registered:', function() {
    var actual = read('./test/fixtures/lang-yaml.md', {
      parser: function customParser(str, opts) {
        try {
          return YAML.safeLoad(str, opts);
        } catch (err) {
          throw new SyntaxError(err);
        }
      }
    });

    assert.equal(actual.data.title, 'YAML');
    assert(actual.hasOwnProperty('data'));
    assert(actual.hasOwnProperty('content'));
    assert(actual.hasOwnProperty('orig'));
  });
});
