'use strict';

var MIN_CHAR_LIMIT = 10;

function timeShift (subtitle, seconds) {
  return {
    start: subtitle.start + seconds,
    end: subtitle.end + seconds,
    text: subtitle.text,
  };
}

function toOneLine (subtitle, breaker) {
  if (!breaker) {
    breaker = '--';
  }

  subtitle.text = [
    subtitle.text.reduce( function (acc, line) {
      return acc+breaker+line;
    }),
  ];

  return subtitle;
}

function limitChar(subtitle, characterLimit){
  if (characterLimit < MIN_CHAR_LIMIT){
    // eslint-disable-next-line
    console.log('Character limit must be greater than '
      + MIN_CHAR_LIMIT + ', using full text');
    return subtitle;
  }

  subtitle.text = toOneLine(subtitle)
    .text[0]
    .substring(0,characterLimit);
  subtitle.text = [ subtitle.text + '_..' ];
  return subtitle;
}

module.exports = {
  timeShift: timeShift,
  toOneLine: toOneLine,
  limitChar: limitChar,
};
