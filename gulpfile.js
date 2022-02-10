const gulp = require('gulp');
const gulpif = require('gulp-if');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const assets = require('postcss-assets');
const autoprefixer = require('autoprefixer');
const postcssSvgo = require('postcss-svgo');
const minifyCSS = require('gulp-csso');
const babel = require('gulp-babel');

const argv = require('minimist')(process.argv.slice(2));

const isDev = argv.dev || false;

gulp.task('css', () => {
  const plugins = [
    autoprefixer(),
    assets({
      loadPath: ['src/images/icons/'],
    }),
    postcssSvgo(),
  ];
  return gulp.src('src/**/*.css')
    .pipe(postcss(plugins))
    .pipe(gulpif(!isDev, minifyCSS()))
    .pipe(gulp.dest('dist'));
});

gulp.task('js', () => gulp.src([
  'src/components/**/*.js',
  'src/components/**/*.jsx',
  '!src/**/*.test.js',
  '!src/**/*.test.jsx',
])
  .pipe(gulpif(isDev, sourcemaps.init()))
  .pipe(babel())
  .pipe(gulpif(isDev, sourcemaps.write({ sourceRoot: '/g3-ui/' })))
  .pipe(gulp.dest('dist/components')));

// This is for old data portal base.less and will be deprecated
gulp.task('base.less', () => gulp.src('src/css/base.less')
  .pipe(gulp.dest('dist/css')));

gulp.task('default', gulp.series('css', 'js', 'base.less'));
