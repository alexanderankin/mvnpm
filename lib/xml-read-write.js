var fs = require('fs');
var xml2js = require('xml2js');

function build(obj) {
  return builder.buildObject(obj);
}

function parse(string, done) {
  return parser.parseString(string, done);
}

/**
 * Takes filename string and callback(err, obj)
 */
var parser = new xml2js.Parser();
function readAndParse(filename, callback) {
  fs.readFile(filename, function(err, data) {
    if (err) return callback(err);

    parser.parseString(data, callback);
  });
}

/**
 * Takes filename string, object xmlobj, and callback(err)
 */
var builder = new xml2js.Builder();
function buildAndSave(filename, object, callback) {
  var xml = builder.buildObject(object);
  fs.writeFile(filename, xml, callback);
}

module.exports = {
  build: build,
  parse: parse,
  readAndParse: readAndParse,
  buildAndSave: buildAndSave
};
