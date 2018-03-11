/* eslint-env mocha */
'use strict';

var expect = require('chai').expect;
var io = require('../src/io');

var srt = require('../src/srt');
var parseSrt = srt.parse.parseSrt;
var subArrayToSrt = srt.convert.subArrayToSrt;

var styling = require('../src/srt/styling');
var isStyled = styling.isStyled;
var removeStyles = styling.removeStyles;

describe('SRT', function () {
  describe('parseSrt', function () {
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

    it('should object to srt format', function () {
      var result = subArrayToSrt([obj[0]]);
      expect(result).to.equal(
        '1\n00:01:12,833 --> 00:01:19,000\nASDFGHJKL\n\n'
      ); //rouding down and floating points makes direct comparisons potentially off by a millesecond
    });
  });

  describe('styleSrt', function () {
    var noStyle = { start: 72833, end: 79000, text: [ 'ASDFGHJKL' ] };
    var underline = { start: 72833, end: 79000, text: [ '<u>ASDFGHJKL</u>' ] };
    var twoStyle =  { start: 72833, end: 79000, text: [ '<b><a>ASDFGHJKL</u></b>' ] };
    var fontStyle =  { start: 72833, end: 79000, text: [ '<a>ASDFGHJKL</u>' ] };
    var threeStyleWithFont = { start: 72833, end: 79000, text: [ '<font color="blue"><b><a>ASDFGHJKL</u></b></font>' ] };

    it('should have no style', function () {
      expect(isStyled(noStyle.text)).to.equal(false);
    });

    it('should have a style', function () {
      expect(isStyled(underline.text)).to.equal(true);
    });

    describe('adding styles', function() {
      it('italicize', function () {
        expect(styling.italicize(noStyle.text[0])).to.equal('<i>'+noStyle.text[0]+'</i>');
      });
      it('bold', function () {
        expect(styling.bolden(noStyle.text[0])).to.equal('<b>'+noStyle.text[0]+'</b>');
      });
      it('underline', function () {
        expect(styling.underline(noStyle.text[0])).to.equal('<u>'+noStyle.text[0]+'</u>');
      });
      it('font color', function () {
        expect(styling.color(noStyle.text[0], 'blue'))
          .to.equal('<font color="blue">'+noStyle.text[0]+'</font>');
      });
    });

    describe('removing styles', function(){
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
