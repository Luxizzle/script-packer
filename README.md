# SCRIPT-PACKER

Script-packer is a handy lua utility to pack multiple lua files into one.

## Why?

Lets say you have a bunch of parts of one file, but keeping them all in one file gets messy after a while. This tool helps you seperate those parts into multiple files to keep things organized!

## Install

run `npm i -g Luxizzle/script-packer`

## How to use

Usage is fairly simple. To start just add a comment somewhere in your lua file like this `-- spack="some_file.lua"`. Script-packer will take care of finding the correct directory. Now if you pack the file, the contents of the other `some_file.lua` will added in the place of the comment that you made!

To pack the file, just run the command `spack -i main_file.lua`. This will store the result in `main_file_packed.lua` in your working directory.

`spack` has a couple more options like `--output` and `--minify`. You find out how to use them with running `spack --help`