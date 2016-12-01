/*
regexs = "^(?:\
  (?:[a-zA-Z_\$])+(?:[a-zA-Z_0-9\$])*)?(?:(?:.(?:[a-zA-Z_\$])+(?:[a-zA-Z_0-9\$])*)*)$";

regex = new RegExp(regexs);
*/
function dotest(regex) {
  var results = {};
  results["success"] = regex.test("success");
  results["success."] = regex.test("success.");
  results["success.true"] = regex.test("success.true");
  results["3success.true"] = regex.test("3success.true");
  results["$success.true"] = regex.test("$success.true");
  return results;
}

function printtest(results) {
  for (test in results) {
    console.log(test, "was", results[test]);
  }
}

regex = /^(?:(?:[a-zA-Z_\$])+(?:[a-zA-Z_0-9\$])*)?(?:(?:.(?:[a-zA-Z_\$])+(?:[a-zA-Z_0-9\$])*)*)$/g;
printtest(dotest(regex));

constdregex = new RegExp(
  [
    "^(?:(?:[a-zA-Z_\$])+(?:[a-zA-Z_0-9\$])*)?(?:(?:.(?:[a-zA-Z_\$])+(?:[a-zA-Z_0-9\$])*)*)$"
  ].join('')
);
printtest(dotest(constdregex));
