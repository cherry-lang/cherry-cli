#!/usr/bin/env node

var program = require('commander');

program
    .command('compile <file>', 'compiles a Cherry source file to Javascript')
    .parse(process.argv);
