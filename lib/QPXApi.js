'use strict';

var request = require('request')
  , Promise = require('bluebird');

function QPXApi(options) {
  if (!options.api_key) {
    throw new Error('No api_key specified');
  }

  this.options = options;
  this.options.url = 'https://www.googleapis.com/';
}


QPXApi.prototype.search = function (data, callback) {
  var url = this.options.url + 'qpxExpress/v1/trips/search?key=' + this.options.api_key;

  if (typeof callback === 'function') {
    this.sendRequest(url, data, callback);
  }
  else {
    return new Promise(function (resolve, reject) {
      this.sendRequest(url, data, function (err, jsonResponse) {
        if (err) {
          return reject(err);
        }
        resolve(jsonResponse);
      });
    }.bind(this));
  }
};


QPXApi.prototype.sendRequest = function (url, data, callback) {
  var requestOptions = {
    uri: url,
    json: true,
    timeout: this.options.timeout || 2000,
    body: { request: data }
  };

  request.post(requestOptions, function (err, res, body) {
    if(err) {
      return callback(err);
    }
    if (body.error) {
      return callback(new Error(body.error.message || String(body.error)));
    }
    callback(null, body);
  });
};


module.exports = QPXApi;
