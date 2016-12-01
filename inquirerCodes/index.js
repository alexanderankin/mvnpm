/**
 * Input prompt example
 */

var inquirer = require('inquirer');
var semver = require('semver');

var validJavaPackage = require('./valid');

var questions = [
  {
    type: 'input',
    name: 'groupId',
    message: 'groupId:',
    default: () => process.cwd().split("/").pop(),
    validate: validJavaPackage
  },
  {
    type: 'input',
    name: 'artifactId',
    message: 'artifactId',
    default: () => process.cwd().split("/").pop(),
    validate: function (value) {
      // var notalpha = /[^a-zA-Z0-9]/;
      var isalpha = /^[a-z0-9]+$/i;
      if (isalpha.test(value)) {
        return true;
      }
      
      return "Please enter an alphanumeric name";
    }
  },
  {
    type: 'input',
    name: 'version',
    message: 'version',
    default: '1.0.0',
    validate: function (value) {
      var pass = semver.valid(value);
      if (pass) {
        return true;
      }

      return 'Please enter a semver-parseable version';
    }
  }
];

function prompt(done) {
  var p = inquirer.prompt(questions)
  p.then(function (answers) {
    done(null, answers);
    // console.log(JSON.stringify(answers, null, '  '));
  });
  p.catch(function (err) {
    done(err);
  });
}

prompt(function (err, answers) {
  console.log(JSON.stringify(answers, null, '  '));
});

module.exports = prompt;
