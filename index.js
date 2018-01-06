#!/usr/bin/env node

var program = require('commander')
var fs = require('fs')
var path = require('path')
var luamin = require('luamin')
var moment = require('moment')

program
	.arguments('<input> <output>')
	.option('-w, --watch', "Watch for file changes")
	.option('-m, --minify', "Minify packed output")
	.parse(process.argv)

//console.log(program.args, process.cwd())

var packRegex = /--\s*spack="([^"]+)"/g

if ( program.args.length < 1 ) {
	console.log('No input file')
	process.exit()
}

var inputFile = program.args[0]
var outputFile = program.args[1] || 'packed-' + inputFile

function getPath(file, cwd) {
	cwd = cwd ? path.parse(cwd).dir : process.cwd()

	//console.log(cwd)

	var hasExt = !(path.extname(file) === '')
	return path.format({
		dir: cwd,
		name: file,
		ext: hasExt ? null : '.lua'
	})
}

function replacePack(dir, match, file) {
	//console.log(dir, match, file)
	var p = getPath(file, dir)
	console.log('\tAdding file ' + p)
	var fileContent = fs.readFileSync(p, 'utf8')
	return fileContent.replace(packRegex, (match, file) => replacePack(p, match, file))
}

function packFile(file) {
	
	var p = getPath(file)
	console.log('loading file ' + p)

	var fileContent = fs.readFileSync(p, 'utf8')
	var newContent = fileContent.replace(packRegex, (match, file) => replacePack(p, match, file))

	return newContent
}

function pack() {
	var packedContent = packFile(inputFile)
	if (program.minify) {
		packedContent = luamin.minify(packedContent);
	}

	var madeby = `

--//

-- made by Suzuya_Lychnus (483095296)

-- updated on ${moment().format('L LTS')}

--\\\\

`


	packedContent = madeby + packedContent + madeby

	fs.writeFile(outputFile, packedContent, function (err) {
		if (err) throw err;

		console.log('Packed file to ' + outputFile)
	})
}

pack()

if (program.watch) {
	fs.watchFile(inputFile, { interval: 100 }, () => pack())
}