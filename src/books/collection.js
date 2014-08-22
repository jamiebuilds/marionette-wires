var Collection = require('../common/collection');
var Model = require('./model');

module.exports = Collection.extend({
  url: '/api/v1/books',
  model: Model
});
