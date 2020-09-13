var jasmine = require('jasmine')
var Jasmine = new jasmine();

const CurrentSpecReporter = require('./current-spec-reporter.js');

// load config file
Jasmine.loadConfigFile("./spec/support/jasmine.json");


// add custom reporter
Jasmine.addReporter(new CurrentSpecReporter());

// execute
Jasmine.execute();



/* Run Script */
// node thisFileName.js
// node spec/jasmine-conig/jasmine-runner




