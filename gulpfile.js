const { src, dest, series } = require('gulp');

function sass(cb) {
  console.log('sass builder!');
  cb();
}

function copy(cb) {
  console.log('copy builder!');
  cb();
}
  
  exports.default = series(sass, copy);