'use strict';

var c = require('./constants');

function isInRange(time1, time2, variance) {
  return !((time1 <= (time2 - variance) ) || (time1 >= (time2 + variance)));
}

function isWithin(s1, s2) {
  return s1.start < s2.start && s1.end > s2.end;
}

function isValidPair(s1, s2, offset) {
  if (!offset) {
    offset = 0;
  }

  offset += 100;

  var matchStart = isInRange(s1.start, s2.start, offset);
  var matchEnd = isInRange(s1.end, s2.end, offset);

  if (matchStart && matchEnd){
    return c.FULL_MATCH;
  }
  else if (matchStart) {
    if (s2.end < s1.end) {
      return c.START_MATCH_END_EARLY;
    }
    return c.START_MATCH_END_LATE;
  }
  else if (matchEnd) {
    if (s2.start < s1.start) {
      return c.START_EARLY_END_MATCH;
    }
    return c.START_LATE_END_MATCH;
  } else if( isWithin(s1, s2)) {
    return c.START_LATE_END_EARLY;
  } else if( s1.start > s2.start && s1.end < s2.end) {
    return c.START_EARLY_END_LATE;
  } else if (s2.start >= s1.end) {
    return c.START_AFTER_END;
  } else if (s2.end <= s2.start) {
    return c.END_BEFORE_START; // TODO future optional inclusion
  }
  return false;
}

function makePairs(s1, s2, offset) {
  if (offset > 3000) {
    console.warn('Offset exceeds 3 seconds: An high capturing variance may cause inaccurate syncing'); // eslint-disable-line
  }
  var primary = s1.map( function(sub) {
    return Object.assign({}, sub);
  });

  var s1count = 0;
  var s2count = 0;
  var temp = false;
  while (s1count < s1.length) {
    while (s2count < s2.length) {
      temp = isValidPair(s1[s1count], s2[s2count], offset);
      if (temp === c.FULL_MATCH || temp === c.START_LATE_END_EARLY || temp === c.START_EARLY_END_LATE) {
        primary[s1count].secondaryText = s2[s2count].text;
        break;
      } else if (temp === c.START_AFTER_END) {
        break;
      }
      s2count++;
    }
    s1count++;
  }
  return primary;
}

module.exports = {
  makePairs: makePairs,
  isInRange: isInRange,
  isValidPair: isValidPair,
};
