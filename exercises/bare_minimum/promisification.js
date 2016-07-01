/**
 * Create the promise returning `Async` suffixed versions of the functions below,
 * Promisify them if you can, otherwise roll your own promise returning function
 */ 

var fs = require('fs');
var request = require('request');
var crypto = require('crypto');
var Promise = require('bluebird');

// (1) Asyncronous HTTP request
var getGitHubProfileAsync = function(user, callback) {
  var options = {
    url: 'https://api.github.com/users/' + user,
    headers: { 'User-Agent': 'request' },
    json: true  // will JSON.parse(body) for us
  };

  return new Promise(function(resolve, reject) {
    request.get(options, function(err, res, body) {
      if (err) {
        reject(err);
      } else if (body.message) {
        reject(new Error('Failed to get GitHub profile: ' + body.message), null);
      } else {
        console.log('body is', body);
        resolve(body);
      }
    });
  })
};

getGitHubProfileAsync().then(function(body) {
  return body.id;
}).catch(function(err) {
  console.log('Unable to get user\'s id');
})
// .then(function()); // TODO


// (2) Asyncronous token generation
var generateRandomTokenAsync = function(callback) {
  return new Promise(function(resolve, reject) {
    crypto.randomBytes(20, function(err, buffer) {
      if (err) { 
        reject(err); 
      } else {
        console.log('BUFFER', buffer.toString('hex'));
        resolve(buffer.toString('hex'));
      }  
    });
  });
};

generateRandomTokenAsync().then(function(token) {
  return token;
}).catch(function(error) {
  console.log('unable to get token: ' + error);
}) // TODO


// (3) Asyncronous file manipulation
var readFileAndMakeItFunnyAsync = function(filePath, callback) {
  return new Promise(function(resolve, reject) {
    fs.readFile(filePath, function(err, file) {
        if (err) { 
          reject(err); 
        } else {
         file = file.toString();
         var funnyFile = file.split('\n')
           .map(function(line) {
             return line + ' lol';
           })
           .join('\n');
         resolve(funnyFile);
        }
    });
  });
};

readFileAndMakeItFunnyAsync().then(function(funnyFile) {
  return funnyFile;
}).catch(function(error) {
  console.log('error: ', error);
}); // TODO

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getGitHubProfileAsync: getGitHubProfileAsync,
  generateRandomTokenAsync: generateRandomTokenAsync,
  readFileAndMakeItFunnyAsync: readFileAndMakeItFunnyAsync
};
