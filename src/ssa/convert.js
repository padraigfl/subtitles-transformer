'use strict';

var EVENT_ORDER = [
  'Marked',
  'Start',
  'End',
  'Style',
  'Name',
  'MarginL',
  'MarginR',
  'MarginV',
  'Effect',
  'Text',
];


function secondsToSsaTime(seconds) {
  var padder;
  var split = [60*60, 60, 1, 0.001].map( function (d, i) {
    var value = parseInt(seconds / d);
    seconds = seconds - (value * d);
    seconds = Math.round(seconds*1000)/1000; // TODO, be less hacky
    padder = value.toString();

    if (padder.length < 2) {
      padder= '0' + padder;
    }
    if (i === 3 && padder.length < 3) {
      padder = '0' + padder;
    }
    return padder;
  });
  return split[0] + ':' + split[1] + ':' + split[2] + '.' + split[3].substring(0, 2);
}

function buildHeading() {
  return '[Script Info]\n' +
    'Title: Built By https://github.com/padraigfl\n' +
    'Original Script: Likely Someone Else\n' +
    'ScriptType: v4.00\n';
}

function buildStyles() {
  return '[V4 Styles]\n' +
    'Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, TertiaryColour, BackColour,' +
    'Bold, Italic, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, AlphaLevel, Encoding\n' +
    'Style: primary, Tahoma, 24, 16777215, 00000000, 00000000, 00000000, 0, 0, 1, 1, 0, 2, 30, 30, 10, 0, 0\n' +
    'Style: secondary, Tahoma, 18, 16777215, 00000000, 00000000, 00000000, 0, 0, 1, 1, 0, 2, 30, 30, 10, 0, 0\n';

}

function buildEventsHeading() {
  return '[Events]' + '\n' + 'Format: ' +
    EVENT_ORDER.reduce( function (acc, val) {
      return acc + ', ' + val;
    }) + '\n';
}

function buildText(text, newLine) {
  if(!newLine) {
    newLine = '\\n';
  }
  return text.reduce(function(acc, x) {
    return acc + newLine + x;
  });
}

var dialogueBody = {
  Marked: 'Marked=0',
  Name: 'NTP',
  MarginL: '0000',
  MarginR: '0000',
  MarginV: '0000',
  Effect: '!Effect',
};

function buildDialogue(text, start, end, style) {
  var dialogueObject = Object.assign(dialogueBody, {
    Start: secondsToSsaTime(start),
    End: secondsToSsaTime(end),
    Style: style,
    Text: text,
  });

  if (text) {
    return 'Dialogue: ' +  EVENT_ORDER.reduce(function (acc, val, i) {
      return acc + dialogueObject[val] + (i !== EVENT_ORDER.length - 1 ? ',' : '');
    }, '') + '\n';
  }
  return '';
}

function subToSsa(sub) {
  var primaryText = sub.text ? buildText(sub.text) : false;
  var secondaryText = sub.secondaryText ? buildText(sub.secondaryText) : false;

  var primaryDialogue = primaryText ? buildDialogue(primaryText, sub.start, sub.end, 'primary') : '';
  var secondaryDialogue = secondaryText ? buildDialogue(secondaryText, sub.start, sub.end, 'secondary') : '';

  return primaryDialogue + secondaryDialogue;
}

function subArrayToSsa(subArray) {
  var heading = buildHeading();
  var styles = buildStyles();

  var events = buildEventsHeading() +
    subArray.reduce(function(acc, sub) {
      return acc + subToSsa(sub);
    }, '');

  return heading + '\n' +
    styles + '\n' +
    events + '\n';
}

module.exports = {
  toSrt: subArrayToSsa,
  secondsToSsaTime: secondsToSsaTime,
  buildDialogue: buildDialogue,
  buildHeading: buildHeading,
  buildEventsHeading: buildEventsHeading,
  buildText: buildText,
  subToSsa: subToSsa,
  subArrayToSsa: subArrayToSsa,
  buildStyles: buildStyles,
};
