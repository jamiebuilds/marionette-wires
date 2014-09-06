var Radio = require('backbone.radio');
var Module = require('src/common/module');
var Router = require('./router');

var authChannel = Radio.channel('auth');

module.exports = Module.extend({
  initialize: function(options) {
    this.router = new Router(this.options);

    if (authChannel.request('authorized')) {
      this._showLoggedInHeader();
    } else {
      this._showLoggedOutHeader();
    }
  },

  _showLoggedOutHeader: function() {
    Radio.command('header', 'add', {
      name: 'Login',
      path: 'login',
      type: 'secondary'
    });

    Radio.command('header', 'add', {
      name: 'Create Account',
      path: 'account/new',
      type: 'secondary'
    });

    this.listenToOnce(authChannel, 'login', this.onLogin);
  },

  onLogin: function() {
    Radio.command('header', 'remove', { name: 'Login' });
    Radio.command('header', 'remove', { name: 'Create Account' });
    this._showLoggedInHeader();
  },

  _showLoggedInHeader: function() {
    Radio.command('header', 'add', {
      name: 'Account',
      path: 'account',
      type: 'secondary'
    });

    this.listenToOnce(authChannel, 'logout', this.onLogout);
  },

  onLogout: function() {
    Radio.command('header', 'remove', { name: 'Login' });
    Radio.command('header', 'remove', { name: 'Create Account' });
    this._showLoggedInHeader();
  }
});
