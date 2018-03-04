/* eslint-env mocha */
'use strict';

var expect = require('chai').expect;
var ssa = require('../src/ssa');
var io = require('../src/io');

var parse = ssa.parse;

describe('SSA:', function() {
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
