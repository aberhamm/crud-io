const path = require('path');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  // the entry file for the bundle
  entry: path.join(__dirname, '/client/src/index'),

  // the bundle file we will get in the result
  output: {
    path: path.join(__dirname, '/server/static/js'),
    filename: 'app.js',
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new CompressionPlugin({
      asset: "[path].gz",
      algorithm: "gzip",
      test: /\.js$$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader', {
          loader: 'eslint-loader',
          options: {
            failOnError: true,
          }
        }]
      }, {
        test: /\.json?$/,
        loader: 'json'
      }, {
        test: /\.(png|woff|woff2|eot|ttf|svg|otf)$/,
        loader: 'url-loader?limit=100000'
      }, {
        test: /\.(ttf|eot|svg)(\?[a-z0-9#=&.]+)?$/,
        loader: 'file'
      }
    ]
  },
  // start Webpack in a watch mode, so Webpack will rebuild the bundle on changes
  watch: true
};
