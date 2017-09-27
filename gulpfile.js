var gulp = require('gulp');
var sass = require('gulp-sass');
var min = require('gulp-clean-css');
var rename = require('gulp-rename');

var sassFiles = 'blog/static/scss/**/*.scss';
var cssDest = 'blog/static/css';

gulp.task('sass', function() {
  var stream = gulp.src(sassFiles)
  .pipe(sass({
    precision: 5
  }).on('error', errorHandler))
  .pipe(gulp.dest('blog/static/css'));
  return stream;
});

var cssFile = 'blog/static/css/blog.css';
var minDest = 'blog/static/css/min';

gulp.task('min', ['sass'], function() {
  var stream = gulp.src(cssFile)
    .pipe(rename('blog.min.css'))
    .pipe(min({compatibility: 'ie8' }))
    .pipe(gulp.dest(minDest));
  return stream;
});

function errorHandler(err) {
  console.log(err.toString());
  this.emit('end');
}

gulp.task('watch', function() {
  gulp.watch('blog/static/scss/**/*.scss', ['sass', 'min']);
});
