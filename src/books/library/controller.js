var Controller = require('../../classes/controller');
var CollectionView = require('./collection-view');

module.exports = Controller.extend({
  channelName: 'books',

  initialize: function(options) {
    this.collection = options.collection;

    var view = new CollectionView({
      collection: this.collection
    });

    this.container.show(view);
  }
});
