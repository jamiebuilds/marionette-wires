module.exports = function() {
  var Widget = this.Widget;

  Widget.Modal = Widget.extend({
    root: '.modal-dialog',
    confirm: function() {
      return this.click({text: 'Affirmative'});
    }
  });
};
