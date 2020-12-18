process.env.MODE_ENV = 'production'

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('./config')
const webpackConfig = require('./webpack.pro.config')

const spinner = ora('building for production...\n')
spinner.start()

var args = process.env
var dll = args[2]

var dest = path.resolve(__dirname, '../dist/static/js')

rm(dest, (err) => {
    if(err) throw err
    webpack(webpackConfig, (err, stats) => {
        spinner.stop()
        if(err) throw err
        process.stdout.write(stats.toString({ colors: true, modules: false, children: false, chunks: false, chundModules: false }) + '\n\n')
        if(stats.hasErrors()) {
            console.log(chalk.red('Build failed...\n'))
            process.exit(1)
        }
        console.log(chalk.cyan('Build completed...\n'))
    })
})