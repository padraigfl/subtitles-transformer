'use strict';

var TAGS_RX = /<\/?\w+\s*?c?o?l?o?r?=?['"\w]*?>/;
var ITALICS = ['<i>', '</i>'];
var BOLD = ['<b>', '</b>'];
var UNDERLINE = ['<u>', '</u>'];

function GET_COLOR(_color){
  return ['<font color="'+_color+'">', '</font>'];
}

function isStyled(subtitle){
  var styles = false;

  subtitle.forEach( function (line) {
    if (line.match(TAGS_RX)) {
      styles = true;
    }
  });

  return styles;
}

function addStyle(tags, content) {
  return tags[0]+content+tags[1];
}
function italicize(content){
  return addStyle(ITALICS, content);
}
function bolden(content){
  return addStyle(BOLD, content);
}
function underline(content){
  return addStyle(UNDERLINE, content);
}
function color(content, _color){
  if (!_color) {
    _color = '#000000';
  }
  return addStyle(GET_COLOR(_color), content);
}

module.exports = {
  isStyled: isStyled,
  italicize: italicize,
  bolden: bolden,
  underline: underline,
  color: color,
};
