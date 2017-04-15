#!/usr/bin/env node

var program = require('commander');
var fs = require('fs');
var path = require('path');
var luamin = require('luamin');
var moment = require('moment')

var pack = require('../index.js')

program
  .option('-i, --input <file>', 'File to pack')
  .option('-o, --output <name>', 'Output file name')
  .option('-w, --watch <interval>', "Watch for file changes")
  .option('-m, --minify', "Minify packed output")
  .parse(process.argv)

if (!program.input) {
  program.help();
  process.exit(1);
}

if (!program.watch) {

  program.output = program.output || ( path.basename(program.input, '.lua') + '_packed.lua' )

  var packedContent = pack(program.input)

  if (program.minify) {
    packedContent = luamin.minify(packedContent);
  }

  fs.writeFile(program.output, packedContent, function(err) {
    if (err) throw err;

    console.log('Packed file to ' + program.output)
  })
} else {
  program.watch = typeof program.watch === "number" ? program.watch : 2000

  fs.watchFile(program.input, { interval: program.watch }, function() {
    program.output = program.output || ( path.basename(program.input, '.lua') + '_packed.lua' )

    var packedContent = pack(program.input)

    if (program.minify) {
      packedContent = luamin.minify(packedContent);
    }

    fs.writeFile(program.output, packedContent, function(err) {
      if (err) throw err;

      console.log('Packed file to ' + program.output + ' at ' + moment().format('HH:mm:ss'))
    })
  })
}