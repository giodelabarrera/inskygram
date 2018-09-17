'use_strict';

const { resolve } = require('path');

module.exports = {
  root: resolve(__dirname, '../'),
  src: resolve(__dirname, '../', 'src'),
  build: resolve(__dirname, '../', 'build'),
};