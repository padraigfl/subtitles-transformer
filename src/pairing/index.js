/*

isPair(s1,s2,offset)
  startMatch
  endMatch
  withinT1
  false

makePairs(s1, s2, offset)
  loop i, j
    if pair
      pair
      j+1
    else
      if before s1
        j+1
      else
        i+1
*/
var FULL_MATCH = 'FULL_MATCH';
var START_MATCH = 'START_MATCH';
var END_MATCH = 'END_MATCH';

function isInRange(time1, time2, variance) {
  return !((time1 <= (time2 - variance) ) || (time1 >= (time2 + variance)));
}

function isValidPair(s1, s2, offset) {
  var matchStart = isInRange(s1.start, s2.start, offset);
  var matchEnd = isInRange(s1.end, s2.end, offset);
  if (matchStart && matchEnd){
    return FULL_MATCH;
  }
  else if (matchStart) {
    return START_MATCH;
  }
  else if (matchEnd) {
    return END_MATCH;
  }
  return false;
}

function makePairs(s1, s2, offset) {
  if (offset > 3) {
    console.log('An offset of over 3 seconds may cause inaccurate syncing'); // eslint-disable-line
  }
  var s1count = 0;
  var s2count = 0;

  while (s1count < s1.length) {
    for (; s2count < s2.length; s2count++) {
      isValidPair(s1[s1count], s2[s2count], offset);
    }
  }
}


module.exports = {
  makePairs: makePairs,
};
