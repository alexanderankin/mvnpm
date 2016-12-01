var pomExists = require('../../existing-pom-reader').pomExists;
var prompts = require('./promptUser');
var promptUser = prompts.gatherInfo;
var confirmNew = prompts.confirmNew;
var confirmXml = prompts.confirmXml;
var messages = require('../messages');
var newPomDry = require('../../new-pom-writer').createFreshMvnpmPom;
var newPom = require('../../new-pom-writer').createFreshMvnpmPomAndSave;
var getInstalledMavenVer = require('../../new-pom-writer').getInstalledMavenVer;

function pomExistsCallback(err, exists, location) {
  if (exists) return confirmNew(location, function (err, overwrite) {
    if (overwrite) return pomExistsCallback(null, false, location);

    // farewell, befuddled project holder.
  });

  console.log(messages.initGreeting);
  promptUser(function (err, results) {
    if (err) throw err;
    newPomDry(results, function (err, pomString) {
      if (err) throw err;
      console.log("About to write to " + process.cwd() + ":");

      console.log();
      console.log(pomString);
      console.log();

      confirmXml(function (err, confirmed) {
        if (err) throw err;

        if (confirmed)
          return newPom(results, location, function (e) {
            if (e) throw e;
          });
      });
    });
  });
}

/**
 * Init subcommand function
 */
function initEntry (args) {
  getInstalledMavenVer(function (err) {
    if (err) throw err;

    pomExists(pomExistsCallback);
  });
}

var initAliases = [
  { name: 'init',
    command: initEntry },
  { name: 'initialize',
    command: initEntry }
];

module.exports = initAliases;
