'use strict';

// will remain using objects until I have figured out what this should include

function Subtitle (start, end, text) {
  this.start = start;
  this.end = end;
  this.text = Array.isArray(text) ? text : [ text ];
}

Subtitle.prototype.toString = function () {
  var textFmt = this.text.reduce( function (acc, x) {
    return acc  + '\n' + x;
  });
  return 'Start: ' + this.start.toString() +
    'End: ' + this.start.toString() +
    'Text: ' + textFmt +
    '-----------';
};

module.exports = {
  Subtitle: Subtitle,
};
