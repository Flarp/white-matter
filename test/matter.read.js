/*!
 * gray-matter <https://github.com/jonschlinkert/gray-matter>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

var path = require('path');
var assert = require('assert');
const fs = require('fs')
var matter = require('..');
var fixture = path.join.bind(path, __dirname, 'fixtures');

const read = filepath => {
  const str = fs.readFileSync(filepath, 'utf8');
  return matter(str);
}

describe('.read', function() {
  it('should extract YAML front matter from files with content.', function() {
    var file = read(fixture('basic.txt'));

    assert(file.hasOwnProperty('data', {title: 'Basic'}));
    assert.equal(file.content, 'this is content.');
  });

  it('should parse complex YAML front matter.', function() {
    var file = read(fixture('complex.md'));

    assert(file.hasOwnProperty('data'));
    assert.equal(file.data.root, '_gh_pages');


    assert(file.hasOwnProperty('content'));
    assert(file.hasOwnProperty('orig'));
    assert(file.data.hasOwnProperty('root'));
  });

  it('should return an object when a file is empty.', function() {
    var file = read(fixture('empty.md'));
    assert(file.hasOwnProperty('data'));
    assert(file.hasOwnProperty('content'));
    assert(file.hasOwnProperty('orig'));
  });

  it('should return an object when no front matter exists.', function() {
    var file = read(fixture('hasnt-matter.md'));
    assert(file.hasOwnProperty('data'));
    assert(file.hasOwnProperty('content'));
    assert(file.hasOwnProperty('orig'));
  });

  it('should parse YAML files directly', function() {
    var file = read(fixture('all.yaml'));
    assert(file.hasOwnProperty('data'));
    assert(file.hasOwnProperty('content'));
    assert(file.hasOwnProperty('orig'));
    assert.deepEqual(file.data, {
      one: 'foo',
      two: 'bar',
      three: 'baz'
    });
  });
});
