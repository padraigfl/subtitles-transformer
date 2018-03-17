'use strict';

var SIMPLE = /<\/?\w(\s*)>/;
var FONT = /(<\/?font\s+color=('|")#?\w+('|")?>)|(<\/?font>)$/;
var FULL = /<\/?\w+(\s+color=('|")(\w+)('|"))?>/;
var FIND_TAGS = /<.*>.*<\/.*>/;
var VALIDATOR = /\d+(\r\n|\n)\d\d:\d\d:\d\d,\d\d\d\s*-->\s*\d\d:\d\d:\d\d,\d\d\d(\r\n|\n)([^\n]+\n)+(\r\n|\n)*/;
var FILE_VALIDATOR =  /^(\d+(\r\n|\n)\d\d:\d\d:\d\d,\d\d\d\s*-->\s*\d\d:\d\d:\d\d,\d\d\d(\r\n|\n)([^\n]+\n)+(\r\n|\n)*)+$/;

module.exports = {
  TAGS: FULL,
  FONT_TAG: FONT,
  SIMPLE_TAG: SIMPLE,
  SIMPLE_TAGS: FIND_TAGS,
  FILE_VALIDATOR: FILE_VALIDATOR,
  VALIDATOR: VALIDATOR,
};
