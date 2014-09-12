module.exports = function() {
  var Widget = this.Widget;

  Widget.BooksLibraryItem = Widget.extend({
    isActive: function() {
      return this.hasClass('active');
    },
    getTitle: function() {
      return this.read('.list-group-item-heading');
    }
  });

  Widget.BooksLibrary = Widget.List.extend({
    root: '.books__library .list-group',
    itemSelector: '.list-group-item',
    itemClass: Widget.BooksLibraryItem,
    isActive: function(index) {
      return this.at(index).then(function(w) {
        return w.isActive();
      });
    }
  });
};
