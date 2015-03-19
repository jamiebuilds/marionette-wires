var api = require('./api/api');
var express = require('express');
var path = require('path');
var morgan = require('morgan');

var argv = require('yargs')
            .usage('Start the server')
            .default('port', process.env.WEB_PORT || 1337)
            .alias('port', 'p')
            .describe('port', 'port to run on')
            .argv;

var app = express();
app.use(express.static(path.join(__dirname, "/dist")));
app.use(api);

console.log("Now listening on port " + argv.port);
console.log("Connect to http://0.0.0.0:" + argv.port);
app.listen(argv.port);