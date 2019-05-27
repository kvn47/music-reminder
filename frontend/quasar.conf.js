// Configuration for your app
const path = require('path')

module.exports = function (ctx) {
  return {
    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // boot: [
    //   'axios'
    // ],

    css: [
      'app.styl'
    ],

    extras: [
      'roboto-font',
      // 'material-icons', // optional, you are not bound to it
      // 'ionicons-v4',
      // 'mdi-v3',
      'fontawesome-v5'
      // 'eva-icons'
    ],

    framework: {
      // all: true, // --- includes everything; for dev only!

      components: [
        'QBtn',
        'QBtnToggle',
        'QCard',
        'QCardSection',
        'QCardActions',
        'QDate',
        'QDialog',
        'QExpansionItem',
        'QFab',
        'QFabAction',
        'QField',
        'QIcon',
        'QInput',
        'QItem',
        'QLayout',
        'QList',
        'QPage',
        'QPageContainer',
        'QPageSticky',
        'QPopupProxy',
        'QSeparator',
        'QTab',
        'QTabPanels',
        'QTabPanel',
        'QTabs',
        'QToolbar',
        'QToolbarTitle'
      ],

      directives: [
        'Ripple',
        'ClosePopup'
      ],

      // Quasar plugins
      plugins: [
        'Notify'
      ],

      // iconSet: 'ionicons-v4'
      iconSet: 'fontawesome-v5',
      lang: 'ru' // Quasar language
    },

    supportIE: false,

    build: {
      scopeHoisting: true,
      vueRouterMode: 'history',
      // vueCompiler: true,
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      extendWebpack (cfg) {
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/
        })

        cfg.resolve.alias = {
          ...cfg.resolve.alias,
          api: path.resolve(__dirname, './src/api'),
          lib: path.resolve(__dirname, './src/lib')
        }
      }
    },

    devServer: {
      // https: true,
      // port: 8080,
      // open: true // opens browser window automatically
    },

    // animations: 'all' --- includes all animations
    animations: [],

    ssr: {
      pwa: false
    },

    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {},
      manifest: {
        name: 'Music Reminder',
        short_name: 'Music Notes',
        description: 'Music Reminder',
        display: 'standalone',
        orientation: 'any',
        background_color: '#52a8ec',
        theme_color: '#027be3',
        icons: [
          {
            'src': 'statics/icons/icon-128.png',
            'sizes': '128x128',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-192.png',
            'sizes': '192x192',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-256.png',
            'sizes': '256x256',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-384.png',
            'sizes': '384x384',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-512.png',
            'sizes': '512x512',
            'type': 'image/png'
          }
        ]
      }
    },

    cordova: {
      // id: 'org.cordova.quasar.app'
    },

    electron: {
      // bundler: 'builder', // or 'packager'

      extendWebpack (cfg) {
        // do something with Electron main process Webpack cfg
        // chainWebpack also available besides this extendWebpack
      },

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Window only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration

        // appId: 'quasar-app'
      }
    }
  }
}
