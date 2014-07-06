var Controller = require('../classes/controller');
var Collection = require('../classes/collection');
var Radio = require('../classes/radio');
var View = require('./view');

var headerChannel = Radio.channel('header');

module.exports = Controller.extend({
  initialize: function (options) {
    this.container = options.container;

    this.collection = new Collection();
    this.view = new View({ collection: this.collection });
    this.container.show(this.view);

    this.listenTo(headerChannel.vent, 'add', this.addNavitem);
    this.listenTo(headerChannel.vent, 'active', this.setActive);
  },

  addNavitem: function(name, path) {
    this.collection.add({ name: name, path: path });
  },

  setActive: function(name) {
    this.collection.invoke('set', 'active', false);
    var model = this.collection.findWhere({ name: name });
    if (model) model.set('active', true);
  }
});
