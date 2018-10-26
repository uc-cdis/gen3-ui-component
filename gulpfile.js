const gulp = require('gulp');
const gulpif = require('gulp-if');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const postcssInlineSvg = require('postcss-inline-svg');
const postcssSvgo = require('postcss-svgo');
const minifyCSS = require('gulp-csso');
const babel = require('gulp-babel');

const argv = require('minimist')(process.argv.slice(2));
const isDev = argv['dev'] || false;

gulp.task('css', function(){
  const plugins = [
    autoprefixer(),
    postcssInlineSvg(),
    postcssSvgo(),
  ];
  return gulp.src('src/**/*.css')
    .pipe(postcss(plugins))
    .pipe(gulpif(!isDev, minifyCSS()))
    .pipe(gulp.dest('dist'))
});

gulp.task('js', function(){
  return gulp.src([
      'src/components/**/*.jsx',
      '!src/**/*.test.js',
      '!src/**/*.test.jsx',
    ])
    .pipe(gulpif(isDev, sourcemaps.init()))
    .pipe(babel())
    .pipe(gulpif(isDev, sourcemaps.write({sourceRoot: '/g3-ui/'})))
    .pipe(gulp.dest('dist/components'))
});

// This is for old data portal base.less and will be deprecated
gulp.task('base.less', function() {
  return gulp.src('src/css/base.less')
    .pipe(gulp.dest('dist/css'))
})

gulp.task('default', [ 'css', 'js', 'base.less' ]);
