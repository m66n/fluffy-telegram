import { join } from 'path'

const DIST = 'dist'
const SRC = 'src'

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
      src: srcPath('**/*.html'),
      dest: destPath('/')
    },
    scss: {
      include: [],
      src: srcPath('assets/scss/style.scss'),
      dest: destPath('assets/css')
    },
    img: {
      src: srcPath('assets/img/**/*'),
      dest: destPath('assets/img')
    },
    js: {
      src: [
        srcPath('assets/js/script.js')
      ],
      dest: destPath('assets/js'),
      out: 'script.js'
    },
    misc: {
      src: [
        srcPath('**/*.*'),
        '!' + srcPath('index.html'),
        '!' + srcPath('assets/{img,js,scss}/**/*.*')
      ],
      dest: destPath('/')
    }
  },
  autoprefixer: {
    browsers: ['last 2 versions', 'ie >= 9', 'ios >= 7']
  },
  browserSync: {
    server: destPath('/'),
    port: 8080
  },
  imagemin: {
    progressive: true,
    interlaced: true
  },
  scss: {
    precision: 10
  }
}
