'use strict';

var FILE_VALIDATOR_RX =  /^(\d+(\r\n|\n)\d\d:\d\d:\d\d,\d\d\d\s*-->\s*\d\d:\d\d:\d\d,\d\d\d(\r\n|\n)([^\n]+\n)+(\r\n|\n)*)+$/;
var TAGS_RX = /<\/?\w+\s*?c?o?l?o?r?=?['"\w]*?>/;

function splitStringFile(data){
  var splitRexEx = /[\r\n]{4,}|\n{2,}/g;
  return data.split(splitRexEx)
    .map( function (x) {
      return x.split(/\r\n|\n/g);
    });
}

function srtTimeToMsec(srtTime){
  var scale = [60*60*1000, 60*1000, 1000, 1];

  return srtTime.split(/[:,]/g)
    .map( function (time) {
      return parseInt(time);
    })
    .reduce( function (acc, t, i) {
      return acc + t*scale[i];
    }, 0);
}

function getTimeObject(timeLine) {
  var times = timeLine.split(/\s*-->\s*/g)
    .map( function(time) {
      return srtTimeToMsec(time);
    });
  return {start: times[0], end: times[1]};
}

function cleanFile(data){
  return data.replace(/^\s+|\s+$/g, '');
}

function removeStyles(text){
  var filteredText = text.split(TAGS_RX);
  return filteredText.join('');
}

function parseSrt(data, clearStyles) {
  if (!data.match(FILE_VALIDATOR_RX)){
    // eslint-disable-next-line
    console.error('This file has failed the SRT format validation check, errors in output are to be expected');
  }

  var s = splitStringFile(cleanFile(data));

  var fmt = s.map( function (subtitle) {
    var times = getTimeObject(subtitle[1]);
    var lines = subtitle.slice(2);
    if (clearStyles) {
      lines = lines.map( function (line) {
        return removeStyles(line);
      });
    }

    return {
      start: times.start,
      end: times.end,
      text: lines,
    };
  });

  return fmt;
}

module.exports = parseSrt;
