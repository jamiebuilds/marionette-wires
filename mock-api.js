var express = require('express');
var Backbone = require('backbone');

var api = module.exports = express();

var Color = Backbone.Model.extend({
  defaults: function() {
    return { id: parseInt(this.cid.replace('c', ''), 10) };
  }
});

var Colors = Backbone.Collection.extend({
  model: Color
});

var colors = new Colors([
  { name: 'blue',  hex: '#00f' },
  { name: 'red',   hex: '#f00' },
  { name: 'green', hex: '#0f0' }
]);

api.route('/api/v1/colors')
  .get(function(req, res) {
    res.json(colors.toJSON());
  })
  .post(function(req, res) {
    var color = new Color(req.body);
    colors.add(color);
    res.json(color.toJSON());
  });

api.route('/api/v1/colors/:id')
  .get(function(req, res) {
    var color = colors.get(req.params.id);
    res.json(color.toJSON());
  })
  .put(function(req, res) {
    var color = colors.get(req.params.id);
    color.set(req.body);
    res.json(color.toJSON());
  })
  .delete(function(req, res) {
    var color = colors.get(req.params.id);
    colors.remove(color);
    res.json(color.toJSON());
  });
