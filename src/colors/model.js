var Model = require('../common/model');

module.exports = Model.extend({
  urlRoot: '/api/colors',

  defaults: {
    active: false
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
  }
});
