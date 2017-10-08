const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const useref = require('gulp-useref');
const uglify = require('gulp-uglify');
//const gulpIf = require('gulp-if');
const cssnano = require('gulp-cssnano');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const del = require('del');
const runSequence = require('run-sequence');

//const babel = require('gulp-babel');
const browserify  = require('browserify');

//const concat = require('gulp-concat');
const rename = require('gulp-rename');
//const maps = require('gulp-sourcemaps');

const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

const options = {
  src: 'app',
  dist: 'dist'
};

gulp.task('clean', () => {
  return del.sync('dist');
});

gulp.task('browserSync', () => {
  browserSync.init({
    server: {
      baseDir: options.src
    }
  })
});

gulp.task('compileScripts', () => {
  return browserify({entries: options.src + '/js/main.js', debug: true})
    .transform('babelify', { presets: ["env"] })
    .bundle()
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest(options.dist + '/js'))
});

gulp.task('compileSass', () => {
  return gulp.src(options.src + '/scss/styles.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(rename('bundle.css'))
    .pipe(gulp.dest(options.dist + '/css'));
});

gulp.task('images', () => {
  return gulp.src(options.src + '/images/**/*.+(png|jpg|jpeg|gif|svg)')
    .pipe(cache(imagemin()))
    .pipe(gulp.dest(options.dist + '/images'))
});

gulp.task('fonts', () => {
  return gulp.src(options.src + '/fonts/**/*')
    .pipe(gulp.dest(options.dist + '/fonts'))
});

gulp.task('html', () => {
  return gulp.src(options.src + '/*.html')
    .pipe(useref({
      noAssets: true
    }))
    .pipe(gulp.dest(options.dist));
});

gulp.task('build', (callback) => {
  runSequence(
    'clean',
    ['compileScripts', 'compileSass', 'fonts', 'images', 'html'],
    callback
  )
});

gulp.task('sass', function() {
  return gulp.src(options.src + '/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(options.src + '/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('default', ['browserSync', 'sass'], () => {
  gulp.watch(options.src + '/scss/**/*.scss', ['sass']);
  gulp.watch(options.src + '/*.html', browserSync.reload);
  gulp.watch(options.src + '/js/**/*.js', browserSync.reload);
});
