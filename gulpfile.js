var gulp = require('gulp'),
  package = require('./package.json'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync'),
  autoprefixer = require('gulp-autoprefixer'),
  jade = require('gulp-jade'),
  sourcemaps = require('gulp-sourcemaps'),
  plumberNotifier  = require('gulp-plumber-notifier'),
  //header  = require('gulp-header'),
  //rename = require('gulp-rename'),

  templatizer = require('templatizer'),
  browserify = require('browserify'),
  source = require("vinyl-source-stream"),
  watchify = require('watchify');

gulp.task('browserify', function() {

  return browserify({ entries: ['src/js/script.js'] })
    .bundle()
    .pipe(plumberNotifier())
    .pipe(source('js/xo.bundled.js'))
    .pipe(gulp.dest('public'));
});

gulp.task('js', ['templatizer', 'browserify']);
gulp.task('js-watch', ['js'], browserSync.reload);


gulp.task('css', function () {
  return gulp.src('src/stylesheets/style.scss')
    .pipe(plumberNotifier())
    .pipe(sass({errLogToConsole: true}))
    .pipe(sourcemaps.init())
    .pipe(autoprefixer('last 4 version'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/css'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function () {
  browserSync.init({
    open: false,
    server: {
      baseDir: "./public"
    }
  });
});

gulp.task('reload', function () {
  browserSync.reload();
});

gulp.task('jade', function () {
  var YOUR_LOCALS = {};

  gulp.src('./src/templates/index.jade')
    .pipe(plumberNotifier())
    .pipe(jade({
      locals: YOUR_LOCALS,
      pretty: true
    }))
    .pipe(gulp.dest('public'))
});

gulp.task('templatizer', function () {
  templatizer(__dirname + '/src/templates/includes', __dirname + '/src/js/templates.js', {jade: {doctype: 'html'}});
});

gulp.task('js-watch', ['js'], browserSync.reload);

gulp.task('default', ['templatizer', 'browserify', 'jade', 'css', 'browser-sync'], function () {
  gulp.watch("./src/js/**/*.js", ['js-watch']);
  gulp.watch("./src/templates/index.jade", ['jade', 'reload']);
  gulp.watch("./src/templates/includes/*.jade", ['templatizer']);
  gulp.watch("./src/stylesheets/*.scss", ['css', 'reload']);
});
