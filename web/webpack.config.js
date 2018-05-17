var path = require('path');
var webpack = require('webpack');
var ExtractText = require('extract-text-webpack-plugin');

module.exports = function (env) {
  console.log('<-- MATRACE-ROSTY startup... -->');

  var env = env.prod ? 'prod' : 'dev';

  var config = {
    entry: {
      'global': './src/js/index.js'
    },
    output: {
      path: path.join(__dirname, '/dist'),
      filename: 'app.min.js'
    },
    mode: env === 'prod' ? 'production' : 'development',
    devtool: env === 'prod' ? 'source-map' : 'eval-source-map', // viz.: https://webpack.js.org/configuration/devtool/
    plugins: [
      new ExtractText({
        filename: 'styles.min.css',
        disable: false,
        allChunks: true
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
          include: path.join(__dirname, '/app/js'),
          exclude: /node_modules/,
          query: {
            cacheDirectory: true,
            presets: ['es2015', 'react'],
            plugins: ["react-html-attrs", "transform-runtime"]
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
                  minimize: env === 'prod' ? true : false
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

  if(env === 'prod') {
    config.plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        },
        // source-map musi byt definovano i zde, jinak sse source mapy nebudou generovat (nebo jen pro css)
        // viz.: http://stackoverflow.com/questions/30870830/how-do-i-generate-sourcemaps-when-using-babel-and-webpack
        sourceMap: true
      })
    )
  }

  return config;
}