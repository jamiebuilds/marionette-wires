var Controller = require('../../classes/controller');
var CollectionView = require('./collection-view');

module.exports = Controller.extend({
  initialize: function(options) {
    this.container = options.container;
    this.collection = options.collection;

    var view = new CollectionView({
      collection: this.collection
    });

    this.container.show(view);
  }
});
