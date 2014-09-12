module.exports = function() {
  var Widget = this.Widget;

  Widget.ColorsEdit = Widget.extend({
    root: '.colors--edit'
  });

  Widget.ColorsEdit.Form = Widget.Form.extend({
    root: '.colors__form',
  });
};
