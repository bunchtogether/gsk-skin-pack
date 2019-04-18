var gulp = require('gulp');
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var changed = require('gulp-changed');
var sourcemaps = require('gulp-sourcemaps');
var clean = require('gulp-clean');
var git = require('git-rev');
var fs = require("fs");
var inline_base64 = require('./gulp-inliner');

var globs = {
  custom: ['custom/**/*'],
  base: ['default/**/*'],
  css: ['./dist/css/*.css', './dist/css/**/*.css'],
  scss: ['./dist/css/*.scss', './dist/css/**/*.scss'],
  packageCss: ['./package/css/*.css', './package/css/**/*.css'],
  packageScss: ['./package/css/*.scss', './package/css/**/*.scss']
};

gulp.task('clean-styles', function () {
  return gulp.src(globs.css)
    .pipe(clean());
});

gulp.task('build-styles', function () {
  return gulp.src(globs.scss)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(inline_base64({
      baseDir: './dist/css/',
      maxSize: 14 * 1024,
      debug: true
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('build', gulp.parallel(
  gulp.series('clean-styles', 'build-styles')
));

gulp.task('clean-package', function () {
  return gulp.src(globs.packageCss)
    .pipe(clean());
});

gulp.task('build-package', function () {
  return gulp.src(globs.packageScss)
    .pipe(inline_base64({
      baseDir: './package/css/',
      maxSize: 14 * 1024,
      debug: true
    }))
    .pipe(gulp.dest('./package/css'));
});

gulp.task('package-files', function () {
  return gulp.src(globs.custom)
    .pipe(gulp.dest('./package'));
});

gulp.task('package', gulp.parallel(
  gulp.series('clean-package', 'package-files', 'build-package')
));

gulp.task('base', function () {
  return gulp.src(globs.base)
    .pipe(changed('./dist'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('custom', function () {
  return gulp.src(globs.custom)
    .pipe(changed('./dist'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('base-full', function() {
  return gulp.src(globs.base)
    .pipe(gulp.dest('./dist'));
});

gulp.task('custom-full', function() {
  return gulp.src(globs.custom)
    .pipe(gulp.dest('./dist'));
});

gulp.task('revision', function (done) {
  const template = fs.readFileSync("custom/js/dojo18/mpi/vp/templates/SearchView.html").toString();
  fs.writeFileSync("custom/js/dojo18/mpi/vp/templates/SearchView.html", template.replace(/>[0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f]</, `>1096<`));
  done();
});
