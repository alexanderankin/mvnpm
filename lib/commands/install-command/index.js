var async = require('async');

var existingPomReader = require('../../existing-pom-reader');
var pomExists = existingPomReader.pomExists;
var versionGood = require('../../new-pom-writer').getInstalledMavenVer;
var install = require('../../run-install-command');
var addDeps = require('../../add-pom-dependency');
var Artifact = require('../../mavenArtifact');

function validateArtifactStrings(strings) {
  return strings.map(function (artString) {
    console.log(artString);
    return new Artifact(artString);
  });
}

function processNewArtifacts(strings, location, cb) {
  var artifacts = validateArtifactStrings(strings);
  // console.log(artifacts);

  async.eachSeries(artifacts, function (artifact, done) {
    addDeps(location, artifact, done);
  }, function doneAddingDeps(err) {
    if (err) return cb(err);
    cb(null);
  });
}


/**
 * Install subcommand function
 * 
 * Execution steps:
 * if none specified
 *   make sure there is a pom, version is good, and install
 * else
 *   validate them, call as if none specified
 * 
 * 
 */
// "mvn -f mvnpm.pom org.apache.maven.plugins:maven-dependency-plugin:2.10:copy-dependencies -DoutputDirectory=OUTPUT_DIR"
// mvn -f mvnpm.pom org.apache.maven.plugins:maven-dependency-plugin:2.10:copy-dependencies

function installEntry(args) {
  pomExists(function (err, exists, location) {
    // console.log(args);
    if (args._.length > 0) {
      return processNewArtifacts(args._, location, function (err) {
        if (err) throw err;

        args._.length = 0;
        return installEntry(args);
      });
    }
    
    if (err) throw err;
    if (!exists)
      throw new Error("No mvnpm project information file.");

    versionGood(function (err, version) {
      var outfolder = './mvnpm_artifacts';
      if (args.o && typeof args.o == 'string')
        outfolder = args.o;
      if (args['output-folder'] && typeof args['output-folder'] == 'string')
        outfolder = args['output-folder'];

      install(location, outfolder, function (err, outlines) {
        if (err) throw err;

        outlines = outlines.split('\n');
        outlines.map((line) => console.log(line));
      });
    });
  });
}

var installAliases = [
  { name: 'install',
    command: installEntry },
  { name: 'i',
    command: installEntry }
];

module.exports = installAliases;