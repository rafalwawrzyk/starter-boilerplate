var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var htmlReplace = require('gulp-html-replace');
var htmlMin = require('gulp-htmlmin');

var config = {
  dist:'dist/',
  src:'src/',
  htmlIn:'src/*.html',
  cssIn:'src/css/**/*.css',
  jsIn:'src/script/**/*.js',
  scssIn:'src/scss/**/*.scss',
  cssOut:'dist/css',
  jsOut:'dist/script',
  scssOut:'src/css',

}

gulp.task('reload',function(){
  browserSync.reload();
});

gulp.task('serve', ['sass'], function(){

  browserSync({
    server:config.src,
    port:3020
  });

  gulp.watch([config.htmlIn, config.jsIn], ['reload']);
  gulp.watch(config.scssIn, ['sass']);
})

gulp.task('sass', function(){
  return gulp.src(config.scssIn)
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer({
    browsers:['last 3 versions']
  }))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('src/css'))
  .pipe(browserSync.stream());
})

gulp.task('mincss',function(){
  return gulp.src(config.cssIn)
  .pipe(cleanCSS())
  .pipe(gulp.dest(config.cssOut))
})

gulp.task('minjs',function(){
  return gulp.src(config.jsIn)
  .pipe(uglify())
  .pipe(gulp.dest(config.jsOut));
})


gulp.task('default', ['serve']);
