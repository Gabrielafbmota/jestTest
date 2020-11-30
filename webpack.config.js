const fs = require('fs')
const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')

const localFoldersRegex = /\.bin|\.cache|\.yarn-integrity/

const getModules = () => fs.readdirSync(path.resolve('./node_modules'))

const externals = () =>
  getModules()
    .filter((mod) => !localFoldersRegex.test(mod))
    .reduce((modules, mod) => {
      modules[mod] = `commonjs ${mod}`
      return modules
    }, {})

module.exports = {
  target: 'node',
  devtool: 'inline-source-map',
  externals: externals(),
  entry: ['babel-polyfill', './src/server.js'],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'main.js',
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: 'config', to: path.resolve(__dirname, 'build/config') }],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
}
