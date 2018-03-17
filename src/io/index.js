'use strict';

var fs = require('fs');

function readFile(filename) {
  return fs.readFileSync(filename, 'ascii', function(err, data) {
    if (err) throw err;
    return data;
  });
}

function writeFile(filename, content) {
  return fs.writeFileSync(filename, content, function(err, data) {
    if (err) throw err;
    return data;
  });
}

function appendFile(filename, newContent) {
  return fs.appendFileSync(filename, newContent, function(err, data) {
    if (err) throw err;
    return data;
  });
}

module.exports = {
  read: readFile,
  write: writeFile,
  append: appendFile,
};
