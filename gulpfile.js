var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
var replace = require('gulp-replace');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');

gulp.task('taftera', function () {
  return gulp
    .src('./sass/main.scss')
    .pipe(rename('theme.scss'))
    .pipe(replace('{% assign ', '$'))
    .pipe(replace(" = '", ': '))
    .pipe(replace("' %}", ';'))
    .pipe(replace('{{ ', '$'))
    .pipe(replace(' }}', ''))
    .pipe(replace('{{', '$'))
    .pipe(replace('}}', ''))
    .pipe(gulp.dest('./build/'));
});

gulp.task('sass', function () {
  return (
    gulp
      // the directory where your Sass files lives
      .src('./build/theme.scss')
      .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
      // to add vendoer prefixes
      .pipe(autoprefixer())
      // rename our output to a .liquid file
      .pipe(rename('theme.css.liquid'))
      // to get rid of the double quotes inside the single quotes
      .pipe(replace('"{{', '{{'))
      .pipe(replace('}}"', '}}'))
      .pipe(replace('/*', ''))
      .pipe(replace('*/', ''))
      // determines our output directory
      .pipe(gulp.dest('./assets/'))
  );
});
