var View = require('src/common/view');
var FormBehavior = require('src/forms/behavior');
var ViewModel = require('./view-model');
var template = require('./template.hbs');

module.exports = View.extend({
  template: template,
  className: 'container',

  initialize: function() {
    this.model = new ViewModel();
  },

  behaviors: {
    form: { behaviorClass: FormBehavior }
  }
});
