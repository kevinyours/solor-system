const { resolve } = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        main: './src/main.ts',
    },
    resolve: {
        alias: {
            three: resolve('./node_modules/three'),
        },
        extensions: ['.ts', '.js'],
    },
    output: {
        path: resolve(__dirname, 'dist'),
        filename: 'bundle.[contenthash].js',
    },
    module: {
        rules: [
            {
                test: /\.(html)$/,
                use: ['html-loader'],
            },
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns: ['dist'],
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: './src/style.css', to: './style.css' },
                { from: './src/assets/textures', to: './textures' },
                { from: './src/assets/models', to: './models' },
            ],
        }),
    ],
};
