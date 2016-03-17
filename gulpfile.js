/*
 * Copyright (c) 2015 TopCoder, Inc. All rights reserved.
 * @author TCSASSEMBLER
 * @version 1.0
 */

/**
 * Gulp configuration file
 */
"use strict";
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var istanbul = require('gulp-istanbul');
var mocha = require('gulp-mocha');
var exit = require('gulp-exit');

gulp.task('lint', function () {
    return gulp.src('src/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('test', function () {
    return gulp.src(['test/*.js'])
        .pipe(mocha({
            timeout: 60000
        }))
        .pipe(istanbul.writeReports())
        .pipe(exit());
});

gulp.task('default', ['lint', 'test']);