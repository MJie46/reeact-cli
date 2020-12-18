const path = require('path');
const webpack = require('webpack');
//const Jarvis = require("webpack-jarvis");
const baseWebpackConfig = require('./webpack.base.config')
const merge = require('webpack-merge')
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin');
//const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const optimizeCssPlugin = require('optimize-css-assets-webpack-plugin');



module.exports = merge(baseWebpackConfig, {
    mode: 'production',
    plugins: [
        //new ParallelUglifyPlugin({
        //    cacheDir: '.cache/',
        //    uglifyJS:{
        //        output: {
        //       // 是否输出可读性较强的代码，即会保留空格和制表符，默认为输出，为了达到更好的压缩效果，可以设置为false
        //            beautify: false,
        //    //是否保留代码中的注释，默认为保留，为了达到更好的压缩效果，可以设置为false
        //            comments: false
        //        },
        //        compress: {
        //        //是否在UglifyJS删除没有用到的代码时输出警告信息，默认为输出
        //            warnings: false,
        //        //是否删除代码中所有的console语句，默认为不删除，开启后，会删除所有的console语句
        //            drop_console: true,
        //        //是否内嵌虽然已经定义了，但是只用到一次的变量，比如将 var x = 1; y = x, 转换成 y = 1, 默认为否
        //            collapse_vars: true,
        //        }
        //    }
        //}),
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, '../dist/index.html'),
            template: path.resolve(__dirname, '../public/index.html'),
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            }
        }),
        new DllReferencePlugin({
            manifest: require('../dist/static/dll/react.manifest.json')
        }),
        new DllReferencePlugin({
            manifest: require('../dist/static/dll/utils.manifest.json')
        }),
        new optimizeCssPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { discardComments: { removeAll: true } },
            canPrint: true
        }),
    ],
    //optimization: {
    //    minimizer: [new UglifyJsPlugin({
    //        uglifyOptions:{
    //            compress:{
    //                warnings:false
    //            },
    //        },
    //        sourceMap:true,
    //        parallel:true
    //    })],
    //},
})
