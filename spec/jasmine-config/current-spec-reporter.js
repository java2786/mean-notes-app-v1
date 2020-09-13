let fs = require('fs');
let xmlBuilder = require("xmlBuilder");


class CurrentSpecReporter {

  constructor() {
    this.xml = xmlBuilder.create('test-cases');

    this.outputFiles = {
      business: "./output_revised.txt",
      boundary: "./output_boundary_revised.txt",
      exception: "./output_exception_revised.txt",
      xml: "./yaksha-test-cases.xml"
  };

  for (let key in this.outputFiles) {
      if (fs.existsSync(this.outputFiles[key])) {
        fs.unlink(this.outputFiles[key], (err) => { if (err) console.log(`${this.outputFiles[key]} not deleted`); });
      }
    }

}


  specStarted(spec) {
    // global.currentSpec = spec;

  }

  specDone(result) {
//     global.currentSpec = null;
//     console.log('Spec started: ' + result.description + ' whose full description is: ' + result.fullName);
// console.log(result);
// console.log("++++++++++++++++++++");

      writeTextFiles(result, this.outputFiles, function (file, data) {
        fs.appendFileSync(file, data);
      });

            prepareXmlFile(this.xml, result);


  }





  suiteDone(results) {
    let createXMLFile = true;

    if(createXMLFile){
      fs.writeFileSync(this.outputFiles.xml, this.xml.toString({ pretty: true }));
    }

  }

}

const writeTextFiles = function (result, outputFiles, cb) {

let testName = result.fullName.trim();
let fileName = testName.split(" ")[1];

let testNameToCamelCase = camelCase(testName);

let fileOutput = `${testNameToCamelCase}=${result.status === 'passed'}`;


if (!!outputFiles[fileName])
  cb(outputFiles[fileName], `${fileOutput}\n`);

}

const capitalize = function (str) {
return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
}

const camelCase = function (str) {
var words = str.split(" ").map(word => {
  return capitalize(word);
});

return words.join('').charAt(0).toLowerCase() + words.join('').substring(1);
}

const prepareXmlFile = function (xml, result) {
var testCaseType = result.fullName.trim().split(" ")[1];

xml.ele('cases', {"xmlns:java": "http://java.sun.com", "xmlns:xsi":"http://www.w3.org/2001/XMLSchema-instance", "xsi:type":"java:com.assessment.data.TestCase"})
  .ele('test-case-type', capitalize(testCaseType == 'business' ? "functional" : testCaseType == 'exception' ? "exception" : "boundary")).up()
  .ele('expected-ouput', true).up()
  .ele('name', camelCase(result.fullName.trim())).up()
  .ele('weight', 2).up()
  .ele('mandatory', true).up()
  .ele('desc', "na")
  .end();
}

module.exports = CurrentSpecReporter;