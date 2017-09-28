var gulp = require('gulp');
var sass = require('gulp-sass');
var min = require('gulp-clean-css');
var rename = require('gulp-rename');
var livereload = require('gulp-livereload');
var connect = require('gulp-connect');

var sassFiles = 'blog/static/scss/**/*.scss';
var cssDest = 'blog/static/css';

function errorHandler(err) {
  console.log(err.toString());
  this.emit('end');
}

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

gulp.task('server', function() {
  connect.server({
    port: 8000,
    host: '127.0.0.1',
    fallback: 'blog/templates/layout.html',
  })
})

gulp.task('watch', ['server'], function() {
  livereload.listen({ basePath: '127.0.0.1:8000'})
  gulp.watch('blog/static/scss/**/*.scss', ['sass', 'min']);
  gulp.watch(sassFiles, ['sass','min']);
  gulp.watch('**/static/css/min/*.css').on('change', livereload.changed);
  gulp.watch('**/templates/**/*.html').on('change', livereload.changed);
});
