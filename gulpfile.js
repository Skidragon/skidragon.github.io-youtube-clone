//==================
// Table of Contents
// - Watch Task
// - CSS
// - JS
// - Other Tasks
//===================

const gulp = require('gulp'),
    watch = require('gulp-watch'),

    //Refreshes the browser, creates a local server, and does CSS injections
    browserSync = require('browser-sync').create(),

    //The errorHandler uses the customPlumber function
    errorHandler = require('./gulp/tasks/error-handler'),

    //This compiles our SASS files
    sass = require('gulp-sass'),

    //Makes the SASS files compile beautified CSS
    cssBeautify = require('gulp-cssbeautify'),
    
    //Gives the CSS prefixes like webkit to the CSS
    cssAutoPrefixer = require('gulp-autoprefixer');

//=======================
//ALL CSS AND SASS TASKS
//========================
gulp.task('sass', function () {
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
        .pipe(errorHandler.customPlumber('Error Running Sass'))
        .pipe(sass())
        .pipe(cssAutoPrefixer())
        .pipe(cssBeautify())
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.stream());
});

gulp.task('sass-global', function () {
    return gulp.src(['src/scss/global/*.scss'])
        .pipe(errorHandler.customPlumber('Error in Global Sass'))
        .pipe(sass())
        .pipe(cssAutoPrefixer())
        .pipe(cssBeautify())
        .pipe(gulp.dest('src/css/global/*.css'))
        .pipe(browserSync.stream());
});


gulp.task('sass-modules', function () {
    return gulp.src(['src/css/modules/*.scss'])
        .pipe(errorHandler.customPlumber('Error in Modules Sass'))
        .pipe(sass())
        .pipe(cssAutoPrefixer())
        .pipe(cssBeautify())
        .pipe(gulp.dest('src/css/modules/*.css'))
        .pipe(browserSync.stream());
});

//Puts normal css files into the right directories
gulp.task('css', function () {
    return gulp.src(['node_modules/normalize.css/normalize.css'])
        .pipe(errorHandler.customPlumber('Error running node module CSS files'))
        .pipe(gulp.dest('src/css'));
});



//=======================
//ALL JS TASKS
//========================

// Move the javascript files into our /src/js folder
gulp.task('js', function () {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
        .pipe(gulp.dest('src/js'))
        .pipe(browserSync.stream());
});


//=======================
//ALL OTHER TASKS
//========================


// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'sass-global', 'sass-modules', 'css'], function () {

    browserSync.init({
        server: './src'
    });

    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], ['sass']);
    gulp.watch('src/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['js', 'serve']);
