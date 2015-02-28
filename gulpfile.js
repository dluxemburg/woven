var gulp = require("gulp"),
    browserify = require("browserify"),
    transform = require('vinyl-transform'),
    rename = require("gulp-rename"),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps')

gulp.task("default", function(){
  return gulp.src(["./lib/main.js"])
  .pipe(transform(function(files){
    return browserify(files).bundle()
  }))
  .pipe(rename(function(path){
    path.basename = "woven"
  }))
  .pipe(gulp.dest("."))
  .pipe(sourcemaps.init())
  .pipe(uglify())
  .pipe(rename(function(path){
    path.basename = "woven.min"
  }))
  .pipe(gulp.dest("."))
  .pipe(sourcemaps.write("."))
  .pipe(gulp.dest("."))
})