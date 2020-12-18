const path = require("path");
const fs = require("../utils/fs-promise");
const install = require("../utils/install");

module.exports = async function (name) {
    async function mkdirAndCopy (src, dest) {
        //return new Promise((resolve, reject) => {
        const files = await fs.readdir(src);
        for(let i = 0; i < files.length; i++) {
            const fileName = files[i]
            const filePath = path.join(src, fileName)
            const fileStat = await fs.stat(filePath)
            const destPath = path.join(dest, fileName)
            if(fileStat.isFile()) {
                await fs.copyFile(filePath, destPath)
            } else {
                await fs.mkdirp(destPath);
                mkdirAndCopy(filePath, destPath)
            }
        }
        //})
    }

    const projectDir = path.join(process.cwd(), name);
    await fs.mkdirp(projectDir);
    console.log(`创建${name}文件夹成功`);
    const filesDir = path.resolve(__dirname, "../files");
    mkdirAndCopy(filesDir, projectDir)
    //  const generatorDir = path.resolve(__dirname, "../generator");
    //  const files = await fs.readdir(generatorDir);
    //  for (let i = 0; i < files.length; i++) {
    //    const { template, dir, name: fileName } = require(path.join(generatorDir, files[i]))(name);
    //    await fs.mkdirp(path.join(projectDir, dir));
    //    await fs.writeFile(path.join(projectDir, dir, fileName), template.trim());
    //    console.log(`创建${fileName}文件成功`);
    //  }
    console.log(`开始安装依赖包...`);
    install({ cwd: projectDir });
};
