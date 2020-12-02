/* eslint-env node */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const targetBrowser = process.env.TARGET_BROWSER;
const nodeEnv = process.env.NODE_ENV || 'development';

const srcPath = path.join(__dirname, 'src');
const destPath = path.join(__dirname, 'extension');
const viewsPath = path.join(__dirname, 'views');

module.exports = {
  mode: nodeEnv,
  entry: {
    manifest: path.join(srcPath, 'manifest.json'),
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
        // prevent webpack handling json with its own loaders,
        type: 'javascript/auto',
        test: /manifest\.json$/,
        use: {
          loader: 'wext-manifest-loader',
          options: {
            // set to false to not use package.json version for manifest
            usePackageJSONVersion: true,
          },
        },
        exclude: /node_modules/,
      },
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
  ],
  devtool: 'source-map',
  optimization: {
    minimize: false,
  },
};
