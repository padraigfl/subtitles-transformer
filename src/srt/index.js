'use strict';

module.exports = {
  parse: require('./parse').parseSrt,
  convert: require('./convert').subArrayToSrt,
  style: require('./styling'),
};
