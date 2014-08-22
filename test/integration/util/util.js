var p = require('bluebird');
var request = p.promisify(require('request'));
var baseUrl = 'http://localhost:9000/';

module.exports = function() {
  this.visit = function(path) {
    return this.driver.get(baseUrl+path);
  };

  this.BeforeAll(function() {
    return request(baseUrl+'api/v1/colors/reset');
  });
};