var gulp = require('gulp');
var bower = require('gulp-bower-files');

var paths = {
    modernizer: { src: 'bower_components/modernizer/modernizr.js', dest: 'js/lib' },
    processing: { src: 'bower_components/processing/processing.min.js', dest: 'js/lib' },
    phaser: { src: 'bower_components/phaser/build/phaser.min.js', dest: 'js/lib' },
    normalize: { src: 'bower_components/normalize.css/normalize.css', dest: 'css' },
}

gulp.task('default', ['copy']);

gulp.task('copy', function () {
    gulp.src(paths.modernizer.src).pipe(gulp.dest(paths.modernizer.dest));
    gulp.src(paths.processing.src).pipe(gulp.dest(paths.processing.dest));
    gulp.src(paths.phaser.src).pipe(gulp.dest(paths.phaser.dest));
    gulp.src(paths.normalize.src).pipe(gulp.dest(paths.normalize.dest));
});