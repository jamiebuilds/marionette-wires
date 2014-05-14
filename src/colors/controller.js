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

  index: function (data) {
    var colors = new Colors(data || COLORS_DATA);

    var indexView = new IndexView({
      collection: colors
    });

    this.container.show(indexView);
  },

  create: function (data) {
    var colors = new Colors(data || COLORS_DATA);
    var color = new Color();

    var createView = new CreateView({
      collection: colors,
      model: color
    });

    this.container.show(createView);
  },

  show: function (id, data) {
    var color = new Color(data || COLORS_DATA[ id ]);

    var showView = new ShowView({
      model: color
    });

    this.container.show(showView);
  },

  edit: function (id, data) {
    var color = new Color(data || COLORS_DATA[ id ]);

    var editView = new EditView({
      model: color
    });

    this.container.show(editView);
  }
});
