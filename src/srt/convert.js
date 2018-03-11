'use strict';

function secondsToSrtTime(mseconds) { // TODO - needs tests
  var padder;
  var split = [60*60, 60, 1, 0.001].map( function (d, i) {
    var value = parseInt(mseconds / (d * 1000));
    mseconds = mseconds - (value * d * 1000);
    padder = value.toString();

    if (padder.length < 2) {
      padder= '0' + padder;
    }
    if (i === 3 && padder.length < 3) {
      padder = '0' + padder;
    }
    return padder;
  });
  return split[0] + ':' + split[1] + ':' + split[2] + ',' + split[3];
}

function getTimeLine(start, end) {
  return secondsToSrtTime(start)+' --> '+secondsToSrtTime(end);
}

function textToSrt(textArray, divider) {
  if (!divider) {
    divider = '\n';
  }
  return textArray.reduce( function (acc, d) {
    return acc + d + divider;
  }, '');
}

function buildSubtitle(subObject) {
  var times = getTimeLine(subObject.start, subObject.end);
  var subLines = textToSrt(subObject.text);

  return times + '\n' + subLines + '\n';
}

function subArrayToSrt(parsedObj) {
  var b;
  return parsedObj.reduce( function (acc, d, i) {
    b = (i + 1) + '\n' + buildSubtitle(d);
    return acc + b;
  }, '');
}

module.exports = {
  secondsToSrtTime: secondsToSrtTime,
  subArrayToSrt: subArrayToSrt,
};
