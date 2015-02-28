var gulp = require("gulp"),
    browserify = require("browserify"),
    transform = require('vinyl-transform'),
    rename = require("gulp-rename"),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    derequire = require('gulp-derequire'),
    source = require('vinyl-source-stream')


gulp.task("build", function(){
  return browserify({
    entries: ["./lib/main.js"],
    standalone: "woven"
  })
  .bundle()
  .pipe(source('woven.js'))
  .pipe(derequire())
  .pipe(rename(function(path){
    path.basename = "woven"
  }))
  .pipe(gulp.dest("."))
})

gulp.task('default', ['build'], function(){
  return gulp.src(['woven.js'])
  .pipe(sourcemaps.init())
  .pipe(uglify())
  .pipe(rename(function(path){
    path.basename = "woven.min"
  }))
  .pipe(gulp.dest("."))
  .pipe(sourcemaps.write("."))
  .pipe(gulp.dest("."))
})
