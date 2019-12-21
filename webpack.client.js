const path = require('path')
// 规避node-module
// const nodeExternals = require('webpack-node-externals')

// 客户端的webpack
module.exports = {
  mode: 'development',
  entry: './client/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        // 支持import 支持jsx
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react', ['@babel/preset-env']]
        }
      },
      {
        test: /\.css$/,
        // 支持import 支持jsx
        loader: ['style-loader', 'css-loader'],
      }
    ]
  }
}