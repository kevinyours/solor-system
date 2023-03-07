const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const webpackMode = process.env.NODE_ENV || 'development';

module.exports = {
    mode: webpackMode,
    entry: {
        main: './src/main.ts',
    },
    resolve: {
        alias: {
            three: path.resolve('./node_modules/three'),
        },
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        path: path.resolve('../dist'),
        filename: '[name].min.js',
    },
    devServer: {
        liveReload: true,
    },
    optimization: {
        minimizer:
            webpackMode === 'production'
                ? [
                      new TerserPlugin({
                          terserOptions: {
                              compress: {
                                  drop_console: true,
                              },
                          },
                      }),
                  ]
                : [],
        splitChunks: {
            chunks: 'all',
        },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify:
                process.env.NODE_ENV === 'production'
                    ? {
                          collapseWhitespace: true,
                          removeComments: true,
                      }
                    : false,
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                { from: './src/style.css', to: './style.css' },
                { from: './src/assets/textures', to: './textures' },
                { from: './src/assets/models', to: './models' },
                // { from: "./src/images", to: "./images" },
                // { from: "./src/sounds", to: "./sounds" }
            ],
        }),
    ],
};
