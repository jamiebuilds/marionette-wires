module.exports = function() {
  var Widget = this.Widget;

  Widget.BooksLibraryItem = Widget.extend({
    isActive: function() {
      return this.getAttribute('class').then(function(className) {
        return className.indexOf('active') !== -1;
      });
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
