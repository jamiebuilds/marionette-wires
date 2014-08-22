var Route = require('src/common/route');

module.exports = Route.extend({
  initialize: function(options) {
    this.collection = options.collection;
  },

  fetch: function() {
    if (this.collection.isNew()) {
      return this.collection.fetch();
    }
  },

  onEnter: function() {
    var id = this.collection.last().get('id');
    this.navigate('books/' + id, { trigger: true });
  }
});
