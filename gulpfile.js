const gulp = require('gulp');
const terser = require('gulp-terser');
const concat = require('gulp-concat');
const uglifycss = require('gulp-uglifycss');
const sass = require('gulp-sass');

sass.compiler = require('node-sass');

gulp.task('uglify', function () {
    return gulp.src('src/js/*.js')
        .pipe(terser())
        .pipe(gulp.dest('./build'));
});

gulp.task('concat', function() {
    return gulp.src('build/*.js')
        .pipe(concat('dist.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('sass-to-css', function () {
    return gulp.src('src/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('build'));
});

gulp.task('sass:watch', function () {
    return gulp.watch('src/sass/*.scss', ['sass']);
});

gulp.task('uglify-css', function () {
    return gulp.src('src/css/*.css')
        .pipe(uglifycss({
            "maxLineLen": 80,
            "uglyComments": true
        }))
        .pipe(gulp.dest('dist'));
});