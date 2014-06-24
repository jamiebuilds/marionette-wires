var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
  urlRoot: '/api/v1/colors',

  defaults: {
    active: false
  },

  validate: function (attrs, options) {
    var errors = [];

    if (attrs.name === '') {
      errors.push('Missing "name" field');
    }

    if (attrs.hex === '') {
      errors.push('Missing "hex" field');
    }

    return errors.length > 0 ? errors : undefined;
  }
});
