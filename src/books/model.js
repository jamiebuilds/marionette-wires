var Model = require('../common/model');

module.exports = Model.extend({
  urlRoot: '/api/v1/books',

  isActive: function() {
    return this.collection.active === this;
  }
});
