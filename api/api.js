var express = require('express');
var bodyParser = require('body-parser');
var api = module.exports = express();

api.use(bodyParser.json());

require('./books/routes')(api);
require('./colors/routes')(api);

module.exports = api;
