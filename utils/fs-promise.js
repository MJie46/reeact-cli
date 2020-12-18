const fs = require("fs");
const promisify = require("./promisify");
const mkdirp = require("mkdirp");

exports.writeFile = promisify(fs.writeFile);
exports.readdir = promisify(fs.readdir);
exports.copyFile = promisify(fs.copyFile);
exports.mkdirp = promisify(mkdirp);
exports.stat = promisify(fs.stat);
