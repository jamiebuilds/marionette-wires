var Model = require('../classes/model');

module.exports = Model.extend({
  urlRoot: '/api/v1/colors',

  defaults: {
    active: false
  },

  initialize: function() {
    this.on('request', this.handleRequest);
    this.on('error', this.handleError);
  },

  validate: function (attrs) {
    var errors = [];

    if (attrs.name === '') {
      errors.push('Missing "name" field');
    }

    if (attrs.hex === '') {
      errors.push('Missing "hex" field');
    }

    return errors.length > 0 ? errors : undefined;
  },

  handleRequest: function() {
    this.serverError = false;
  },

  handleError: function() {
    this.serverError = true;
  },

  cleanup: function() {
    delete this.serverError;
    delete this.validationError;
  }
});
