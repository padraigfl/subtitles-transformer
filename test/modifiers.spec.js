/* eslint-env mocha */
'use strict';

var expect = require('chai').expect;
var modifiers = require('../src/modifiers');

var timeShift = modifiers.timeShift;
var toOneLine = modifiers.toOneLine;
var limitChar = modifiers.limitChar;

describe('Modifiers:', function() {
  var multiple = { start: 72.833, end: 79, text: [ 'A bunch of text', 'two lines worth' ] };
  var longText = {
    start: 102.458,
    end: 109.417,
    text: [
      'so much text here',
      'so very much',
      'enough to test with hopefully but sure we will see',
    ]
  };

  it('shifts time (precise to 1ms)', function() {
    var shiftedTimes = [ 10, 1, 0.1, 0.01, 0.001, 0.0001 ];
    var withNewTimes;
    for (var i = 0; i < shiftedTimes.length; i++ ) {
      withNewTimes = timeShift(multiple, shiftedTimes[i]);
      expect(withNewTimes.start).to.equal(multiple.start + shiftedTimes[i]);
      expect(withNewTimes.end).to.equal(multiple.end + shiftedTimes[i]);
    }
  });

  it('reduces subtitles to one line', function() {
    expect(toOneLine(multiple).text.length).to.equal(1);
  });

  it('cuts additional text', function() {
    expect(limitChar(longText, 40).text[0].length).to.equal(43);
  });
});
