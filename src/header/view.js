var _ = require('underscore');
var Backbone = require('backbone');
var View = require('src/common/view');
var template = require('./template.hbs');

module.exports = View.extend({
  template: template,
  tagName: 'nav',
  className: 'navbar navbar-default navbar-fixed-top',

  attributes: {
    role: 'navigation'
  },

  collectionEvents: {
    'all': 'render'
  },

  templateHelpers: function() {
    return {
      primaryItems   : this.serializeWhere({ type: 'primary' }),
      secondaryItems : this.serializeWhere({ type: 'secondary' })
    };
  },

  serializeWhere: function(props) {
    return _(this.collection.where(props)).invoke('toJSON');
  },

  ui: {
    collapse: '#navbar-collapse'
  },

  events: {
    'show.bs.collapse #navbar-collapse' : 'onCollapseShow'
  },

  onCollapseShow: function() {
    this.listenToOnce(Backbone.history, 'route', function() {
      this.ui.collapse.collapse('hide');
    });
  }
});
