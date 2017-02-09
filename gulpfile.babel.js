'use strict'

import config from './config'
import gulp from 'gulp'
import plugins from 'gulp-load-plugins'
import rimraf from 'rimraf'
import yargs from 'yargs'

const $ = plugins()

const PRODUCTION = !!(yargs.argv.production)

gulp.task('clean', cb => rimraf(config.paths.dist, cb))

gulp.task('copy:misc', () => {
  return gulp.src(config.paths.misc.src)
    .pipe(gulp.dest(config.paths.misc.dest))
})

gulp.task('html:index', () => {
  const index = config.paths.html.index
  const appName = config.tokens.appName
  const themeColor = config.tokens.themeColor
  return gulp.src(index.src)
    .pipe($.replace(appName.find, appName.replace))
    .pipe($.replace(themeColor.find, themeColor.replace))
    .pipe(gulp.dest(index.dest))
})

gulp.task('img', () => {
  return gulp.src(config.paths.img.src)
    .pipe($.if(PRODUCTION, $.imagemin(config.imagemin)))
    .pipe(gulp.dest(config.paths.img.dest))
})

gulp.task('copy',
  gulp.parallel('copy:misc', 'html:index', 'img'))

gulp.task('scss', () => {
  const scss = config.paths.scss
  const themeColor = config.tokens.themeColor
  return gulp.src(scss.src)
    .pipe($.replace(themeColor.find, themeColor.replace))
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      includePaths: scss.include
    }).on('error', $.sass.logError))
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

gulp.task('build',
  gulp.series('clean', gulp.parallel('copy', 'scss')))
