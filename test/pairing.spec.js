/* eslint-env mocha */
'use strict';

var expect = require('chai').expect;
var pairing = require('../src/pairing');


describe('modifiers for internal subtitle object', function() {
  var base = [
    { start: 72.833, end: 89, text: [ 'A bunch of text' ] },
    { start: 91.833, end: 99, text: [ 'A bunch of text' ] },
  ];
  var oneAhead = [
    { start: 73.833, end: 90, text: [ 'one second ahead' ] },
    { start: 92.833, end: 100, text: [ 'one second ahead' ] },
  ];
  var oneBehind = [
    { start: 71.833, end: 88, text: [ 'one second behind' ] },
    { start: 90.833, end: 98, text: [ 'one second behind' ] },
  ];
  var endMatchstartLate = [
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

  it('pairs base with itself', function() {

  });

  it('fails when outside offset', function() {

  });

  it('pairs when within offset', function() {

  });

  xit('handles partial pairings', function() {

  });
});
