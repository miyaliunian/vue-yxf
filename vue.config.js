const port = process.env.port || 9000
const path = require('path')
const { VantResolver } = require('unplugin-vue-components/resolvers')
const ComponentsPlugin = require('unplugin-vue-components/webpack')
const { defineConfig } = require('@vue/cli-service')

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = defineConfig({
  outputDir:
    process.env.VUE_APP_TYPE === 'prod' ? 'prod-h5-yxf' : 'test-h5-yxf',
  publicPath: process.env.VUE_APP_NGINX_CONTENT,
  transpileDependencies: true,
  lintOnSave: true,
  devServer: {
    open: true,
    port,
    proxy: {
      '^/api': {
        target: process.env.VUE_APP_BASE_URL,
        ws: true,
        changeOrigin: true,
      },
    },
  },

  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = '信用付'
      return args
    })
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@api', resolve('src/api'))
      .set('@assets', resolve('src/assets'))
      .set('@store', resolve('src/store'))
      .set('@utils', resolve('src/utils'))
      .set('@constant', resolve('src/constant'))
      .set('@hooks', resolve('src/hooks'))
      .set('@utils', resolve('src/utils'))
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach((type) =>
      addStyleResource(config.module.rule('stylus').oneOf(type))
    )
  },
  configureWebpack: {
    plugins: [
      ComponentsPlugin({
        resolvers: [VantResolver()],
      }),
    ],
  },
})

function addStyleResource(rule) {
  rule
    .use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        resolve('src/common/styles/variables.less'),
        resolve('src/common/styles/mixin.less'),
        resolve('src/common/styles/theme.less'),
      ],
    })
}
