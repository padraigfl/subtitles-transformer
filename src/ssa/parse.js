'use strict';

function ssaTimeToMsec(ssaTime){
  var scale = [60*60*1000, 60*1000, 1000, 10];

  return ssaTime.split(/[:.]/g)
    .map( function (time) {
      return parseInt(time);
    })
    .reduce( function (acc, t, i) {
      return acc + t*scale[i];
    }, 0);
}

function cleanFile(data) {
  return data.replace(/^\s+|\s+$/g, '');
}

function stripHeading(ssaFile) {
  return ssaFile.split(/[\r\n]{4,}|\n{2,}/)[2]
    .replace(/\[events\]\s*(\r\n|\n)/i, '');
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

function removeInlineFormatting(text){
  return text.split(/{\\[^}]*}/g).join('');
}

function pullEventData(line, format, omitInlineStyles) {
  var eventList = parseLine('dialogue', line);

  var start = ssaTimeToMsec(eventList[format.startIdx]);
  var end = ssaTimeToMsec(eventList[format.endIdx]);
  var text = eventList.slice(format.textIdx).join(', ');

  if (omitInlineStyles) {
    text = removeInlineFormatting(text);
  }

  return {
    start: start,
    end: end,
    text: text.split(/\\n/i),
  };
}

function parseSsa(data, omitInlineStyles) {
  var eventsString = stripHeading(cleanFile(data))
    .split(/\r\n|\n/);
  var eventFormat = pullEventFormat(eventsString.shift());

  return eventsString.map(function(event) {
    return pullEventData(event, eventFormat, omitInlineStyles);
  });
}

module.exports = {
  parseSsa: parseSsa,

  ssaTimeToMsec: ssaTimeToMsec,
  parseLine: parseLine,
  stripHeading: stripHeading,
};
