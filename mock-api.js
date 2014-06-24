var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var app = express();

app.use(bodyParser.json());

var COLORS = [
  { id: _.uniqueId(), name: 'blue',  hex: '#00f' },
  { id: _.uniqueId(), name: 'red',   hex: '#f00' },
  { id: _.uniqueId(), name: 'green', hex: '#0f0' }
];

app.route('/api/v1/colors')
  .get(function(req, res) {
    res.json(COLORS);
  })
  .post(function(req, res) {
    var color = req.body;
    color.id = _.uniqueId();
    COLORS.push(color);
    res.json(color);
  });

app.route('/api/v1/colors/:id')
  .get(function(req, res) {
    var color = _.findWhere(COLORS, { id: req.params.id });
    res.json(color);
  })
  .put(function(req, res) {
    COLORS = _.map(COLORS, function(color) {
      if (color.id === req.params.id) {
        _.extend(color, req.body);
      }
      return color;
    });
    res.send(200);
  })
  .delete(function(req, res) {
    COLORS = _.reject(COLORS, function(color) {
      return color.id === req.params.id;
    });
    res.send(200);
  });

module.exports = app;
