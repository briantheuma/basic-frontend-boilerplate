const { src, dest, watch, series, parallel } = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
var replace = require('gulp-replace');

// File paths
const files = { 
  src: {
    htmlPath: 'src/*.html',
    imgsPath: 'src/images/*.*',
    scssPath: 'src/scss/**/*.scss',
    jsPath: 'src/js/**/*.js'
  },
  dist: {
    htmlPath: 'dist/',
    imgsPath: 'dist/assets/images/',
    scssPath: 'dist/assets/css/',
    jsPath: 'dist/assets/js/'
  }
}

function scssTask() {
  return src(files.src.scssPath)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([ autoprefixer(), cssnano() ]))
    .pipe(sourcemaps.write('.'))
    .pipe(dest(files.dist.scssPath)
  );
}

function jsTask(){
  return src(files.src.jsPath)
      .pipe(concat('scripts.js'))
      .pipe(uglify())
      .pipe(dest(files.dist.jsPath)
  );
}

// Cachebust
var cbString = new Date().getTime();
function cacheBustTask(){
    return src(files.src.htmlPath)
        .pipe(replace(/cb=\d+/g, 'cb=' + cbString))
        .pipe(dest(files.dist.htmlPath));
}

function copyHTMLTask() {
  return src(files.src.htmlPath)
    .pipe(dest(files.dist.htmlPath));
}

function copyImgsTask() {
  return src(files.src.imgsPath)
    .pipe(dest(files.dist.imgsPath));
}

function watchTask(){
  watch([files.src.scssPath, files.src.jsPath, files.src.htmlPath], 
      series(
          parallel(scssTask, jsTask, copyHTMLTask),
          cacheBustTask
      )
  );    
}
  
exports.default = series(
  parallel(scssTask, jsTask, copyHTMLTask, copyImgsTask), 
  cacheBustTask,
  watchTask
);