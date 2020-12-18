const path = require('path');
const webpack = require('webpack');
const HappyPack = require('happypack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const happyThreadPool = HappyPack.ThreadPool({ size: 5 }); //构建共享进程池，包含5个进程
const utils = require('./webpack.utils')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const devMode = process.env.NODE_ENV !== 'production';
function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    entry: resolve('/src/index.js'),
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: resolve('src'),
                exclude: resolve('/node_modules'),
                use: ['happypack/loader?id=babel'],
            },
            {
                test: /\.css$/,
                //使用的mini-css-extract-plugin提取css此处，如果放在上面会出错
                //use: ['style-loader','css-loader']
                use: ['happypack/loader?id=css'],
            }
        ]
    },
    resolve: {
        modules: [resolve('node_modules')],
        extensions: ['*', '.js', '.jsx'],
        alias: {
            '@': resolve('src')
        },
        fallback: {
            path: require.resolve("path-browserify"),
            url: require.resolve("url"),
            buffer: require.resolve("buffer/"),
            util: require.resolve("util/"),
            stream: require.resolve("stream-browserify/")
        }
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: process.env.MODE_ENV === 'production' ? './' : '/',
        filename: utils.assetsPath('js/[name].[chunkhash].js'),
        chunkFilename: utils.assetsPath('js/[id].[chunkhash].js'),
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: devMode ? '[name].css' : '[name].[contenthash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[contenthash].css',
        }),
        // happypack并行处理
        new HappyPack({
            // 用唯一ID来代表当前HappyPack是用来处理一类特定文件的，与rules中的use对应
            id: 'babel',
            loaders: ['babel-loader?cacheDirectory'],//默认设置loader处理
            threadPool: happyThreadPool,//使用共享池处理
        }),
        new HappyPack({
            id: 'js',
            threadPool: happyThreadPool,
            loaders: ['babel-loader']
        }),
        new HappyPack({
            // 用唯一ID来代表当前HappyPack是用来处理一类特定文件的，与rules中的use对应
            id: 'css',
            loaders: ['style-loader', 'css-loader'],
            threadPool: happyThreadPool
        }),
        //new ExtractTextPlugin({
        //    filename: utils.assetsPath('css/[name].[contenthash].css'),
        //    allChunks: true
        //}),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, '../static'),
                    to: 'static'
                }
            ]
        })
    ],
    optimization: {
        splitChunks: {
            chunks: "all",
            cacheGroups: {
                vendors: {
                    test: /node_modules/,
                    name: 'vendors',
                    minSize: 0,
                    minChunks: 1,
                    chunks: 'initial',
                    priority: 2 // 该配置项是设置处理的优先级，数值越大越优先处理 
                },
                commons: {
                    name: "comomns",
                    test: resolve("src/components"), // 可自定义拓展规则
                    minChunks: 2, // 最小共用次数
                    minSize: 0,   //代码最小多大，进行抽离
                    priority: 1, //该配置项是设置处理的优先级，数值越大越优先处理 
                }
            }
        }
    },
    externals: {
        fs: 'require("fs")',
    },
};
