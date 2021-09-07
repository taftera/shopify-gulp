var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
var replace = require('gulp-replace');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var del = require('del');

const filename = 'style';

gulp.task('deliquify', function () {
	return gulp
    .src(`./assets/${filename}.scss.liquid`)
		.pipe(rename(`${filename}.scss`))

    // Assigned variables
    // .pipe(replace('{% assign ', '$'))
		.pipe(replace('{%- assign ', '$'))
		// operators
    .pipe(replace('{%- if', '/* {%- if'))
    // .pipe(replace('{%- else', '// {%- else'))
    // .pipe(replace('{%- elsif', '// {%- elsif'))
		.pipe(replace('endif -%}', 'endif -%} */'))
    .pipe(replace(" = '", ': '))
    .pipe(replace(" = ", ': '))
    // .pipe(replace("' %}", ';'))
		.pipe(replace("' -%}", ';'))
    
    // commented variables
    .pipe(replace('{#  {%- ', '{#  {%- '))
		.pipe(replace(' -%}  #}', ' -%}  #}'))
		
    // Using variables
    .pipe(replace('{{ ', '$'))
    .pipe(replace(' }}', ''))
    .pipe(replace('{{', '$'))
    .pipe(replace('}}', ''))
    .pipe(gulp.dest('./build/'));
});

gulp.task('clean', function () {
  return del([
    // delete earlier iterations
    `./build/${filename}.scss`
  ]);
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
