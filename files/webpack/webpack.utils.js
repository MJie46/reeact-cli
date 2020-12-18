const path = require('path')

exports.assetsPath = function (_path) {
    const assetsSubDirectory = process.env.MODE_ENV === 'production' ? 'static' : 'static'
    return path.posix.join(assetsSubDirectory, _path)
}

//根据这个stats.json，我们可以拿到在整个项目中拿到的所有项目文件:

/**
 * 查询依赖的模块
 */
function findSrcModules () {
    return new Promise((resolve, reject) => {
        fs.readFile(statPath, (err, data) => {
            if(err) return
            const json = JSON.parse(data)
            const assetsList = json.chunks
            let ret = []
            // 拿到所有chunk的所有依赖文件
            assetsList.forEach(chunk => {
                const modules = chunk.modules.map(item => item.name)
                ret = ret.concat(modules)
            })
            // 去除node_modules中的文件
            ret = ret.filter(item => item.indexOf('node_modules') < 0)
            resolve(ret)
        })
    })
}

function getAllFilesInSrc () {
    const pattern = './src/**'

    return new Promise((resolve, reject) => {
        glob(pattern, {
            nodir: true
        }, (err, files) => {
            const ret = files.map(item => {
                return item.replace('./src', '.')
            })
            resolve(ret)
        })
    })
}