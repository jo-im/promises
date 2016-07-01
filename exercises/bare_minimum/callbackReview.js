/**
 * Implement these functions following the node style callback pattern
 */
var Promise = require('bluebird');
var fs = require('fs');
var request = require('request');
var http = require('http');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFile = function (filePath, callback) {
  // TODO
  console.log('filePath is', filePath);
  fs.readFile(filePath, function(err, data) {
    if (err) {
      callback(err);
    } else {
      console.log('data is', data);
      var stringedData = '';
      stringedData += data;
    }
    var stringedData = stringedData.split('\n');
    console.log('stringedData is', stringedData);
    callback(err, stringedData[0]);
  });
};

// This function should retrieve the status code of a GET request to `url`
var getStatusCode = function (filePath, callback) {
  // TODO
  request.get(filePath, function(error, response, body) {
    if (error) {
      callback(error);
    } else {
      callback(error, response.statusCode);
    }
  });
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCode: getStatusCode,
  pluckFirstLineFromFile: pluckFirstLineFromFile
};
