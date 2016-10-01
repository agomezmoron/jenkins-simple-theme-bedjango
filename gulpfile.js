/**
 * @license
 * Copyright (c) 2016 Alejandro Gomez Moron, Francisco Javier Fernandez Ceña.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
/**
 * @Authors: Francisco Javier Fernandez <fjfernandez@emergya.com>
 *           Alejandro Gomez <amoron@emergya.com>
 * @Gulp|Tasks
 */

var gulp = require('gulp'),
  sass = require('gulp-sass'),
  concat = require('gulp-concat'),
  hashFilename = require('gulp-hash-filename'),
  gulpsync = require('gulp-sync')(gulp),
  del = require('del'),
  cleanCss = require('gulp-clean-css');
var paths = {
  sass: ['./src/scss/**/*.scss'],
  destCss: './dist/css/',
  devImg: './src/img/*.*',
  destImg: './dist/img/'
};

// Default task
gulp.task('default', gulpsync.sync(['sass-min', 'copy-img']));
//This task clean the dist directory
gulp.task('cleanDist', [], function () {
  del(paths.destCss + '*.*');
  del(paths.destImg + '*.*');
});
//Build the CSS
gulp.task('sass', gulpsync.sync(['cleanDist']), function (done) {
  gulp.src(['./src/scss/jenkins-bedjango-theme.scss'])
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(concat('jenkins-ladrupalera-theme.css'))
    .pipe(gulp.dest(paths.destCss))
    .on('end', done);
});
//Observes the scss changes
gulp.task('watch', function () {
  gulp.watch(paths.sass, gulpsync.sync(['sass-min', 'copy-img']));
});
//Build the minified CSS
gulp.task('sass-min', gulpsync.sync(['sass']), function (done) {
  gulp.src(paths.destCss + '**/*.css')
    .pipe(cleanCss({keepSpecialComments: 0, compatibility: {properties: {urlQuotes: false}}}))
    .pipe((hashFilename({"format": "{name}.min{ext}"})))
    .pipe(gulp.dest(paths.destCss))
    .on('end', done);
});
//Copy imgs
gulp.task('copy-img', [], function () {
  return gulp.src(paths.devImg)
    .pipe(gulp.dest(paths.destImg));
});
