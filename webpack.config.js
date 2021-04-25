const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const EsLintPlugin = require('eslint-webpack-plugin');
const StylelintWebpackPlugin = require('stylelint-webpack-plugin');
const { merge } = require('webpack-merge');
const webpack = require('webpack');
const loadConfig = (mode) => require(`./build-utils/webpack.${mode}`)(mode);
const path = require('path');

module.exports = ({ mode, presets } = { mode: 'production', presets: [] }) =>
  merge(
    {
      mode,
      plugins: [
        new HtmlWebpackPlugin({
          template: './index.html',
        }),
        new webpack.ProgressPlugin(),
        new MiniCssExtractPlugin({
          filename: '[name].[contenthash].css',
        }),
        new EsLintPlugin({
          extensions: ['js', 'ts'],
          failOnWarning: true,
        }),
        new StylelintWebpackPlugin({
          failOnWarning: true,
        }),
      ],
      context: path.resolve(__dirname, 'src'),
      entry: './index.ts',
      module: {
        rules: [
          {
            test: /\.ts$/,
            exclude: /(node_modules|bower_components)/,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env'],
                },
              },
              'ts-loader',
            ],
          },
          {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env'],
                },
              },
            ],
          },
          {
            test: /\.css$/,
            use: [
              mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 1,
                },
              },
              'postcss-loader',
            ],
          },
        ],
      },
    },
    loadConfig(mode),
  );
