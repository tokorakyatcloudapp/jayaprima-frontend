var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass')(require('sass')),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create();

var DEST = 'public/build/';

var compileScripts = function () {
    return gulp.src([
        'src/controller_views_src/js/helpers/*.js',
        'src/controller_views_src/js/*.js',
    ])
        .pipe(concat('custom.js'))
        .pipe(gulp.dest(DEST + '/js'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest(DEST + '/js'))
        .pipe(browserSync.stream());
};

// TODO: Maybe we can simplify how sass compile the minify and unminify version
var compileSASS = function (filename, options) {
    return gulp.src('src/controller_views_src/scss/*.scss')
        .pipe(sass(options).on('error', sass.logError))
        .pipe(concat(filename))
        .pipe(gulp.dest(DEST + '/css'))
        .pipe(browserSync.stream());
};

exports.sass = function () {
    return compileSASS('custom.css', {});
};

exports.sassminify = function () {
    return compileSASS('custom.min.css', { style: 'compressed' });
};

exports.script = function () {
    return compileScripts();
};
