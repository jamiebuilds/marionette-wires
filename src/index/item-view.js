var Marionette = require('backbone.marionette');
var template = require('./item-template.hbs');

module.exports = Marionette.ItemView.extend({
  template: template
});
