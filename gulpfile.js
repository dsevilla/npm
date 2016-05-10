/*global require */

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    browserify = require('browserify'),
    source = require('vinyl-source-buffer');

var src = {
  main: './app.js'
};

var module = {
  shortcut : 'myapp',
  filename : "app.js",
  dist     : 'dist'
};

gulp.task('browserify', function() {
    return browserify({
      /**
       * This flags determinate how to load module in the frontend
       * for use it as global, set to true.
       * Instead, if you want to load using node require('myapp'), avoid it (false by default)
       */
      standalone: module.shortcut
      })
      // require the main file and register a correct expose naming
      .require(src.main, { expose: module.shortcut})
      .bundle().on('error', gutil.log)
      // necessary to be possible apply pipe transfrom  around browserify in memory file vinyl
      .pipe(source(module.filename))
      // like that
      .pipe(gulp.dest(module.dist));
});

gulp.task('watch', ['browserify'], function() {
    gulp.watch('./lib/**/*.js', ['browserify']);
});

gulp.task('default', ['browserify']);
gulp.task('dev', ['watch']);
