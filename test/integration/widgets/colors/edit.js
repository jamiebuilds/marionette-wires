var Driver = require('selenium-webdriver');

module.exports = function() {
  var Widget = this.Widget;

  Widget.ColorsEdit = Widget.extend({
    root: '.colors--edit'
  });

  Widget.ColorsEdit.Form = Widget.Form.extend({
    root: '.colors__form',

    clearAndSubmitWith: function(vals) {
      var self = this;
      return this.findAll('input').then(function(els) {
        return Driver.promise.map(els, function(el) {
          return el.clear();
        });
      }).then(function() {
        return self.submitWith(vals);
      });
    }
  });
};
