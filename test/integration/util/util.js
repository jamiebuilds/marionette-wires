/* global -Promise */
var Promise = require('bluebird');
var request = Promise.promisify(require('request'));
var baseUrl = 'http://0.0.0.0:9000/';

module.exports = function() {
  this.visit = function(path) {
    return this.driver.get(baseUrl+path);
  };

  this.BeforeAll(function() {
    return request(baseUrl+'api/v1/colors/reset');
  });
};
