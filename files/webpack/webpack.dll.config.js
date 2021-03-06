const path = require('path');
const DllPlugin = require('webpack/lib/DllPlugin');

module.exports = {
    mode: 'production',
    entry: {
        // 将React相关模块放入一个动态链接库
        react: ['react', 'react-dom'],
        utils: ['axios']
    },
    output: {
        filename: '[name].dll.js',
        path: path.resolve(__dirname, '../dist/static/dll'),
        // 存放动态链接库的全局变量名，加上_dll_防止全局变量冲突
        library: '[name]_dll'
    },
    // 动态链接库的全局变量名称，需要可output.library中保持一致，也是输出的manifest.json文件中name的字段值
    // 如react.manifest.json字段中存在"name":"_dll_react"
    plugins: [
        new DllPlugin({
            name: '[name]_dll',
            path: path.resolve(__dirname, '../dist/static/dll/[name].manifest.json')
        })
    ]
}