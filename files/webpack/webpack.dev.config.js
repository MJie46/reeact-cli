const path = require('path');
const config = require('./config')
const webpack = require('webpack');
//const Jarvis = require("webpack-jarvis");
const baseWebpackConfig = require('./webpack.base.config')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = merge(baseWebpackConfig, {
    mode: 'development',
    devServer: {
        host: config.dev.host,
        port: config.dev.port,
        contentBase: false,
        //contentBase: path.resolve(__dirname, '../dist'),
        publicPath: config.dev.assetsPublicPath,
        proxy: config.dev.proxyTable,
        hot: true,
        watchOptions: {
            poll: config.dev.poll
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, '../public/index.html'),
            inject: true
        }),
    ]
})