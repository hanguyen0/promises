/**
 * Create the promise returning `Async` suffixed versions of the functions below,
 * Promisify them if you can, otherwise roll your own promise returning function
 */

var fs = require('fs');
var request = require('request');
var crypto = require('crypto');
var Promise = require('bluebird');

// (1) Asyncronous HTTP request
var getGitHubProfile = function (user) {
  var options = {
    url: 'https://api.github.com/users/' + user,
    headers: { 'User-Agent': 'request' },
    json: true  // will JSON.parse(body) for us
  };
  return new Promise((resolve, reject) => {
    request.get(options, function (err, res, body) {
      if (err) {
        reject(err);
      }
      // else if (body.message) {
      //   reject('Failed to get GitHub profile');
      // }
      else {
        resolve(body);
      }
    });
  });

};
// Promise.promisifyAll(request, {suffix: String="Async",multiArgs: true});
var getGitHubProfileAsync = getGitHubProfile;
//Promise.promisify(getGitHubProfile, {multiArgs: true})


// (2) Asyncronous token generation
var generateRandomToken = function (callback) {
  crypto.randomBytes(20, function (err, buffer) {
    if (err) { return callback(err, null); }
    callback(null, buffer.toString('hex'));
  });
};

var generateRandomTokenAsync = Promise.promisify(generateRandomToken); // TODO


// (3) Asyncronous file manipulation
var readFileAndMakeItFunny = function (filePath, callback) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', function (err, file) {
      if (err) { return reject(err); }
  
      var funnyFile = file.split('\n')
        .map(function (line) {
          return line + ' lol';
        })
        .join('\n');
  
      resolve(funnyFile);
    });
  }); 
  
};

var readFileAndMakeItFunnyAsync = readFileAndMakeItFunny; // TODO

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getGitHubProfileAsync: getGitHubProfileAsync,
  generateRandomTokenAsync: generateRandomTokenAsync,
  readFileAndMakeItFunnyAsync: readFileAndMakeItFunnyAsync
};
