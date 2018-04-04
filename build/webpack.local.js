var webpack = require('webpack');
var path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const base = require('../config/webpack.base')
const ExtractTextPlugin = require('extract-text-webpack-plugin')


base.entry = {
  'component-base-ui': './packages/index.js'
};
base.output.path = path.join(__dirname, '../lib');
base.output.filename = 'common.js'
base.output.library = 'ComponentBaseUI'
base.output.libraryTarget = 'window'
delete base.resolve

base.plugins = []
// Plugins Configuration
base.plugins.push(
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"production"'
    }
  })
);
base.plugins.push(
  // new UglifyJsPlugin({
  //   compress: {
  //     warnings: false,
  //   },
  //   comments: false,
  //   sourceMap: false,
  //   mangle: true,
  // })
  new UglifyJsPlugin({
    uglifyOptions: {
      ie8: false,
      ecma: 8,
      mangle: true,
      output: {
        comments: false,
        beautify: false
      },
      sourceMap: false,
      compress: {warnings: false},
      warnings: false
    }
  })
);
// Rules Configuration
base.module.rules.push({
  test: /\.vue$/,
  loader: 'vue-loader',
  options: {
    extractCSS: false,
    preserveWhitespace: false
  }
})

base.module.rules.push({
  test: /\.css$/,
  loader: ExtractTextPlugin.extract({
    use: [{ loader: 'css-loader' }, 'postcss-loader'],
    fallback: 'style-loader',
    publicPath: "../"
  })
})
base.module.rules.push({
  test: /\.scss$/,
  loader: ExtractTextPlugin.extract({
    use: [{ loader: 'css-loader' },{ loader: 'sass-loader' }, 'postcss-loader'],
    fallback: 'style-loader',
    publicPath: "../"
  })
})

module.exports = base


