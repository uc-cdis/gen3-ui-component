const { src, dest, series } = require('gulp');
const postcss = require('gulp-postcss');
const assets = require('postcss-assets');
const autoprefixer = require('autoprefixer');
const postcssSvgo = require('postcss-svgo');
const cssnano = require('cssnano');
const babel = require('gulp-babel');
const argv = require('minimist')(process.argv.slice(2));

const isDev = argv.dev || false;

function css() {
  const plugins = [
    autoprefixer(),
    assets({
      loadPath: ['src/images/icons/'],
    }),
    postcssSvgo(),
    ...(!isDev ? [cssnano()] : []),
  ];

  return src('src/**/*.css')
    .pipe(postcss(plugins))
    .pipe(dest('dist'));
}

function js() {
  return src(
    [
      'src/components/**/*.js',
      'src/components/**/*.jsx',
      '!src/**/*.test.js',
      '!src/**/*.test.jsx',
    ],
    { sourcemaps: isDev }
  )
    .pipe(babel())
    .pipe(
      dest('dist/components', {
        sourcemaps: isDev ? '.' : false,
      })
    );
}

// This is for old data portal base.less and will be deprecated
function baseLess() {
  return src('src/css/base.less').pipe(dest('dist/css'));
}

exports.css = css;
exports.js = js;
exports['base.less'] = baseLess;

exports.default = series(css, js, baseLess);
