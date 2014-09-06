var $ = require('jquery');
var Module = require('src/common/module');
var Radio = require('backbone.radio');
var Base64 = require('Base64');

module.exports = Module.extend({
  initialize: function() {
    this.channel = Radio.channel('auth');
    this._isAuthorized = false;
    this.start();
  },

  onStart: function() {
    this.channel.reply({
      authorized : this.isAuthorized,
      login      : this.login,
      logout     : this.logout
    }, this);
  },

  onStop: function() {
    this.channel.reset();
  },

  login: function(creds) {
    var self = this;
    var encoded = Base64.btoa(creds.email + ':' + creds.password);
    var headers = { Authorization: 'Basic ' + encoded };

    return $.ajax('/api/v1/login', { headers: headers }).then(function() {
      $.ajaxSetup({ headers: headers });
      self.channel.trigger('login');
    });
  },

  logout: function() {
    // this.channel.trigger('logout');
  },

  isAuthorized: function() {
    return this._isAuthorized;
  }
});
