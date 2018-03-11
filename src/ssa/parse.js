'use strict';

function ssaTimeToSeconds(ssaTime){
  var scale = [60*60, 60, 1, 0.01];

  return ssaTime.split(/[:.]/g)
    .map( function (time) {
      return parseInt(time);
    })
    .reduce( function (acc, t, i) {
      return acc + t*scale[i]*1000;
    }, 0);
}

function cleanFile(data) {
  return data.replace(/^\s+|\s+$/g, '');
}

function stripHeading(ssaFile) {
  return ssaFile.split(/\n{2,}/)[2]
    .replace(/\[events\]\s*\n/i, '');
}

function parseLine(heading, line) {
  var lineData = line.replace(new RegExp(('\\s*'+ heading + ':\\s*'), 'i'), '');
  return lineData.split(/,\s*/);
}

function pullEventFormat(formatLine) {
  var format = {};

  var formatList = parseLine('format', formatLine).map(function(col) {
    return col.toLowerCase();
  });

  format.startIdx = formatList.indexOf('start');
  format.endIdx = formatList.indexOf('end');
  format.textIdx = formatList.length - 1;

  return format;
}

function pullEventData(line, format) {
  var eventList = parseLine('dialogue', line);

  return {
    start: ssaTimeToSeconds(eventList[format.startIdx]),
    end: ssaTimeToSeconds(eventList[format.endIdx]),
    text: eventList.slice(format.textIdx)
      .join(', ')
      .split(/\\n/i),
  };
}

function parseSsa(data) {
  var eventsString = stripHeading(cleanFile(data)).split('\n');
  var eventFormat = pullEventFormat(eventsString.shift());

  return eventsString.map(function(event) {
    return pullEventData(event, eventFormat);
  });
}

module.exports = {
  parseSsa: parseSsa,

  ssaTimeToSeconds: ssaTimeToSeconds,
  parseLine: parseLine,
  stripHeading: stripHeading,
};
