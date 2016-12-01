function installEntry (args) {
  // called when `install` is matched 
  console.log("in function install")
  /*console.log(args)*/
  
  if (args._.length == 0) {
    console.log("Need to Parse existing file and install all deps");
  } else {
    args._.map(function processMvnPackageStrings(el) {
      console.log("looking for", el);
    });
    if (args.s || args.save) console.log("need to write things to file");
  }
}

var installAliases = [
  { name: 'install',
    command: installEntry },
  { name: 'i',
    command: installEntry }
];

module.exports = installAliases;
