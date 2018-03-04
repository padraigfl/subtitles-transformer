/* eslint-env mocha */
'use strict';

var expect = require('chai').expect;
var pairing = require('../src/pairing');


describe('Pairing subtitles:', function() {
  var base = [
    { start: 72.833, end: 89, text: [ 'A bunch of text' ] },
    { start: 91.833, end: 99, text: [ 'and the second field' ] },
  ];
  var twoAhead = [
    { start: 74.833, end: 91, text: [ 'two second ahead0' ] },
    { start: 93.833, end: 101, text: [ 'two second ahead1' ] },
  ];
  var twoBehind = [
    { start: 70.833, end: 87, text: [ 'two second behind0' ] },
    { start: 89.833, end: 97, text: [ 'two second behind1' ] },
  ];
  /* eslint-disable */
  var endMatchStartLate = [
    { start: 82.833, end: 89, text: [ 'paired ending, late start' ] },
    { start: 95.833, end: 99, text: [ 'paired ending, late start' ] },
  ];
  var endMatchStartEarly = [
    { start: 70.833, end: 89, text: [ 'paired ending, early start' ] },
    { start: 90.833, end: 99, text: [ 'paired ending, early start' ] },
  ];
  var startMatchEndEarly = [
    { start: 72.833, end: 76, text: [ 'paired starting, early end' ] },
    { start: 91.833, end: 94, text: [ 'paired starting, early end' ] },
  ];
  var startMatchEndLate = [
    { start: 72.833, end: 93, text: [ 'paired starting, late end' ] },
    { start: 93.833, end: 119, text: [ 'paired starting, late end' ] },
  ];
  var startLateEndEarly = [
    { start: 76.833, end: 81, text: [ 'within primary0' ] },
    { start: 94.833, end: 95, text: [ 'within primary1' ] },
  ];
  var startEarlyEndLate = [
    { start: 68.833, end: 90, text: [ 'early start, late end' ] },
    { start: 90.1, end: 102, text: [ 'early start, late end' ] },
  ];
  var longText = [
    {
      start: 72,
      end: 79,
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
      expect(pairing.isValidPair(base[0], twoAhead[0], 3)).to.equal('FULL_MATCH');
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
      expect(pairing.makePairs(base, twoBehind, 2)).to.deep.equal(expected);
      expected[0].secondaryText = twoAhead[0].text;
      expected[1].secondaryText = twoAhead[1].text;
      expect(pairing.makePairs(base, twoAhead, 2)).to.deep.equal(expected);
    });

    it('fails when offset doesn\'t match', function() {
      expect(pairing.makePairs(base, twoAhead, 0)).to.deep.equal(expected);
      expect(pairing.makePairs(base, twoBehind, 0)).to.deep.equal(expected);
    });

    it('pairs when within offset', function() {
      expected[0].secondaryText = startLateEndEarly[0].text;
      expected[1].secondaryText = startLateEndEarly[1].text;
      expect(pairing.makePairs(base, startLateEndEarly, 1)).to.deep.equal(expected);
    });

    xit('handles partial pairings', function() {

    });
  });
});
