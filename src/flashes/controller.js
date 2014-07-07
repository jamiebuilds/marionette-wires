var Controller = require('../classes/controller');
var Radio = require('../classes/radio');
var Collection = require('./collection');
var CollectionView = require('./collection-view');

var flashesChannel = Radio.channel('flashes');

module.exports = Controller.extend({
  initialize: function(options) {
    this.container = options.container;

    this.collection = new Collection();

    this.view = new CollectionView({
      collection: this.collection
    });

    this.container.show(this.view);

    this.listenTo(flashesChannel.vent, 'add', this.add);
    this.listenTo(flashesChannel.vent, 'remove', this.remove);
  },

  add: function(flash) {
    this.collection.add(flash);
  },

  remove: function(flash) {
    var model = this.collection.findWhere(flash);
    if (model) model.destroy();
  }
});
