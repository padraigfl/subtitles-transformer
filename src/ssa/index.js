'use strict';

module.exports = {
  parse: require('./parse').parseSsa,
  convert: require('./convert').subArrayToSsa,
  styles: {
    DEFAULT: require('./styles/default.json'),
    SMALL: require('./styles/white16.json'),
    OUTLINE: require('./styles/whiteTextBlackOutline.json'),
    INVERSE_OUTLINE: require('./styles/blackTextWhiteOutline'),
  },
};
