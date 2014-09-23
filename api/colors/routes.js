var Backbone = require('backbone');
var fixture = require('./fixture');
var collection = new Backbone.Collection(fixture);

module.exports = function(api) {
  api.route('/api/colors')
    .get(function(req, res) {
      res.json(collection);
    })
    .post(function(req, res) {
      var model = new Backbone.Model(req.body);
      collection.add(model);
      res.json(collection);
    });

  api.route('/api/colors/:id')
    .get(function(req, res) {
      var model = collection.get(req.params.id);
      res.json(model);
    })
    .put(function(req, res) {
      var model = collection.get(req.params.id);
      model.set(req.body);
      res.json(model);
    })
    .delete(function(req, res) {
      var model = collection.get(req.params.id);
      collection.remove(model);
      res.json(collection);
    });
};
