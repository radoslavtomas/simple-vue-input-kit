const webpack = require("webpack");
const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "main"),
    filename: "index.js",
    libraryTarget: "umd",
    library: "SimpleKit"
  },
  mode: "production",
  target: "web",
  externals: [
    nodeExternals({
      importType: "umd"
    })
  ],
  resolve: {
    alias: {
      node_modules: path.join(__dirname, "node_modules")
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.css$/,
        exclude: /(node_modules|bower_components)/,
        use: ["style-loader", "css-loader", "postcss-loader"]
      },
      {
        test: /\.vue$/,
        exclude: /(node_modules|bower_components)/,
        loader: "vue-loader"
      }
    ]
  },
  plugins: [new VueLoaderPlugin()]
};
