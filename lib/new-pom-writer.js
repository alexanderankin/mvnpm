var exec = require('child_process').exec;
var semver = require('semver');

var x = require('./xml-read-write');

function execute(command, callback) {
  exec(command, function(error, stdout, stderr){
    if (error) return callback(error);
    callback(error, stdout);
  });
};

/**
 * Gets Semantic Version of Maven (fails when absent)
 */
function getInstalledMavenVer(done) {
  execute('mvn -v', function (err, stdout) {
    if (err) return done(err);
    var versionHeader = stdout.split("\n").slice(0, 1)[0];
    var semVersion = versionHeader.split(" ").slice(-1)[0];
    
    if (!semver.valid(semVersion) || !semver.gt(semVersion, '2.0.0'))
      throw new RangeError("Your version of Maven ("
        + versionHeader
        + ") is not supported.");

    done(null, semVersion);
  });
}

// getInstalledMavenVer(function (err, version) {
//   if (err) console.log(err);
//   console.log(version);
// });

/**
 * At the time of writing, all viable versions (2, 3)
 * of maven support modelVersion = 4.0.0
 */
function getModelVersion(done) {
  getInstalledMavenVer(function (err, version) {
    if (err) return done(err);
    done(null, '4.0.0');
  });
}

function skeletonPomXmlObj(mV, gId, aId, v) {
  return {
    project: { 
      modelVersion: [ mV  ],
      groupId:      [ gId ],
      artifactId:   [ aId ],
      version:      [ v   ]
    }
  };
}

/**
 * This function takes obj with strings + cb(err)
 * * args.groupId
 * * args.artifactId
 * * arg.version
 * 
 */
function createFreshMvnpmPomAndSave(args, filename, done) {
  var name = process.cwd().split('/').slice(-1)[0];
  var groupId    = args.groupId    || name;
  var artifactId = args.artifactId || groupId;
  var version    = args.version    || "0.0.1";

  done = done || filename; if (typeof done != 'function')
    throw new TypeError("Need callback (createFreshMvnpmPomAndSave).");
  filename = (typeof filename == 'string') ? filename : 'mvnpm.pom';

  getModelVersion(function (err, model) {
    if (err) return done(err);

    var base = skeletonPomXmlObj(model, groupId,
      artifactId, version);

    return x.buildAndSave(filename, base, done);
  });
}

/**
 * This function takes obj with strings + cb(err)
 * * args.groupId
 * * args.artifactId
 * * arg.version
 * 
 */
function createFreshMvnpmPom(args, done) {
  var name = process.cwd().split('/').slice(-1)[0];
  var groupId    = args.groupId    || name;
  var artifactId = args.artifactId || groupId;
  var version    = args.version    || "0.0.1";

  getModelVersion(function (err, model) {
    if (err) return done(err);

    var base = skeletonPomXmlObj(model, groupId,
      artifactId, version);

    return done(null, x.build(base));
  });
}

// createFreshMvnpmPomAndSave({}, function (err, mvnpmPom) {
//   console.log(err)
//   console.log(mvnpmPom);
// });

module.exports = {
  createFreshMvnpmPom: createFreshMvnpmPom,
  createFreshMvnpmPomAndSave: createFreshMvnpmPomAndSave,
  getInstalledMavenVer: getInstalledMavenVer
};
