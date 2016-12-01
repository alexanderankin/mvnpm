var commands = [];

var install  = require('./install-command');
var init     = require('./init-command');

install.map((alias) => commands.push(alias));
init   .map((alias) => commands.push(alias));

module.exports = commands;
