
const UglifyJsPlugin=require('uglifyjs-webpack-plugin')
const isDev = process.env.NODE_ENV !== "production"

const externals = {}
!isDev && (externals.vue = 'vue')

module.exports = {
  productionSourceMap: false,
  configureWebpack: {
    externals,
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            output: {
              comments: false,
            },
            warnings: false,
            compress: {
              drop_debugger: true,
              drop_console: true
            }
          }
        })
      ]
    }
  }
}