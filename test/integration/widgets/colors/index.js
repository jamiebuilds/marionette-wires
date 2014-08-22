module.exports = function() {
  var Widget = this.Widget;

  Widget.ColorsIndex = Widget.extend({
    root: '.colors--index',

    create: function() {
      return this.click({
        text: 'Create'
      });
    }
  });

  Widget.ColorsIndex.List = Widget.List.extend({
    root: '.colors .list-group',
    itemSelector: '.colors__item'
  });
};
