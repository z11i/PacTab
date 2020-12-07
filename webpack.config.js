/* eslint-env node */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const targetBrowser = process.env.TARGET_BROWSER;
const nodeEnv = process.env.NODE_ENV || 'development';

const srcPath = path.join(__dirname, 'src');
const destPath = path.join(__dirname, 'extension');
const viewsPath = path.join(__dirname, 'views');

module.exports = {
  mode: nodeEnv,
  entry: {
    background: path.join(srcPath, 'background', 'index.ts'),
    options: path.join(srcPath, 'option', 'index.tsx'),
  },
  output: {
    path: path.join(destPath, targetBrowser),
    filename: 'js/[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        use: [{
          loader: 'babel-loader',
        }, {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        }],
        exclude: ['/node_modules/'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'json'],
    alias: {
      'webextension-polyfill-ts': path.resolve(
        path.join(__dirname, 'node_modules', 'webextension-polyfill-ts'),
      ),
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new HtmlWebpackPlugin(({
      template: path.join(viewsPath, 'options.html'),
      inject: 'body',
      chunks: ['options'],
      hash: true,
      filename: 'options.html',
    })),
    new CopyPlugin({
      patterns: [
        { from: path.join(srcPath, 'manifest.json'), to: 'manifest.json' },
        { from: path.join(srcPath, 'assets', 'icon.svg'), to: 'icon.svg' },
      ],
    }),
  ],
  devtool: 'source-map',
  optimization: {
    minimize: false,
  },
};
