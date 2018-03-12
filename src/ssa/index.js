'use strict';

module.exports = {
  parse: require('./parse'),
  convert: require('./convert'),
  styles: {
    DEFAULT: require('./styles/default.json'),
    SMALL: require('./styles/white16.json'),
    OUTLINE: require('./styles/whiteTextBlackOutline.json'),
    INVERSE_OUTLINE: require('./styles/blackTextWhiteOutline'),
  },
};
