var _ = require('underscore');
var Radio = require('backbone.radio');
var Model = require('../common/model');

var routerChannel = Radio.channel('router');

module.exports = Model.extend({
  defaults: {
    timeout: false,
    dismissible: true,
    clearOnRoute: true
  },

  initialize: function() {
    if (this.get('timeout') !== false) {
      this._setTimeout();
    }

    this.on('destroy', this._clearTimeout);

    if (this.get('clearOnRoute')) {
      this.listenTo(routerChannel, 'route', this.destroy);
    }
  },

  _setTimeout: function() {
    this._timeout = setTimeout(_.bind(this.destroy, this), this.get('timeout'));
  },

  _clearTimeout: function() {
    if (this._timeout) {
      clearTimeout(this._timeout);
      delete this._timeout;
    }
  }
});
