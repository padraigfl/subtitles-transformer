'use strict';

module.exports = {
  FULL_MATCH: 'FULL_MATCH',
  START_MATCH: 'START_MATCH',
  END_MATCH: 'END_MATCH',

  START_LATE_END_EARLY: 'START_LATE_END_EARLY',
  START_EARLY_END_LATE: 'START_EARLY_END_LATE',

  START_MATCH_END_EARLY: 'START_MATCH_END_EARLY', // treat as within for now // future: check next entry s2
  START_MATCH_END_LATE: 'START_MATCH_END_LATE', // cut off for now // future: check next entry s1

  START_EARLY_END_MATCH: 'START_EARLY_END_MATCH', // treat as within // future: double up?
  START_LATE_END_MATCH: 'START_LATE_END_MATCH', // treat as within for now
};
