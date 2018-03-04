'use strict';

/* TODO actually use these, all will default to false */
var config = {
  pairing: {
    defaultOffset: 0.1,
    includeUnpairedSecondary: true,
    includeWithin: {
      minLength: 0.4,
    },
    includeEndsEarly: true,
    includeEndsLate: true,
    includeStartsEarly: true,
    includeStartsLate: true,
    includesStartsEarlyEndsLate: true,
  },
  primaryStyle: 'link to file',
  secondaryStyle: 'link to file',
};

module.exports = config;
