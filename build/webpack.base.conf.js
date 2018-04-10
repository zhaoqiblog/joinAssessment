var path = require('path')
var chalk = require('chalk')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var vuxLoader = require('vux-loader')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

var webpackConfig = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      /*{
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },*/
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}

// vu
var vuxPlugins = [
  {
    name: 'vux-ui'
  }
]

// 若 run npm buildx.js 则使用分片加载
if (process.argv[2] === '-split') {
  vuxPlugins.push({
    name: 'js-parser',
    test: /pages\/pages\.js$/,
    fn(source) {
      source = source.replace(/^\s*import\s+(\w+)\s+from\s+([^;]+?);?\s*$/gm, ($0, $1, $2) => {
        return `const ${$1} = function (resolve) {
  require([${$2}], resolve)
}`
      })
      console.log(chalk.green('\n\nYour are building a code-splitting Solo app.\n'))
      return source
    }
  })
}
module.exports = vuxLoader.merge(webpackConfig, {
  options: {},
  plugins: vuxPlugins
})

