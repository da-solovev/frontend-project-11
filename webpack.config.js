const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = (env) => {
  return {
    mode: env.mode ?? 'development',
    entry: './src/index.js',
    output: {
      filename: '[name][contenthash].js',
      path: path.resolve(__dirname, 'build'),
      clean: true,
    },
    plugins: [
      new webpack.ProgressPlugin(),
      new HtmlWebpackPlugin({ template: 'index.html' }),
    ],
    module: {
      rules: [
        { test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader'] },
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader'],
        },
      ],
    },
    devServer: {
      client: {
        overlay: {
          warnings: false,
          errors: true
        }
      }
    }
  }
};
