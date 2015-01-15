var Model = require('../common/model');

module.exports = Model.extend({
  urlRoot: '/api/books',

  isActive: function() {
    return this.collection.active === this;
  }
});
