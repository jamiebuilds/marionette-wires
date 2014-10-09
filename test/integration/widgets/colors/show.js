var Promise = require('bluebird');
var _ = require('lodash');

module.exports = function() {
  var Widget = this.Widget;

  Widget.ColorsShow = Widget.extend({
    root: '.colors--show',

    edit: function() {
      return this.click({
        text: 'Edit'
      });
    },

    isActive: function() {
      return this.find({
        text: 'Deactivate'
      }).then(function(el) {
        return !!el;
      });
    },

    destroy: function() {
      return this.click({
        text: 'Destroy'
      });
    },

    getDetails: function() {
      return new Widget.ColorsShow.Details().toHash();
    }
  });

  Widget.ColorsShow.DetailsItem = Widget.extend({
    toHash: function() {
      return Promise.all([
        this.read('.list-group-item-heading'),
        this.read('.list-group-item-text')
      ]).spread(function(headline, contents) {
        return _.object([headline.toLowerCase()], [contents]);
      });
    }
  });

  Widget.ColorsShow.Details = Widget.List.extend({
    itemSelector: '.list-group-item',
    root: '.list-group',
    itemClass: Widget.ColorsShow.DetailsItem,

    toHash: function() {
      return this.invoke('toHash').then(function(colors) {
        return _.reduce(colors, function(a, b) { return _.extend(a, b); }, {});
      });
    }
  });
};
