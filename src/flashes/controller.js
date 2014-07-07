var Controller = require('../classes/controller');
var Radio = require('../classes/radio');
var Collection = require('./collection');
var CollectionView = require('./collection-view');

module.exports = Controller.extend({
  channelName: 'flashes',

  channelEvents: {
    'add'    : 'add',
    'remove' : 'remove'
  },

  initialize: function() {
    this.collection = new Collection();

    this.view = new CollectionView({
      collection: this.collection
    });

    this.container.show(this.view);
  },

  add: function(flash) {
    this.collection.add(flash);
  },

  remove: function(flash) {
    var model = this.collection.findWhere(flash);
    if (model) model.destroy();
  }
});
