var gulp = require('gulp');
var del = require('del');
var gulpif = require('gulp-if');
var runSequence = require('run-sequence');
var minifyCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer'); // postCSS will change to autoprefixer
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');

var AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

gulp.task('styles:watch', function () {
    gulp.watch(global.config.src + '/**/*.less', ['styles']);
});

gulp.task('styles:clean', function (cb) {
    del([global.config.dest + '/**/*.css'], {
            dot: true
        })
        .then(function () {
            cb();
        });
});

gulp.task('styles:less', function () {
    return gulp.src(global.config.src + '/**/main.less')
        .pipe(gulpif(global.config.env !== 'prod', sourcemaps.init()))
        .pipe(less())
        .pipe(autoprefixer(AUTOPREFIXER_BROWSERS))
        .pipe(gulpif(global.config.env === 'prod', minifyCSS()))
        .pipe(gulpif(global.config.env !== 'prod', sourcemaps.write()))
        .pipe(gulp.dest(global.config.dest));
});

gulp.task('styles', function (cb) {
    runSequence(
        'styles:clean',
        'styles:less',
        cb
    );
});
