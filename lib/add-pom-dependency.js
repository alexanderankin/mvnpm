var x = require('./xml-read-write');
var Artifact = require('./mavenArtifact');

function addArtifactToPom(filename, mavenArtifact, done) {
  if (arguments.length == 2) {
    done = mavenArtifact;
    mavenArtifact = filename;
    filename = './mvnpm.pom';
  }

  if (!(mavenArtifact instanceof Artifact))
    throw new TypeError("Artifact given is not MavenArtifact");

  //read pom, push ma to array, write pom

  x.readAndParse(filename, function (err, obj) {
    if (err) return done(err);

    var deps = obj.project.dependencies ?
      obj.project.dependencies :
      obj.project.dependencies = [{
        dependency: []
      }];
    var push = deps[0].dependency.push.bind(deps[0].dependency);

    push(mavenArtifact);

    // console.log(x.build(obj));
    x.buildAndSave(filename, obj, done);
  });
}

// var sampleA = new Artifact("com.google.code.gson:gson:1.0.0");
// addArtifactToPom(sampleA, function (err) {
//   console.log((err ? "err" : "no err"))
// });

// function getDepCount(filename, done) {

// }

// function removeDeps(filename, done) {
  
// }

module.exports = addArtifactToPom;
// module.exports = {
//   addArtifactToPom: addArtifactToPom,
//   getDepCount: getDepCount,
//   removeDeps: removeDeps
// };
