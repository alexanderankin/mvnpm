var MavenArtifact = function MavenArtifact(groupId, artifactId, version) {
  if (arguments.length == 1) {
    if (typeof groupId == 'string') {
      var els = groupId.split(":");
      if (els.length == 5)
        throw new RangeError("Unsupported Artifact String Format groupId:artifactId:version[:packaging][:classifier]");
      else if (els.length != 3)
        throw new RangeError("Bad Artifact String Format, expected groupId:artifactId:version");
      
      var props = groupId.split(":");
      groupId = props[0];
      artifactId = props[1];
      version = props[2];
    } else
      throw new TypeError("Artifact String not typeof 'string'");
  }

  else if (arguments.length != 3)
    throw new RangeError("Expected MavenArtifact Artifact String or group, artifact, version");

  else if (typeof groupId != 'string'
    || typeof artifactId != 'string'
    || typeof version != 'string') {
    throw new RangeError("Expected MavenArtifact groupId, artifactId, version to be 'string'");
  }

  this.groupId = groupId;
  this.artifactId = artifactId;
  this.version = version;
}

MavenArtifact.prototype.equals = function(other) {
  return (
    this.groupId == other.groupId &&
    this.artifactId == other.artifactId &&
    this.version == other.version
  );
};

// module.exports = {
//   MavenArtifact: MavenArtifact
// };
module.exports = MavenArtifact;
