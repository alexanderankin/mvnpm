/**
 * Dot Separated Identifiers
 * 
 * source: somewhere on StackOverflow
 */
var dotSeparatedIdrs = /^(?:(?:[a-zA-Z_\$])+(?:[a-zA-Z_0-9\$])*)?(?:(?:.(?:[a-zA-Z_\$])+(?:[a-zA-Z_0-9\$])*)*)$/g;

/**
 * Java Keywords
 * 
 * These cannot appear in valid Identifiers
 * https://docs.oracle.com/javase/specs/jls/se8/html/jls-3.html#jls-3.8
 * 
 */
var keywords = [ "abstract", "continue", "for", "new", "switch", "assert",
  "default", "if", "package", "synchronized", "boolean", "do", "goto", "private",
  "this", "break", "double", "implements", "protected", "throw", "byte",
  "else", "import", "public", "throws", "case", "enum", "instanceof",
  "return", "transient", "catch", "extends", "int", "short", "try", "char", 
  "final", "interface", "static", "void", "class", "finally", "long",
  "strictfp", "volatile", "const", "float", "native", "super", "while" ];

/**
 * Java Literals
 * 
 * These cannot appear in valid Identifiers
 */
var literals = [ "true", "false", "null" ];

/**
 * Tells if a string is a valid java package name
 * 
 * NEEDS TESTING (or does it)
 *   .. more like ...
 * Good Candidate for self-documenting tests.
 */
function valid(string) {
  var argumentPresent = string.length > 0;  // redundant
  if (!argumentPresent) return "Empty Java package not supported.";

  var packageNameValidChars = dotSeparatedIdrs.test(string);
  if (!packageNameValidChars) return "Please enter a valid Java package.";

  var packages = string.split(".");
  var l = packages.length;
  var msg = "Packages cannot contain ";
  for (var i = 0; i < l; i++) {
    if (keywords.indexOf(packages[i]) > -1) return msg + "Java keywords.";
    if (literals.indexOf(packages[i]) > -1) return msg + "Java literals.";
  }

  return true;
}

/**
https://regex101.com/r/aVNxpO/1
*/
module.exports = valid;
