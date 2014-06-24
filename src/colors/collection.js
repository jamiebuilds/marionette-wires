var Backbone = require('backbone');
var Model = require('./model');

module.exports = Backbone.Collection.extend({
  url: '/api/v1/colors',
  model: Model
});
