/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');



var fetchProfileAndWriteToFile = function (readFilePath, writeFilePath) {
  // TODO
  let readFile = (readFilePath) => {
    return new Promise((resolve, reject) => {
      fs.readFile(readFilePath, (err, data) => {
        if (err) {
          reject(err);
        } else {
          let username = data.toString.split(/\r?\n/)
          resolve(username[0]);
        }
      });
    });
  }

  let writeFile = (writeFilePath) => {
    return new Promise((resolve, reject) => {
      fs.writeFile(writeFilePath, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data.toString())
        }
      });
    });
  }

  let errorHandler = (err) => {
    if(err) {
      throw new Error(err);
    }
  }
    // readFile(readFilePath)
    // .then(writeFile)
    // .catch(errorHandler);
  // }

};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
