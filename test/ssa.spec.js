/* eslint-env mocha */
'use strict';

var expect = require('chai').expect;
var io = require('../src/io');
var styler = require('../src/ssa/styling');

var parse = require('../src/ssa/parse');
var convert = require('../src/ssa/convert');

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
      expect(parse.ssaTimeToMsec('01:01:01.01')).to.equal(3661010);
    });

    it('stripHeading', function() {
      var file = io.read('./test/dummySubs/3Lines.ssa');
      var strippedLines = parse.stripHeading(file);

      expect(strippedLines[0]).to.equal('Format: Marked, Start, End, Style, Name, MarginL, MarginR, MarginV, PrimaryEffect, Text');
      expect(strippedLines[1]).to.equal('Dialogue: Marked=0,00:01:12.83,00:01:19.00,HardDefault,NTP,0000,0000,0000,!Effect,TestStuff, TestAgain');
    });

    it('parsesSsa', function() {
      var expected = [
        { start: 72830, end: 79000, text: [ 'TestStuff, TestAgain' ] },
        { start: 102460, end: 109420, text: [ '(testing parentheses)' ] },
        { start: 115710, end: 117750, text: [ 'TESTS IN CAPS' ] },
      ];
      var file = io.read('./test/dummySubs/3Lines.ssa');

      expect(parse.parseSsa(file)).to.deep.equal(expected);
    });


    it('parsesSsa with inline styles', function() {
      var expected = [
        { start: 47100, end: 49100, text: [ 'asdfsadf sdsaada sdsd a Red blue green karaokeRed blue green karaoke' ] },
      ];
      var file = io.read('./test/dummySubs/inlineStyle.ssa');

      expect(parse.parseSsa(file, true)).to.deep.equal(expected);
    });

  });

  describe('convert', function() {
    var heading = '[Script Info]\n' +
      'Title: Built By https://github.com/padraigfl\n' +
      'Original Script: Likely Someone Else\n' +
      'ScriptType: v4.00\n';
    var styles = '[V4 Styles]\n' +
      'Format: Name,BorderStyle,Shadow,AlphaLevel,Encoding,MarginL,MarginR,MarginV,' +
      'Fontname,PrimaryColour,SecondaryColour,TertiaryColour,BackColour,Alignment,Fontsize,Bold,Italic,Outline\n' +
      'Style: primary,0,0,0,0,30,30,10,Tahoma,16777215,16777215,16777215,0,2,24,0,0,0\n' +
      'Style: secondary,3,0,0,0,10,10,10,Times New Roman,16777215,16777215,16777215,0,6,12,1,1,1\n';

    var dialoguePrefix1 = 'Dialogue: Marked=0,';
    var dialoguePrefix2 = 'NTP,0000,0000,0000,!Effect,';

    var obj = [
      { start: 72833, end: 79000, text: [ 'ASDFGHJKL', 'ASDFGHJKL' ] },
      { start: 102458, end: 109417, text: [ 'Sfheee idjfhsa' ] },
      { start: 115708, end: 117750, text: [ 'Oooops' ], secondaryText: [ 'secondary' ] },
    ];

    var style = 'style';

    it('secondsToSsaTime', function() {
      expect(convert.msecToSsaTime(3901560)).to.equal('01:05:01.56');
      expect(convert.msecToSsaTime(7421501)).to.equal('02:03:41.50');
    });
    it('buildHeading', function() {
      expect(convert.buildHeading()).to.equal(heading);
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
        dialoguePrefix1 + '00:01:12.83,00:01:19.00,'+ style + ',' + dialoguePrefix2 + obj[0].text[0] + '\\n' + obj[0].text[1] + '\n'
      );
    });
    it('build dialogue with secondary subs', function() {
      expect(convert.subToSsa(obj[2])).to.equal(
        dialoguePrefix1 + '00:01:55.70,00:01:57.75,primary,' + dialoguePrefix2 + obj[2].text[0] + '\n' +
        dialoguePrefix1 + '00:01:55.70,00:01:57.75,secondary,' + dialoguePrefix2 + obj[2].secondaryText[0] + '\n'
      );
    });
    it('subArrayToSsa', function() {
      expect(convert.subArrayToSsa(obj, styler())).to.equal(
        heading + '\n' + styles + '\n' + convert.buildEventsHeading() +
        dialoguePrefix1 + '00:01:12.83,00:01:19.00,primary,' + dialoguePrefix2 + obj[0].text[0] + '\\n' + obj[0].text[1] + '\n' +
        dialoguePrefix1 + '00:01:42.45,00:01:49.41,primary,' + dialoguePrefix2 + obj[1].text[0] + '\n' +
        dialoguePrefix1 + '00:01:55.70,00:01:57.75,primary,' + dialoguePrefix2 + obj[2].text[0] + '\n' +
        dialoguePrefix1 + '00:01:55.70,00:01:57.75,secondary,' + dialoguePrefix2 + obj[2].secondaryText[0] + '\n\n'
      );
    });
  });

  describe('style', function() {
    it('works with default json fields', function() {
      var result = '[V4 Styles]\n' +
        'Format: Name,BorderStyle,Shadow,AlphaLevel,Encoding,MarginL,MarginR,MarginV,Fontname,' +
        'PrimaryColour,SecondaryColour,TertiaryColour,BackColour,Alignment,Fontsize,Bold,Italic,Outline\n' +
        'Style: primary,0,0,0,0,30,30,10,Tahoma,16777215,16777215,16777215,0,2,24,0,0,0\n' +
        'Style: secondary,3,0,0,0,10,10,10,Times New Roman,16777215,16777215,16777215,0,6,12,1,1,1\n';

      expect(styler()).to.equal(result);
    });
    it('reverts to defaults when passed junk', function() {
      var result = '[V4 Styles]\n' +
        'Format: Name,BorderStyle,Shadow,AlphaLevel,Encoding,MarginL,MarginR,MarginV,Fontname,' +
        'PrimaryColour,SecondaryColour,TertiaryColour,BackColour,Alignment,Fontsize,Bold,Italic,Outline\n' +
        'Style: primary,0,0,0,0,30,30,10,Tahoma,16777215,16777215,16777215,0,2,24,0,0,0\n' +
        'Style: secondary,0,0,0,0,30,30,10,Tahoma,16777215,16777215,16777215,0,2,24,0,0,0\n';
      expect(styler('wrongformat', {})).to.equal(result);
      expect(styler(3, {})).to.equal(result);
    });
  });
});
