'use strict';

var FILE_VALIDATOR_RX = require('./constants').regEx.FILE_VALIDATOR;

function splitStringFile(data){
  var splitRexEx = /(\r\n|\n){2,}/g;
  return data.split(splitRexEx)
    .map( function (x) {
      return x.split(/\r\n|\n/g);
    });
}

function srtTimeToSeconds(srtTime){
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
      return srtTimeToSeconds(time);
    });
  return {start: times[0], end: times[1]};
}

function cleanFile(data){
  return data.replace(/^\s+|\s+$/g, '');
}

function parseSrt(data) {
  if (!data.match(FILE_VALIDATOR_RX)){
    // eslint-disable-next-line
    console.error('This file has failed the SRT format validation check, errors in output are to be expected');
  }

  var s = splitStringFile(cleanFile(data));

  var fmt = s.filter(function(subtitle) {
    if(subtitle.length >= 3 && !subtitle[0].match(/^\s*$/)) { // haaaack
      return subtitle;
    }
  }).map( function (subtitle) {
    var times = getTimeObject(subtitle[1]);
    var lines = subtitle.slice(2);
    return {
      start: times.start,
      end: times.end,
      text: lines,
    };
  });

  return fmt;
}

module.exports = {
  parseSrt: parseSrt,
};
