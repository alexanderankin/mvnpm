#!/usr/bin/env node

var subcommand = require('subcommand');
var commands = require('./lib/commands');

var config = {
  root: {
    command: function() { console.log("Usage: need subcommand"); console.log(arguments[0])}
  },
  defaults: undefined,
  all: undefined/*function() { console.log("i run always"); }*/,
  none: function() { console.log("Usage: your subcommand is weird"); console.log(arguments[0])},
  commands: commands
};

var match = subcommand(config);

var matched = match(process.argv.slice(2));
// if (matched) console.log("matched"); else console.log("no");
