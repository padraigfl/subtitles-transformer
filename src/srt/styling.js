'use strict';

var tags = require('./constants').tags;
var regEx = require('./constants').regEx;

function isStyled(subtitle){
  var styles = false;

  subtitle.forEach( function (line) {
    if (line.match(regEx.TAGS)) {
      styles = true;
    }
  });

  return styles;
}

function addStyle(tags, content) {
  return tags[0]+content+tags[1];
}
function italicize(content){
  return addStyle(tags.ITALICS, content);
}
function bolden(content){
  return addStyle(tags.BOLD, content);
}
function underline(content){
  return addStyle(tags.UNDERLINE, content);
}
function color(content, _color){
  if (!_color) {
    _color = '#000000';
  }
  return addStyle(tags.GET_COLOR(_color), content);
}

function removeStyles(text){
  var filteredText = text.split(regEx.TAGS);
  return filteredText.join('');
}

module.exports = {
  isStyled: isStyled,
  italicize: italicize,
  bolden: bolden,
  underline: underline,
  color: color,
  removeStyles: removeStyles,
};
