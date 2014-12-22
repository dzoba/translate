var gulp = require('gulp');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var path = require('path');

var paths = {
  views: 'client/*.js',
  less: 'less/*.less'
};

gulp.task('watch', function() {
  gulp.watch(paths.views, ['uglify']);
  gulp.watch(paths.less, ['less']);
});

// Minify js
gulp.task('uglify', function() {
  gulp.src('client/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('public/javascripts'));
});

// Compile less
gulp.task('less', function () {
  gulp.src('./less/**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./public/stylesheets'));
});
