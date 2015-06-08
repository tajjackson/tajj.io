/*!
 * gulp
 * $ npm install gulp-ruby-sass gulp-autoprefixer gulp-minify-css gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-notify gulp-rename gulp-cache del --save-dev
 */
 
// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    del = require('del');
 
// Styles
gulp.task('sass', function() {
return sass('src/scss/main.scss', { style: 'expanded' })
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('src/stylesheets/'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/css/'))
    .pipe(reload({stream: true}));
});

gulp.task('sassfa', function() {
return sass('src/scss/font-awesome/font-awesome.scss', { style: 'expanded' })
    .pipe(gulp.dest('src/scss/font-awesome/'))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('src/stylesheets/'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/css/'));
});
 
// Scripts
gulp.task('scripts', function() {
  return gulp.src('src/scripts/main.js')
    .pipe(jshint.reporter('gulp-jshint-file-reporter', {
      filename: '/src/scripts' + '/jshint-output.log'
    }))
    .pipe(concat('main.js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/'));
});
 
// Images
gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/images'))
    .pipe(notify({ message: 'Images task complete' }));
});
 
// Clean
gulp.task('clean', function(cb) {
    del(['dist/assets/css', 'dist/assets/js', 'dist/assets/img'], cb)
});
 
// Default task
gulp.task('default', function() {
    gulp.start('serve');
});

// BrowserSync
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("src/scss/*.scss", ['sass']);
    gulp.watch("index.html").on('change', reload);
    gulp.watch("src/scripts/**/*.js", ['scripts']).on('change', reload);
});