'use strict';

const gulp = require('gulp');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const maps = require('gulp-sourcemaps');
const del = require('del');
const useref = require('gulp-useref');
const iff = require('gulp-if');
const csso = require('gulp-csso');
const browserSync = require('browser-sync').create();
const runSequence = require('run-sequence');
const babel = require('gulp-babel');

const options = {
  src: './app/',
  dist: './dist/'
};

gulp.task('browserSync', () => {
  browserSync.init({
    server: {
      baseDir: 'app'
    }
  });
});

gulp.task('images', () => {
  return gulp.src(options.src + 'images/**/*.+(png|jpg|jpeg|gif|svg)')
    .pipe(imagemin())
    .pipe(gulp.dest(options.dist + 'images'));
});

gulp.task('fonts', () => {
  return gulp.src(options.src + 'vendor/font-awesome/fonts/**/*')
    .pipe(gulp.dest(options.dist + 'fonts'));
});

gulp.task('compileSass', () => {
  return gulp.src(options.src + 'scss/app.scss')
    .pipe(maps.init())
    .pipe(sass())
    .pipe(maps.write('./'))
    .pipe(gulp.dest(options.src + 'css/'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('babel', () => {
  return gulp.src(options.src + 'js/main.js')
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(rename('app.js'))
    .pipe(gulp.dest(options.src + 'js'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('html', ['compileSass'], () => {
  return gulp.src(options.src + 'index.html')
    .pipe(useref())    
    .pipe(iff('*.js', uglify()))
    .pipe(iff('*.css', csso()))
    .pipe(gulp.dest(options.dist));
});

gulp.task('assets', () => {
  return gulp.src(options.src + 'vendor/font-awesome/fonts/**/*')
    .pipe(gulp.dest(options.src + 'fonts'));
})

gulp.task('default', ['browserSync', 'compileSass', 'babel', 'assets'], () => {
  gulp.watch(options.src + 'scss/**/*.scss', ['compileSass']);
  gulp.watch(options.src + '*.html', browserSync.reload);
  gulp.watch(options.src + 'js/main.js', ['babel']);
});

gulp.task('clean', () => {
  return del([
    options.dist,
    options.src + 'css/app.css*',
    options.src + 'js/app.js*',
    options.src + 'fonts']);
});

gulp.task('build', ['clean'], (callback) => {
  runSequence(
    'babel',
    ['html', 'images', 'fonts'],
    callback
  )
});
