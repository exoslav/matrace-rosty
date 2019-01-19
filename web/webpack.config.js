var path = require('path');
var webpack = require('webpack');
var ExtractText = require('extract-text-webpack-plugin');

module.exports = function (env) {
  console.log('<-- MATRACE-ROSTY startup... -->');

  var env = env.prod ? 'prod' : 'dev';

  var config = {
    entry: {
      'global': './src/js/global.js',
      'categories': './src/js/categories.js'
    },
    output: {
      path: path.join(__dirname, '/dist'),
      filename: '[name].min.js'
    },
    mode: env === 'prod' ? 'production' : 'development',
    devtool: env === 'prod' ? 'cheap-module-source-map' : 'inline-source-map', // viz.: https://webpack.js.org/configuration/devtool/
    plugins: [
      new ExtractText({
        filename: '[name].min.css',
        disable: false,
        allChunks: true
      }),
      new webpack.ProvidePlugin({
        jQuery: 'jquery',
        $: 'jquery',
        jquery: 'jquery'
      })
    ],
    resolve: {
      extensions: ['.js', '.json']
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          include: path.join(__dirname, '/src/js'),
          exclude: /node_modules/,
          query: {
            cacheDirectory: true,
            presets: ["babel-preset-env"]
          }
        },
        {
          test: /\.(css|scss|sass)$/,
          use: ExtractText.extract({
            "fallback": "style-loader",
            use: [
              {
                loader: 'css-loader',
                options: {
                  minimize: env === 'prod'
                }
              },
              'sass-loader'
            ]
          })
        },
        {
          test: /\.(png|jpg|svg|gif)$/,
          use: 'url-loader?limit=100000'
        },
        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          use: 'url-loader?limit=10000&minetype=application/font-woff'
        },
        {
          test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          use: 'file-loader'
        }
      ]
    }
  };

  return config;
}