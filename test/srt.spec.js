/* eslint-env mocha */
'use strict';

var expect = require('chai').expect;
var io = require('../src/io');

var srt = require('../src/srt');
var parseSrt = srt.parse;
var arrayToSrt = srt.convert;

var styling = require('../src/srt/styling');
var isStyled = styling.isStyled;
var removeStyles = styling.removeStyles;

describe('SRT', function () {
  describe('parse', function () {
    var obj = [
      { start: 72833, end: 79000, text: [ 'ASDFGHJKL' ] },
      { start: 102458, end: 109417, text: [ 'Sfheee idjfhsa' ] },
      { start: 115708, end: 117750, text: [ 'Oooops' ] }
    ];

    it('should srt to object', function () {
      var x = io.read('./test/dummySubs/3LinesD.srt');
      var result = parseSrt(x);
      expect(result).to.deep.equal(obj);
    });
  });

  describe('convert', function() {
    var obj = [
      { start: 72833, end: 79000, text: [ 'ASDFGHJKL' ] },
      { start: 102458, end: 109417, text: [ 'Sfheee idjfhsa' ] },
      { start: 115708, end: 117750, text: [ 'Oooops' ] }
    ];
    it('should object to srt format', function () {
      var result = arrayToSrt(obj);
      expect(result).to.equal(
        '1\n00:01:12,833 --> 00:01:19,000\nASDFGHJKL\n\n'+
        '2\n00:01:42,458 --> 00:01:49,417\nSfheee idjfhsa\n\n'+
        '3\n00:01:55,708 --> 00:01:57,750\nOooops\n\n'
      ); //rouding down and floating points makes direct comparisons potentially off by a millesecond
    });
  });

  describe('styleSrt', function () {
    var noStyle = { start: 72833, end: 79000, text: [ 'ASDFGHJKL' ] };
    var underline = { start: 72833, end: 79000, text: [ '<u>ASDFGHJKL</u>' ] };
    var twoStyle =  { start: 72833, end: 79000, text: [ '<b><u>ASDFGHJKL</u></b>' ] };
    var fontStyle =  { start: 72833, end: 79000, text: [ '<u>ASDFGHJKL</u>' ] };
    var threeStyleWithFont = { start: 72833, end: 79000, text: [ '<font color="blue">ASD<b><a>FGHJKL</u></b></font>' ] };

    it('isStyled', function () {
      expect(isStyled(noStyle.text)).to.equal(false);
      expect(isStyled(underline.text)).to.equal(true);
    });

    describe('adding styles', function() {
      it('italicize', function () {
        expect(styling.italicize(noStyle.text[0])).to.equal('<i>'+noStyle.text[0]+'</i>');
      });
      it('bolden', function () {
        expect(styling.bolden(noStyle.text[0])).to.equal('<b>'+noStyle.text[0]+'</b>');
      });
      it('underline', function () {
        expect(styling.underline(noStyle.text[0])).to.equal('<u>'+noStyle.text[0]+'</u>');
      });
      it('color', function () {
        expect(styling.color(noStyle.text[0], 'blue'))
          .to.equal('<font color="blue">'+noStyle.text[0]+'</font>');
      });
    });

    // no longer export
    xdescribe('removeStyles', function(){
      it('return as if when no styles', function(){
        expect(removeStyles(noStyle.text[0])).to.equal(noStyle.text[0]);
      });
      it('removing basic styles', function(){
        expect(removeStyles(underline.text[0])).to.equal(noStyle.text[0]);
      });
      it('removing font color styles', function(){
        expect(removeStyles(fontStyle.text[0])).to.equal(noStyle.text[0]);
      });
      it('removes multiple styles', function(){
        expect(removeStyles(twoStyle.text[0])).to.equal(noStyle.text[0]);
      });
      it('removes multiple styles inc. color', function(){
        expect(removeStyles(threeStyleWithFont.text[0])).to.equal(noStyle.text[0]);
      });
    });
  });
});
