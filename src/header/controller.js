var Radio = require('backbone.radio');
var Controller = require('../classes/controller');
var Collection = require('../classes/collection');
var View = require('./view');

var channel = Radio.channel('header');

module.exports = Controller.extend({
  initialize: function () {
    this.collection = new Collection();
    this.view = new View({ collection: this.collection });
    this.container.show(this.view);

    channel.on({
      'add'    : this.addNavitem,
      'active' : this.setActive
    }, this);
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
