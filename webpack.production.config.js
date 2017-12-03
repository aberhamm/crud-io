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
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true
      }
    }),
    new CompressionPlugin({
      asset: "[path].gz",
      algorithm: "gzip",
      test: /\.js$$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
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
  }
};
