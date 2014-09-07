var express = require('express');
var _ = require('underscore');
var api = module.exports = express();

// Use this to test delayed server responses
//
// api.use(function(req, res, next) {
//   setTimeout(next, 1000);
// });

// Use this to test server errors
// Append `?error=true` to the url
//
api.use(function(req, res, next) {
  console.log(req.query.error);
  req.query.error ? res.send(500) : next();
});

require('./api/books')(api);
require('./api/colors')(api);
