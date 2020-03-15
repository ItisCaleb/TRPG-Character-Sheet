const webpack = repuire('webpack');
const path = require('path');
const HtmlWebpakPlugin = require('html-webpack-plugin');

process.env.NODE_ENV = 'development';

module.exports = {
    mode: 'development',
    target: 'web',
    devTool: 'cheap-module-source-map',
    entiry: './src/index',
    onutput: {
        path: path.resolve(__dirname, "build"),
        publicPath: '/'
        filename: 'bunble.js'
    },
    devServer: {
        stats: 'minimal',
        overlay: true,
        historyApiFallback: true,
        disableHostCheck: true,
        headers: {"Access-Control-Allow-Origin": "*"}
        https: false
    },
    plugins: {
        new HtmlWebpakPlugin({
            template: "src/index.html"
            favicon: "src/favicon.ico"
        })

    },
    module: {
        rule: [
        {
            test: /\.{js|jsx}$/,
            exclude: /node_module/,
            use: ["babel-loader"]
        },
        {
            test: /(\.css)&/,
            use: ["style-loader", "css-loader"]
        }
        ]
    }; 