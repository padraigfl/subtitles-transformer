/* eslint-env mocha */
'use strict';

var expect = require('chai').expect;
var ssa = require('../src/ssa');
var io = require('../src/io');

var parse = ssa.parse;
var convert = ssa.convert;

describe('SSA:', function() {
  describe('parse', function() {
    it('parseLine', function() {
      var line = 'Dialogue: Marked=0,00:01:12.83,00:01:19.00,HardDefault,NTP,0000,0000,0000,!Effect,TestStuff, TestAgain';
      expect(parse.parseLine('dialogue', line))
        .to.deep.equal(
          [
            'Marked=0', '00:01:12.83', '00:01:19.00',
            'HardDefault', 'NTP', '0000', '0000',
            '0000', '!Effect', 'TestStuff', 'TestAgain',
          ]
        );
    });

    it('ssaTimeToSeconds', function() {
      expect(parse.ssaTimeToSeconds('01:01:01.01')).to.equal(3661.01);
    });

    it('stripHeading', function() {
      var file = io.read('./test/dummySubs/3Lines.ssa');
      var strippedLines = parse.stripHeading(file).split('\n');

      expect(strippedLines[0]).to.equal('Format: Marked, Start, End, Style, Name, MarginL, MarginR, MarginV, PrimaryEffect, Text');
      expect(strippedLines[1]).to.equal('Dialogue: Marked=0,00:01:12.83,00:01:19.00,HardDefault,NTP,0000,0000,0000,!Effect,TestStuff, TestAgain');
    });

    xit('stringInlineStyles', function() {});

    it('parsesSsa', function() {
      var expected = [
        { start: 72.83, end: 79, text: [ 'TestStuff, TestAgain' ] },
        { start: 102.46, end: 109.42, text: [ '(testing parentheses)' ] },
        { start: 115.71, end: 117.75, text: [ 'TESTS IN CAPS' ] },
      ];
      var file = io.read('./test/dummySubs/3Lines.ssa');

      expect(parse.parseSsa(file)).to.deep.equal(expected);
    });
  });

  describe('convert', function() {
    var heading = '[Script Info]\n' +
      'Title: Built By https://github.com/padraigfl\n' +
      'Original Script: Likely Someone Else\n' +
      'ScriptType: v4.00\n';
    var styles = '[V4 Styles]\n' +
      'Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, TertiaryColour, BackColour,' +
      'Bold, Italic, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, AlphaLevel, Encoding\n' +
      'Style: primary, Tahoma, 24, 16777215, 00000000, 00000000, 00000000, 0, 0, 1, 1, 0, 2, 30, 30, 10, 0, 0\n' +
      'Style: secondary, Tahoma, 18, 16777215, 00000000, 00000000, 00000000, 0, 0, 1, 1, 0, 2, 30, 30, 10, 0, 0\n';
    var eventHead = '[Events]' + '\n' +
      'Format: Marked, Name, MarginL, MarginR, MarginV, PrimaryEffect, Style, Start, End, Text\n';

    var dialoguePrefix = 'Dialogue: Marked=0,NTP,0000,0000,0000,!Effect,';

    var obj = [
      { start: 72.833, end: 79, text: [ 'ASDFGHJKL', 'ASDFGHJKL' ] },
      { start: 102.458, end: 109.417, text: [ 'Sfheee idjfhsa' ] },
      { start: 115.708, end: 117.75, text: [ 'Oooops' ], secondaryText: [ 'secondary' ] },
    ];

    var style = 'style';

    it('secondsToSsaTime', function() {
      expect(convert.secondsToSsaTime(3901.56)).to.equal('01:05:01.56');
      expect(convert.secondsToSsaTime(7421.501)).to.equal('02:03:41.50');
    });
    it('buildHeading', function() {
      expect(convert.buildHeading()).to.equal(heading);
    });
    it('buildStyles', function() {
      expect(convert.buildStyles()).to.equal(styles);
    });
    it('buildEventsHeading', function() {
      expect(convert.buildEventsHeading()).to.equal(eventHead);
    });
    it('buildText', function() {
      expect(convert.buildText(obj[0].text)).to.equal(
        obj[0].text[0]+'\\n'+obj[0].text[1]
      );
    });
    it('buildText with custom linesplit', function() {
      expect(convert.buildText(obj[0].text, '|')).to.equal(
        obj[0].text[0]+'|'+obj[0].text[1]
      );
    });
    it('buildDialogue', function() {
      expect(convert.buildDialogue(convert.buildText(obj[0].text), obj[0].start, obj[0].end, style)).to.equal(
        dialoguePrefix + style+',00:01:12.83,00:01:19.00,' + obj[0].text[0] + '\\n' + obj[0].text[1] + '\n'
      );
    });
    it('subToSsa', function() {
      expect(convert.subToSsa(obj[2])).to.equal(
        dialoguePrefix + 'primary,00:01:55.70,00:01:57.75,' + obj[2].text[0] + '\n' +
        dialoguePrefix + 'secondary,00:01:55.70,00:01:57.75,' + obj[2].secondaryText[0] + '\n'
      );
    });
    it('subArrayToSsa', function() {
      expect(convert.subArrayToSsa(obj)).to.equal(
        heading + '\n' + convert.buildStyles() + '\n' + convert.buildEventsHeading() +
        dialoguePrefix + 'primary,00:01:12.83,00:01:19.00,' + obj[0].text[0] + '\\n' + obj[0].text[1] + '\n' +
        dialoguePrefix + 'primary,00:01:42.45,00:01:49.41,' + obj[1].text[0] + '\n' +
        dialoguePrefix + 'primary,00:01:55.70,00:01:57.75,' + obj[2].text[0] + '\n' +
        dialoguePrefix + 'secondary,00:01:55.70,00:01:57.75,' + obj[2].secondaryText[0] + '\n\n'
      );
    });
  });
});
