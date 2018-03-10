'use strict';

var styleFormat = [
  'Name',
  'BorderStyle', // e.g. 1
  'Shadow', // eg 0 (binary?)
  'AlphaLevel', // 0
  'Encoding', // 0
  'MarginL', // eg 30
  'MarginR', // eg 30
  'MarginV', // eg. 10
  'Fontname', // e.g. Tahoma
  'PrimaryColour', // e.g. 16777215
  'SecondaryColour',
  'TertiaryColour',
  'BackColour',
  'Alignment', // eg 2
  'Fontsize', // int e.g. 24
  'Bold', // binary 1/0
  'Italic', // binary 1/0
  'Outline', // binary 1/0
];

//0-255 is pure red,
function getSsaColor (colorStr) {
  switch (colorStr.toLowerCase()) {
    case 'white':
      return 16777215;
    case 'black':
      return 0;
    case 'yellow':
      return 65535;
    case 'red':
      return 255;
    case 'blue':
      return 16711680;
    case 'green':
      return 32768;
    default:
      -2147483640;
  }
}

function processColor (value, defaults) {
  return getSsaColor(typeof value === 'string' ? value : defaults);
}

function getFont (fontStr) {
  switch (fontStr.toLowerCase()) {
    case 'times new roman':
      return 'Times New Roman';
    default:
      return 'Tahoma';
  }
}

function getInteger(value, defaults){
  return Number.isInteger(value) ? value : defaults;
}

function getAlignment(alignStr) {
  switch (alignStr.toLowerCase()) {
    case 'top':
      return 6;
    default:
      return 2;
  }
}

function buildStyle (styleName, obj) {
  var defaults = {
    fontsize: 24,
    color: 'white',
    // outline: {
    //   color: 'black',
    // },
    bold: false,
    italic: false,
    alignment: 'bottom', //make function, top of screen is six
    marginH: 30,
    marginV: 10,
    font: 'Tahoma',
  };

  obj = Object.assign({}, defaults, obj);

  var color = processColor(obj.color, defaults.color);
  var marginH = getInteger(obj.marginH, defaults.marginH);

  var valid = {
    Name: 'styleName',
    BorderStyle: 0,
    Shadow: 0,
    AlphaLevel: 0,
    Encoding: 0,
    MarginL: marginH,
    MarginR: marginH,
    MarginV: getInteger(obj.marginV, defaults.marginV),
    Fontname: getFont( typeof obj.font === 'string' ? obj.font : defaults.font),
    PrimaryColour: color,
    SecondaryColour: color,
    TertiaryColour: color,
    BackColour: obj.outline ? processColor(obj.outline.color, defaults.outline.color) : 0,
    Alignment: getAlignment(obj.alignment),
    Fontsize: getInteger(obj.fontsize, defaults.fontsize),
    Bold: obj.bold ? 1 : 0,
    Italic: obj.italic ? 1 : 0,
    Outline: obj.outline ? 1 : 0,
  };

  var style = styleFormat.reduce(function (acc, val, i) {
    return acc + valid[val] + ((i !== styleFormat.length - 1) ? ',': '');
  }, '');

  return 'Style: ' + style + '\n';
}

function getFormat () {
  return 'Format: ' + styleFormat.reduce( function (acc, val) {
    return acc + ',' + val;
  });
}

function buildStyleSection() {
  return '[V4 Styles]\n' +
    getFormat() + '\n' +
    buildStyle('primary', {}) +
    buildStyle('secondary', {});
}

module.exports = {
  buildStyle: buildStyle,
  buildStyleSection: buildStyleSection,
};
