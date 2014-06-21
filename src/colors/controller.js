var Marionette = require('backbone.marionette');

var Color = require('./model');
var Colors = require('./collection');

var IndexView = require('./index/composite-view');
var CreateView = require('./create/view');
var ShowView = require('./show/view');
var EditView = require('./edit/view');

var COLORS_DATA = [
  { id: 0, name: 'blue',  hex: '#00f' },
  { id: 1, name: 'red',   hex: '#f00' },
  { id: 2, name: 'green', hex: '#0f0' }
];

module.exports = Marionette.Controller.extend({
  initialize: function (options) {
    this.container = options.container;
  },

  index: function () {
    var collection = this._getCollection();

    var indexView = new IndexView({
      collection: collection
    });

    this.container.show(indexView);
  },

  create: function () {
    var collection = this._getCollection();
    var model = this._getModel();

    var createView = new CreateView({
      collection: collection,
      model: model
    });

    this.container.show(createView);
  },

  show: function (id) {
    var model = this._getModel(id);

    var showView = new ShowView({
      model: model
    });

    this.container.show(showView);
  },

  edit: function (id) {
    var model = this._getModel(id);

    var editView = new EditView({
      model: model
    });

    this.container.show(editView);
  },

  _getCollection: function() {
    return new Colors(COLORS_DATA);
  },

  _getModel: function(id) {
    if (id) {
      return new Color(COLORS_DATA[ id ]);
    } else {
      return new Colors();
    }
  }
});
