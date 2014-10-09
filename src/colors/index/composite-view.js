var _ = require('lodash');
var CompositeView = require('src/common/composite-view');
var Collection = require('src/common/collection');
var ItemView = require('./item-view');
var template = require('./composite-template.hbs');

module.exports = CompositeView.extend({
  template: template,
  className: 'colors colors--index container',

  initialize: function(options) {
    this.models = options.collection.models;
    delete this.collection;
    this.state.start = (options.page - 1) * this.state.limit;
  },

  childView: ItemView,
  childViewContainer: 'div.list-group',

  collectionEvents: {
    'change': 'render'
  },

  state: {
    start: 0,
    limit: 20
  },

  onBeforeRender: function() {
    var filtered = _.chain(this.models)
      .drop(this.state.start)
      .take(this.state.limit)
      .value();

    this.collection = new Collection(filtered);
  },

  templateHelpers: function() {
    var total   = Math.floor(this.models.length / this.state.limit) + 1;
    var current = Math.floor(this.state.start / this.state.limit) + 1;

    var pages = _.times(total, function(index) {
      return {
        current : index + 1 === current,
        page    : index + 1
      };
    });

    var prev = current - 1 > 0     ? current - 1 : false;
    var next = current + 1 < total ? current + 1 : false;

    return {
      total   : total,
      current : current,
      pages   : pages,
      prev    : prev,
      next    : next
    };
  }
});
