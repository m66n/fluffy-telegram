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
      src: srcPath('assets/scss/style.scss'),
      dest: destPath('assets/css'),
      watch: srcPath('assets/scss/**/*')
    },
    img: {
      src: srcPath('assets/img/**/*'),
      dest: destPath('assets/img')
    },
    js: {
      src: [
        /* libraries required by Foundation */
        'node_modules/jquery/dist/jquery.js',
        'node_modules/what-input/dist/what-input.js',
        /* core Foundation libraries */
        'node_modules/foundation-sites/js/foundation.core.js',
        'node_modules/foundation-sites/js/foundation.util.*.js',
        /* individual Foundation components;
           remove unused components */
        'node_modules/foundation-sites/js/foundation.abide.js',
        'node_modules/foundation-sites/js/foundation.accordion.js',
        'node_modules/foundation-sites/js/foundation.accordionMenu.js',
        'node_modules/foundation-sites/js/foundation.drilldown.js',
        'node_modules/foundation-sites/js/foundation.dropdown.js',
        'node_modules/foundation-sites/js/foundation.dropdownMenu.js',
        'node_modules/foundation-sites/js/foundation.equalizer.js',
        'node_modules/foundation-sites/js/foundation.interchange.js',
        'node_modules/foundation-sites/js/foundation.magellan.js',
        'node_modules/foundation-sites/js/foundation.offcanvas.js',
        'node_modules/foundation-sites/js/foundation.orbit.js',
        'node_modules/foundation-sites/js/foundation.responsiveMenu.js',
        'node_modules/foundation-sites/js/foundation.responsiveToggle.js',
        'node_modules/foundation-sites/js/foundation.reveal.js',
        'node_modules/foundation-sites/js/foundation.slider.js',
        'node_modules/foundation-sites/js/foundation.sticky.js',
        'node_modules/foundation-sites/js/foundation.tabs.js',
        'node_modules/foundation-sites/js/foundation.toggler.js',
        'node_modules/foundation-sites/js/foundation.tooltip.js',
        'node_modules/foundation-sites/js/foundation.zf.responsiveAccordionTabs.js',
        /* end of Foundation */
        srcPath('assets/js/script.js')
      ],
      dest: destPath('assets/js'),
      out: 'script.js'
    },
    misc: {
      src: [
        srcPath('**/*.*'),
        '!' + srcPath('**/*.html'),
        '!' + srcPath('assets/{img,js,scss}/**/*.*')
      ],
      dest: destPath('/')
    }
  },
  autoprefixer: {
    browsers: ['last 2 versions', 'ie >= 9', 'ios >= 7']
  },
  babel: {
    ignore: ['what-input.js']
  },
  browserSync: {
    server: destPath('/')
  },
  htmlmin: {
    removeComments: true,
    collapseWhitespace: true,
    collapseBooleanAttributes: true,
    removeAttributeQuotes: true,
    removeRedundantAttributes: true,
    removeEmptyAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    removeOptionalTags: true
  },
  imagemin: {
    progressive: true,
    interlaced: true
  },
  scss: {
    includePaths: [
      'node_modules/foundation-sites/scss'
    ],
    precision: 10
  }
}
