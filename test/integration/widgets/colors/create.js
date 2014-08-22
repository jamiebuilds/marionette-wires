module.exports = function() {
  var Widget = this.Widget;

  Widget.ColorsCreate = Widget.extend({
    root: '.colors--create'
  });

  Widget.ColorsCreate.Form = Widget.Form.extend({
    root: '.colors__form'
  });
};
