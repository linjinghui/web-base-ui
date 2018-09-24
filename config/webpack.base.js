'use strict';

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = require('./config');

module.exports = {
  entry: {
    'babel-polyfill': 'babel-polyfill',
    client: './src/index.js'
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].js',
    publicPath: './'

  },
  resolve: {
    extensions: ['.js', '.vue', '.css', '.json'],
    alias: {
      '~root': path.join(__dirname, '../src'),
      '~packages': path.join(__dirname, '../packages')
    }
  },
  performance: {},
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /.vue$/,
        use: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: [/node_modules/]
      },
      {
        test: /\.(ico|jpg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        use: [{
          loader: 'url-loader?limit=8192',
          options: {
            name: 'images/[hash].[ext]',
            // outputPath: 'images'  [path] []
          }
        }]
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader'
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      'window.Quill': 'quill'
    }),
    new HtmlWebpackPlugin({
      title: config.title,
      icon: config.icon,
      template: __dirname + '/index.html',
      filename: './index.html'
    })
  ]
};
