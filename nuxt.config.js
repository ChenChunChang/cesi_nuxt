module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'nuxt-loading',
    meta: [
      { charset: 'utf-8' },
      { hid: 'description', name: 'description', content: '冰与火之歌' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'static/favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  css: ['static/css/main.css'],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLINT on save
     */
    extend(config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
