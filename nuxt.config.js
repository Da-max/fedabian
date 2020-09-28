require('dotenv').config()

module.exports = {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Portfolio de Maxime `Da-max` Ben Hassen'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#ed8936' },
  router: {
    linkActiveClass: 'active-link'
  },
  /*
   ** Global CSS
   */
  css: [
    '@/assets/scss/main.scss',
    '@fortawesome/fontawesome-svg-core/styles.css',
    'katex/dist/katex.min.css'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '~/plugins/uikit', mode: 'client' },
    { src: '~/plugins/axios' }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxtjs/fontawesome',
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/dotenv'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/pwa',
    '@nuxtjs/proxy',
    'nuxt-leaflet',
    '@nuxtjs/markdownit'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    prefix: '/api/',
    proxy: true
  },
  /*
   ** Auth module configuration
   ** See https://auth.nuxtjs.org/
   */
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: 'users/login', method: 'post', propertyName: 'token' },
          user: { url: 'users/current', method: 'get', propertyName: 'user' }
        }
      }
    },
    redirect: {
      login: '/compte/se-connecter'
    }
  },
  /*
   ** Proxy configuration
   ** See https://nuxtjs.org/faq/http-proxy
   */
  proxy: {
    '/api/': {
      target: 'https://fedabian.herokuapp.com/'
    }
  },
  /*
   ** Fontawesome mddule configuration
   */
  fontawesome: {
    icons: {
      regular: ['faFolderOpen', 'faUser', 'faFileCode'],
      brands: [
        'faLinux',
        'faPython',
        'faJs',
        'faHtml5',
        'faCss3Alt',
        'faMastodon',
        'faTwitter',
        'faGithub',
        'faGitlab'
      ],
      solid: ['faCode', 'faEye', 'faEnvelope']
    }
  },
  /*
   ** Markdownit options
   ** See https://github.com/markdown-it/markdown-it
   */
  markdownit: {
    injected: true,
    html: true,
    typography: true,
    // preset: 'default',
    // linkify: true,
    // breaks: true,
    use: ['@abreto/markdown-it-katex', '@hackmd/markdown-it-imsize']
  },
  /*
   ** NuxtJs telemetry
   ** See https://github.com/nuxt/telemetry
   */
  telemetry: false,

  optimizeCSS: true,
  analyze: true,
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      config.node = { fs: 'empty' }
    }
  }
}
