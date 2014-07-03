var Collection = require('../classes/collection');
var Model = require('./model');

module.exports = Collection.extend({
  url: '/api/v1/colors',
  model: Model
});
