'use strict';

var srt = require('./srt');
var ssa = require('./ssa');
var modifiers = require('./modifiers');
var pair = require('./pairing');
var io = require('./io');

var sub1 = srt.parse(io.read('testFiles/syncsubs/All.About.My.Mother.1999.PROPER.DVDRip.XviD-SAPHiRE-en.srt'));
var sub2 = srt.parse(io.read('testFiles/syncsubs/All.About.My.Mother.1999.PROPER.DVDRip.XviD-SAPHiRE-es.srt'));
// var t = srt.parse(io.read('testFiles/3Lines.srt'));
// var s = ssa.parse.parseSsa(io.read('testFiles/3Lines.ssa'));

var paired = pair.makePairs(sub2, sub1);

io.write('testFiles/output.json', JSON.stringify(paired));

var res = srt.convert(paired);
io.write('testFiles/res.srt', res);

res = ssa.convert.subArrayToSsa(paired);
io.write('testFiles/res.ssa', res);

module.exports = {
  srt: srt,
  modifiers: modifiers,
};
