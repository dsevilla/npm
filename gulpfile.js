/*global require */
 
var gulp = require('gulp'),
    source = require('vinyl-source-stream'),
    browserify = require('browserify')
 
gulp.task('browserify', function() {

    var b = browserify();

//    b.require('d3');

    return b
	    .bundle() /*{entries: './lib/index.js' }*/
            .pipe(source('app.js'))
            .pipe(gulp.dest('./dist/'));
});
 
gulp.task('watch', ['browserify'], function() {
    gulp.watch('./lib/**/*.js', ['browserify'])
});
 
gulp.task('default', ['browserify']);
gulp.task('dev', ['watch']);
