var webpack = require("webpack");
var path = require("path");
//var HtmlWebpackPlugin = require("html-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var BUILD_DIR = path.resolve(__dirname, "dist");
var APP_DIR = path.resolve(__dirname, "src");

const extractSass = new ExtractTextPlugin({
  filename: "[name].bundle.css",
  allChunks: true
});

module.exports = {
  entry: APP_DIR + "/index.js",
  output: {
    filename: "main.bundle.js",
    path: BUILD_DIR,
    publicPath: "/"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        include: APP_DIR,
        query: {
          presets: ["es2015", "react"]
        }
      },
      {
        test: /\.scss$/,
        use: extractSass.extract([
          {
            loader: "css-loader",
            options: {
              minimize: true
            }
          },
          "postcss-loader",
          "sass-loader"
        ])
      },
      {
        test: /\.(ttf|eot|svg|woff|woff2)$/,
        loader: "file-loader",
        include: APP_DIR + "/fonts",
        options: {
          name: "fonts/[name].[ext]"
        }
      }
    ]
  },
  plugins: [
    extractSass,
    new CopyWebpackPlugin([
      { from: APP_DIR + "/libs", to: BUILD_DIR + "/libs" },
      { from: APP_DIR + "/.htaccess", to: BUILD_DIR },
      { from: APP_DIR + "/favicons", to: BUILD_DIR },
      { from: APP_DIR + "/index.php", to: BUILD_DIR }
    ])
  ]
};
