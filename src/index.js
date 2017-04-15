
var fs = require('fs'),
    path = require('path');

var packRegex = /--\s*spack="([^"]+)"/g

function getPath(file) {
  var hasExt = !( path.extname(file) === '' )
  return path.format({
    dir: process.cwd(),
    name: file,
    ext: hasExt ? null : '.lua'
  })
}

function packFile(file) {
  console.log('loading file ' + file)
  var fileContent = fs.readFileSync(getPath(file), 'utf8')
  var newContent = fileContent.replace(packRegex, replacePack)

  return newContent
}

function replacePack(match, file ) {
  var path = getPath(file)
  var fileContent = fs.readFileSync(path, 'utf8')
  return fileContent.replace(packRegex, replacePack)
}

module.exports = packFile