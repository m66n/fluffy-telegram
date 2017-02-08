'use strict'

import config from './config'
import gulp from 'gulp'
import plugins from 'gulp-load-plugins'
import rimraf from 'rimraf'
import yargs from 'yargs'

const $ = plugins()

const PRODUCTION = !!(yargs.argv.production)

gulp.task('clean', cb => rimraf(config.paths.dist, cb))

gulp.task('html:index', () => {
  const index = config.paths.html.index
  const appName = config.tokens.appName
  const themeColor = config.tokens.themeColor
  return gulp.src(index.src)
    .pipe($.replace(appName.find, appName.replace))
    .pipe($.replace(themeColor.find, themeColor.replace))
    .pipe(gulp.dest(index.dest))
})