#!/usr/bin/env node

var program = require('commander');
var fs = require('fs');

var pack = require('../index.js')

program
  .option('-i, --input <file>', 'File to pack')
  .option('-o, --output <name>', 'Output file name')
  .parse(process.argv)

if (!program.input) {
  program.help();
  process.exit(1);
}

program.ouput = program.output || 'packed_' + program.input

var packedContent = pack(program.input)

fs.writeFile(program.ouput, packedContent, function(err) {
  if (err) throw err;

  console.log('Packed file to ' + program.output)
})