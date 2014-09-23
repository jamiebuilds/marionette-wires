var Backbone = require('backbone');
var fixture = require('./fixture');
var collection = new Backbone.Collection(fixture);

module.exports = function(api) {
  api.route('/api/books')
    .get(function(req, res) {
      res.json(collection);
    });

  api.route('/api/books/:id')
    .get(function(req, res) {
      var model = collection.get(req.params.id);
      res.json(model);
    });
};
