var Model = require('src/common/model');

module.exports = Model.extend({
  urlRoot: '/api/books',

  isActive: function() {
    return this.collection.active === this;
  }
});
