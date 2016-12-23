var gulp = require('gulp');
var fs = require('fs');
var runSequence = require('run-sequence');

// get tasks
require('require-dir')('gulp_tasks');

// console.log(module.parent);

var projectPackage = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

global.config = {
    env: 'prod',
    src: 'src',
    dest: 'build',
    version: projectPackage.version
};

var allTasks = ['styles', 'scripts', 'copy', 'images'];
gulp.task('default', function (cb) {
    runSequence(
        'clean',
        allTasks,
        cb);
});

function startWatchTasks() {
    return runSequence('clean', allTasks, 'watch');
}

gulp.task('build', startWatchTasks);
