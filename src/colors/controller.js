var Marionette = require('backbone.marionette');
var Backbone = require('backbone');
var Model = require('./model');
var Collection = require('./collection');
var IndexView = require('./index/composite-view');
var CreateView = require('./create/item-view');
var ShowView = require('./show/item-view');
var EditView = require('./edit/item-view');

var colorsChannel = Backbone.Wreqr.radio.channel('colors');
var headerChannel = Backbone.Wreqr.radio.channel('header');

module.exports = Marionette.Controller.extend({
  initialize: function (options) {
    this.container = options.container;
    this.collection = new Collection();
    this.collection.fetch();

    headerChannel.vent.trigger('add', 'Colors', 'colors');
  },

  index: function () {
    var indexView = new IndexView({
      collection: this.collection
    });

    this.container.show(indexView);
    headerChannel.vent.trigger('active', 'Colors');
  },

  create: function () {
    var model = new Model();

    var createView = new CreateView({
      collection: this.collection,
      model: model
    });

    this.container.show(createView);
    headerChannel.vent.trigger('active', 'Colors');
  },

  show: function (id) {
    var model = this._getModel(id);

    var showView = new ShowView({
      model: model
    });

    this.container.show(showView);
    headerChannel.vent.trigger('active', 'Colors');
  },

  edit: function (id) {
    var model = this._getModel(id);

    var editView = new EditView({
      model: model
    });

    this.container.show(editView);
    headerChannel.vent.trigger('active', 'Colors');
  },

  _getModel: function(id) {
    var model = this.collection.get(id);

    if (!model) {
      model = new Model({ id: id });
      model.fetch();
      this.collection.add(model, { merge: true, silent: true });
    }

    return model;
  }
});
