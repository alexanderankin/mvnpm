var exec = require('child_process').exec;

function execute(command, callback) {
  exec(command, function(error, stdout, stderr){
    if (error) return callback({
      error: error,
      stderr: stderr
    });
    callback(error, stdout);
  });
};

/**
 * takes args object
 * * args.pomFile      string
 * * args.outDirectory string
 * * args.
 * 
 */
function installCommand(args) {
  var installCommand = [
    "mvn",
    " -f " + args.pomFile,
    " org.apache.maven.plugins:",
      "maven-dependency-plugin:2.10:copy-dependencies",
    " -DoutputDirectory=" + args.outDirectory
  ].join('');

  console.log(installCommand);
  return installCommand;
}

function runInstall(pomFile, outputFolder, done) {
  if (arguments.length < 2) {
    done = pomFile;
    outputFolder = "./mvnpm_artifacts";
    pomFile = "./mvnpm.pom";
  }

  var cmd = installCommand({
    outDirectory: outputFolder,
    pomFile: pomFile
  });

  execute(cmd, function (err, stdoutString) {
    if (err) return done(err.error);
    var success = (stdoutString ? stdoutString : '')
      .split('\n')
      .filter((el) => el.indexOf('BUILD SUCCESS') > -1)
      .length > 0;

    if (!success) return done(err.error);
    // require('repl').start().context.e = err;
    // console.log(stdoutString.split('\n'));
    done(null, stdoutString);
  });
}

// runInstall(function (err) {
//   console.log("runInstall return " + (err ? "with error.": ""));
// });

module.exports = runInstall;
