#!/usr/bin/env node

var program = require('commander');
var fs = require('fs');
var path = require('path');
var luamin = require('luamin');

var pack = require('../index.js')

program
  .option('-i, --input <file>', 'File to pack')
  .option('-o, --output <name>', 'Output file name')
  .option('-m, --minify', "Minify packed output")
  .parse(process.argv)

if (!program.input) {
  program.help();
  process.exit(1);
}

program.output = program.output || ( path.basename(program.input, '.lua') + '_packed.lua' )

var packedContent = pack(program.input)

if (program.minify) {
  packedContent = luamin.minify(packedContent);
}

fs.writeFile(program.output, packedContent, function(err) {
  if (err) throw err;

  console.log('Packed file to ' + program.output)
})