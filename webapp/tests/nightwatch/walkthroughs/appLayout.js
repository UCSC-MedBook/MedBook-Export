// add tests to this file using the Nightwatch.js API
// http://nightwatchjs.org/api

module.exports = {
  "Layout & Static Pages" : function (client) {

    // throw "what happens if I throw?";

    client
      .url("http://localhost:3000/Export")
      .resizeWindow(1024, 768)
      .verify.elementPresent("body")
      .verify.containsText("body > div > h1", "Export")
      .signIn("wcdt@ucsc.edu", "wcdtucscedu")
      .waitForElementVisible('#export-copy-number', 1000)
      .click('#export-copy-number')
      .waitForElementVisible('.list-group .list-group-item-info', 1000)
      // .waitForElementVisible('.list-group-item .list-group-item-success', 15000)
      //   .verify.elementPresent('.glyphicon-download-alt')
      //   .verify.elementPresent('.delete-file')

      .end();

    // client.execute(function (shouldBeAsdf) {
    //   console.log("shouldBeAsdf:", shouldBeAsdf);
    // }, ["asdf"], function (outcome) {
    //   console.log("outcome:", outcome);
    // })
    // .resizeWindow(500, 500)


  }
};
