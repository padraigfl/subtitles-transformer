/* eslint-env mocha */
'use strict';

var expect = require('chai').expect;
var pairing = require('../src/pairing');

describe('Pairing subtitles:', function() {
  var base = [
    { start: 72833, end: 89000, text: [ 'A bunch of text' ] },
    { start: 91833, end: 99000, text: [ 'and the second field' ] },
  ];
  var twoAhead = [
    { start: 74833, end: 91000, text: [ 'two second ahead0' ] },
    { start: 93833, end: 101000, text: [ 'two second ahead1' ] },
  ];
  var twoBehind = [
    { start: 70833, end: 87000, text: [ 'two second behind0' ] },
    { start: 89833, end: 97000, text: [ 'two second behind1' ] },
  ];
  /* eslint-disable */
  var endMatchStartLate = [
    { start: 82833, end: 89000, text: [ 'paired ending, late start' ] },
    { start: 95833, end: 99000, text: [ 'paired ending, late start' ] },
  ];
  var endMatchStartEarly = [
    { start: 70833, end: 89000, text: [ 'paired ending, early start' ] },
    { start: 90833, end: 99000, text: [ 'paired ending, early start' ] },
  ];
  var startMatchEndEarly = [
    { start: 72833, end: 76000, text: [ 'paired starting, early end' ] },
    { start: 91833, end: 94000, text: [ 'paired starting, early end' ] },
  ];
  var startMatchEndLate = [
    { start: 72833, end: 93000, text: [ 'paired starting, late end' ] },
    { start: 93833, end: 119000, text: [ 'paired starting, late end' ] },
  ];
  var startLateEndEarly = [
    { start: 76833, end: 81000, text: [ 'within primary0' ] },
    { start: 94833, end: 95000, text: [ 'within primary1' ] },
  ];
  var startEarlyEndLate = [
    { start: 68833, end: 90000, text: [ 'early start, late end' ] },
    { start: 90100, end: 102009, text: [ 'early start, late end' ] },
  ];
  var longText = [
    {
      start: 72000,
      end: 79000,
      text: [
        'so much text here',
        'so very much',
        'enough to test with hopefully but sure we will see',
      ]
    },
  ];
  /* eslint-enable */

  describe('isValidPair', function() {
    it('FULL_MATCH', function() {
      expect(pairing.isValidPair(base[0], base[0])).to.equal('FULL_MATCH');
    });
    it('FULL_MATCH with offset', function() {
      expect(pairing.isValidPair(base[0], twoAhead[0], 3000)).to.equal('FULL_MATCH');
    });
    it('START_MATCH_END_EARLY', function(){
      expect(pairing.isValidPair(base[0], startMatchEndEarly[0])).to.equal('START_MATCH_END_EARLY');
    });
    it('START_MATCH_END_LATE', function(){
      expect(pairing.isValidPair(base[0], startMatchEndLate[0])).to.equal('START_MATCH_END_LATE');
    });
    it('END_MATCH_START_EARLY', function() {
      expect(pairing.isValidPair(base[0], endMatchStartEarly[0])).to.equal('START_EARLY_END_MATCH');
    });
    it('END_MATCH_START_LATE', function() {
      expect(pairing.isValidPair(base[0], endMatchStartLate[0])).to.equal('START_LATE_END_MATCH');
    });
    it('START_EARLY_END_LATE', function() {
      expect(pairing.isValidPair(base[0], startEarlyEndLate[0])).to.equal('START_EARLY_END_LATE');
    });
    it('START_LATE_END_EARLY', function(){
      expect(pairing.isValidPair(base[0], startLateEndEarly[0], 0)).to.equal('START_LATE_END_EARLY');
    });
    it('no match', function(){
      expect(pairing.isValidPair(base[0], twoBehind[0], 0)).to.equal(false);
    });
  });

  describe('makePairs', function() {
    var expected;

    beforeEach(function() {
      expected = [
        {
          start: base[0].start,
          end: base[0].end,
          text: base[0].text,
        },
        {
          start: base[1].start,
          end: base[1].end,
          text: base[1].text,
        },
      ];
    });

    it('pairs base with itself', function() {
      expected[0].secondaryText = base[0].text;
      expected[1].secondaryText = base[1].text;
      expect(pairing.makePairs(base, base, 1)).to.deep.equal(expected);
    });

    it('pairs when offset matches behind', function() {
      expected[0].secondaryText = twoBehind[0].text;
      expected[1].secondaryText = twoBehind[1].text;
      expect(pairing.makePairs(base, twoBehind, 3000)).to.deep.equal(expected);
      expected[0].secondaryText = twoAhead[0].text;
      expected[1].secondaryText = twoAhead[1].text;
      expect(pairing.makePairs(base, twoAhead, 3000)).to.deep.equal(expected);
    });

    it('fails when offset doesn\'t match', function() {
      expect(pairing.makePairs(base, twoBehind, 1000)).to.deep.equal(expected);
      expect(pairing.makePairs(base, twoAhead, 1000)).to.deep.equal(expected);
    });

    it('pairs when within offset', function() {
      expected[0].secondaryText = startLateEndEarly[0].text;
      expected[1].secondaryText = startLateEndEarly[1].text;
      expect(pairing.makePairs(base, startLateEndEarly, 1000)).to.deep.equal(expected);
    });

    xit('handles partial pairings', function() {

    });
  });
});
