'use strict';

var ITALICS = ['<i>', '</i>'];

var BOLD = ['<b>', '</b>'];

var UNDERLINE = ['<u>', '</u>'];

function GET_COLOR(_color){
  return ['<font color="'+_color+'">', '</font>'];
}

module.exports = {
  ITALICS: ITALICS,
  BOLD: BOLD,
  UNDERLINE: UNDERLINE,
  GET_COLOR: GET_COLOR,
};
