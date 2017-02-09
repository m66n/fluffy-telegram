'use strict'

import browserSync from 'browser-sync'
import config from './config'
import gulp from 'gulp'
import plugins from 'gulp-load-plugins'
import rimraf from 'rimraf'
import yargs from 'yargs'

const $ = plugins()
const server = browserSync.create()
const reload = server.reload

const PRODUCTION = !!(yargs.argv.production)

gulp.task('clean', cb => rimraf(config.paths.dist, cb))

gulp.task('copy:misc', () => {
  return gulp.src(config.paths.misc.src)
    .pipe(gulp.dest(config.paths.misc.dest))
})

gulp.task('html', () => {
  return gulp.src(config.paths.html.src)
    .pipe(gulp.dest(config.paths.html.dest))
})

gulp.task('img', () => {
  return gulp.src(config.paths.img.src)
    .pipe($.if(PRODUCTION, $.imagemin(config.imagemin)))
    .pipe(gulp.dest(config.paths.img.dest))
})

gulp.task('copy',
  gulp.parallel('copy:misc', 'html', 'img'))

gulp.task('scss', () => {
  const scss = config.paths.scss
  return gulp.src(scss.src)
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      includePaths: scss.include,
      precision: config.scss.precision
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer(config.autoprefixer))
    .pipe($.if(PRODUCTION, $.cssnano()))
    .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    .pipe(gulp.dest(scss.dest))
  /*
  .pipe(browser.reload({
    stream: true
  }))
  */
})

gulp.task('js', () => {
  return gulp.src(config.paths.js.src)
    .pipe($.sourcemaps.init())
    .pipe($.babel({
      ignore: []
    }))
    .pipe($.concat(config.paths.js.out))
    .pipe($.if(PRODUCTION, $.uglify()
      .on('error', e => console.log(e))))
    .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    .pipe(gulp.dest(config.paths.js.dest))
})

gulp.task('build',
  gulp.series('clean', gulp.parallel('copy', 'scss', 'js')))

gulp.task('default',
  gulp.series('build', gulp.parallel(serve, watch)))

function serve () {
  server.init(config.browserSync)
}

function watch () {
  gulp.watch(config.paths.misc.src, gulp.series('copy:misc'))
  gulp.watch(config.paths.html.src)
    .on('all', gulp.series('html', reload))
  gulp.watch(config.paths.img.src)
    .on('all', gulp.series('img', reload))
  gulp.watch(config.paths.scss.src)
    .on('all', gulp.series('scss', reload))
  gulp.watch(config.paths.js.src)
    .on('all', gulp.series('js', reload))
}
