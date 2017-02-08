import {
  join
} from 'path'

const DIST = 'dist'
const SRC = 'src'

const APP_NAME = 'fluffy-telegram'
const THEME_COLOR = '#2f3ba2'

function srcPath (path) {
  return join(SRC, path)
}

function destPath (path) {
  return join(DIST, path)
}

export default {
  paths: {
    src: SRC,
    dist: DIST,
    html: {
      index: {
        src: srcPath('index.html'),
        dest: destPath('/')
      }
    },
    scss: {
      include: [],
      src: srcPath('assets/scss/style.scss'),
      dest: destPath('assets/css')
    }
  },
  autoprefixer: {
    browsers: ['last 2 versions', 'ie >= 9', 'ios >= 7']
  },
  tokens: {
    appName: {
      find: /%%appName%%/g,
      replace: APP_NAME
    },
    themeColor: {
      find: /%%themeColor%%/g,
      replace: THEME_COLOR
    }
  }
}
