const { src, dest, parallel } = require('gulp');
var imagemin = require('gulp-imagemin'); // 图片压缩
var uglify = require('gulp-uglify'); // js压缩
var sass = require('gulp-sass');// sass编译
var concat = require('gulp-concat'); // 代码合并
var base64 = require('gulp-base64');
const filter = require('gulp-filter');
const htmlmini = require('gulp-htmlmin');


function defaultTask (cb) {
    // place code for your default task here
    console.log('hello gulp')
    cb();
}

function copyHtml () {
    // 选取到src目录下的所有html文件 （为了测试效果，请自己再src目录下随便创建两个html文件咯）
    return src('src/*.html')
        .pipe(dest('dist')); // 将html拷贝到dist目录下，没有dist会自动生成
}

function imagemini () {
    return src('src/assets/*')
        .pipe(imagemin()) // 调用插件imagemin
        .pipe(dest('dist/static/image')) // 压缩后的图片输出目录
}


function image64 () {
    return src('src/assets/*.png')
        .pipe(base64({
            maxImageSize: 8 * 1024,               // 只转8kb以下的图片为base64
        }))
        .pipe(dest('dist/static/image64'))
}

function filter () {
    var ft = filter(['**', '!*/index.js']);
    return src('/src/*.js')
        .pipe(ft)                        // 过滤掉index.js这个文件
        .pipe(dest('dist/filter/js'));
}

const minpTask = cb => {
    src('/src/public/index.html')
        .pipe(htmlmini())
        .pipe(dest('dist'))
    cb();
}


//gulp.src('./sass/**/*.scss')
//    .pipe(sass({
//        outputStyle: 'compressed'           // 配置输出方式,默认为nested
//    }))
//    .pipe(gulp.dest('./dist/css'));

//gulp.watch('./sass/**/*.scss', ['sass']);   // 实时监听sass文件变动,执行sass任务

exports.copyHtml = copyHtml
exports.imagemini = imagemini
exports.image64 = image64
