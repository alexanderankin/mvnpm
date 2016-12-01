var x = require('./xml-read-write');
var Artifact = require('./mavenArtifact');

/**
 * Takes an optional string filname and done(err, mavenArtifact[])
 */
function getDependencies(filename, done) {
  if (!done) { done = filename; filename = './mvnpm.pom'; }

  x.readAndParse(filename, function (err, obj) {
    if (err) return done(err);

    var deps = (obj.project.dependencies
             && obj.project.dependencies[0].dependency) || [];
    deps = deps.map((dependency) => {
      return new Artifact(dependency.groupId[0],
        dependency.artifactId[0],
        dependency.version[0]);
    });

    done(null, deps);
  });
}

// getDependencies(function (err, obj) {
//   console.log(err);
//   console.log(JSON.stringify(obj, null, 2));
//   // console.log(obj);
// });

/**
 * done(err, booleanExists, directoryOfPom)
 */
var fs = require('fs'); 
var path = require('path');
function pomExists(done) {
  var location = path.join(process.cwd(), './mvnpm.pom');
  fs.stat(location, function(err, stat) {
    if(err == null)
      done(null, true, location);
    else if(err.code == 'ENOENT')
      done(null, false, location);
    else
      done(err);
  });
}

// pomExists(function (err, exists) {
//   console.log("it does " + (exists ? "" : "not ") + "exist.");
// });


module.exports = {
  getDependencies: getDependencies,
  pomExists: pomExists
  // getPomObject: getPomObject
};
