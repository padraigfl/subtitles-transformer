'use strict';

function secondsToSsaTime(seconds) {
  var padder;
  var split = [60*60, 60, 1, 0.01].map( function (d, i) {
    var value = parseInt(seconds / d);
    seconds = seconds - (value * d);
    padder = value.toString();

    if (padder.length < 2) {
      padder= '0' + padder;
    }
    if (i === 3 && padder.length < 3) {
      padder = '0' + padder;
    }
    return padder;
  });
  return split[0] + ':' + split[1] + ':' + split[2] + '.' + split[3];
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
  return '[Events]' + '\n' +
    'Format: Marked, Name, MarginL, MarginR, MarginV, PrimaryEffect, Style, Start, End, Text';
}

function buildText(text, newLine) {
  return text.reduce(function(acc, x) {
    return acc + newLine + x;
  });
}

function buildDialogue(text, start, end, style) {
  if (text) {
    return 'Dialogue: Marked=0,HardDefault,NTP,0000,0000,0000,!Effect,'
      + style + ',' + start + ',' + end + ',' + text + '\n';
  }
  return '';
}

function subToSsa(sub) {
  var start = secondsToSsaTime(sub.start);
  var end = secondsToSsaTime(sub.end);

  var primaryText = sub.text ? buildText(sub.text) : false;
  var secondaryText = sub.secondaryText ? buildText(sub.text) : false;

  var primaryDialogue = buildDialogue(primaryText, start, end, 'primary');
  var secondaryDialogue = buildDialogue(secondaryText, start, end, 'secondary');

  return primaryDialogue + secondaryDialogue;
}

function subArrayToSsa(subArray) {
  var heading = buildHeading();
  var styles = buildStyles();

  var events = buildEventsHeading() + '\n' +
    subArray.map(function(sub) {
      return subToSsa(sub);
    });

  return heading + '\n\n' +
    styles + '\n\n' +
    events + '\n';
}

module.exports = {
  toSrt: subArrayToSsa,

};
