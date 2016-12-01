Command Usage
=============

* init
* install <arg>
* install

* (aliases)


* version
* faq (opens man page)
* help


Useful Links
============

http://stackoverflow.com/questions/13989033/how-to-download-the-latest-artifact-from-artifactory-repository
https://docs.npmjs.com/files/package.json
http://junit.org/junit4/dependency-info.html
http://maven.apache.org/plugins/maven-dependency-plugin/examples/copying-project-dependencies.html
http://maven.apache.org/plugins/maven-dependency-plugin/copy-dependencies-mojo.html
https://docs.oracle.com/middleware/1212/core/MAVEN/maven_version.htm#MAVEN8855

```
mvn org.apache.maven.plugins:maven-dependency-plugin:2.10:copy-dependencies \
  -DoutputDirectory=OUTPUT_DIR
mvn org.apache.maven.plugins:maven-dependency-plugin:2.8:get \
  -Dartifact=org.hibernate:hibernate-entitymanager:3.4.0.GA:jar:sources

```
