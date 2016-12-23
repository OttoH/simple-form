var gulp = require('gulp');
var del = require('del');
var runSequence = require('run-sequence');
var eslint = require('gulp-eslint');
var path = require('path');
var glob = require('glob');
var browserify = require('browserify');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');
var streamify = require('gulp-streamify');
var replace = require('gulp-replace');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');

gulp.task('scripts:watch', function () {
    gulp.watch(global.config.src + '/**/*.js', ['scripts']);
    gulp.watch(['./.eslintrc', './.eslintignore'], ['scripts']);
});

function compileES6Bundles(browserifyBundles, cb) {
    if (browserifyBundles.length === 0) {
        return cb();
    }

    var finishedCount = 0;
    browserifyBundles.forEach(function (bundle) {
        var browserifyBundle = browserify({
                entries: [bundle.srcPath]
            })
            .transform('babelify', {
                presets: ['es2015', 'react']
            });

        try {
            return browserifyBundle.bundle()
                .on('log', gutil.log.bind(gutil, 'Browserify Log'))
                .on('error', function (err) {
                    gutil.log('Browserify Error', err);
                    this.emit('end');
                })
                .pipe(source(bundle.outputFilename))
                .pipe(replace(/@VERSION@/g, global.config.version))

            .pipe(gulpif(global.config.env === 'prod', streamify(uglify())))
                .pipe(gulp.dest(bundle.dest))
                .on('end', function () {
                    finishedCount++;
                    if (finishedCount === browserifyBundles.length) {
                        cb();
                    }
                });
        } catch (exception) {
            console.log(exception);
        }
    });
}

function generateES6Bundles(srcPath, cb) {
    if (!srcPath) {
        return cb(new Error('Invalid source path given to generate'));
    }

    var es6Filepaths = glob.sync(srcPath + '/js/*.js');

    var browserifyBundles = [];
    es6Filepaths.forEach(function (filepath) {
        var filename = path.basename(filepath);
        var directoryOfFile = path.dirname(filepath);
        var relativeDirectory = path.relative(
            srcPath,
            directoryOfFile);

        browserifyBundles.push({
            srcPath: './' + filepath,
            outputFilename: filename,
            dest: path.join(global.config.dest,
                relativeDirectory)
        });
    });

    compileES6Bundles(browserifyBundles, cb);
}

gulp.task('scripts:eslint', function () {
    return gulp.src([global.config.src + '/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(gulpif(global.config.env === 'prod', eslint.failOnError()));
});

gulp.task('scripts:es6', function (cb) {
    generateES6Bundles(global.config.src, cb);
});

gulp.task('scripts:es5', function () {
    return gulp.src([global.config.src + '/js/*.es5.js'])
        .pipe(gulpif(global.config.env !== 'prod', sourcemaps.init()))

    .pipe(rename(function (filePath) {
        var fileExtensionLength = '.es5'.length;
        filePath.basename = filePath.basename.substr(
            0, filePath.basename.length -
            fileExtensionLength);
    }))

    .pipe(replace(/@VERSION@/g, global.config.version))
        .pipe(gulpif(global.config.env === 'prod', uglify()))
        .pipe(gulpif(global.config.env !== 'prod', sourcemaps.write()))
        .pipe(gulp.dest(global.config.dest));
});

gulp.task('scripts:clean', function (cb) {
    del([global.config.dest + '/**/*.js'], {
            dot: true
        })
        .then(function () {
            cb();
        });
});

gulp.task('scripts', function (cb) {
    runSequence(
    [
      'scripts:clean',
      'scripts:eslint'
    ], [
      'scripts:es6',
      'scripts:es5'
    ],
        cb
    );
});
